# Error handling

Because UI extension scripts run in non-browser environments (Web Worker in web, JavascriptCore on Mobile), it is recommended to manually set up error listeners and error reporting. However, it is possible to use external libraries for error reporting.

## Error handling in UI extensions

UI extensions can throw two types of error: lifecycle errors and non-lifecycle errors.

### Lifecycle error

Most errors will fall into this type. These errors can be thrown when:

- a UI extension script is loaded or imported
- the UI extension script is run
- during any callback interaction with UI extension components or APIs

To catch these errors, add an event listener for `unhandledrejection`.

  ```javascript
  self.onunhandledrejection = (error) => {
    console.warn('onunhandledrejection', error);
  };
  // or
  self.addEventListener('unhandledrejection', (error) => {
    console.warn('event unhandledrejection', error);
  });
  ```

### Non-lifecycle error

These errors can be thrown when the script encounters an exception while running a `setTimeout` callback. To catch these errors, add an event listener for `error`.

  ```javascript
  self.onerror = (error) => {
    console.warn('onerror', error);
  };
  // or
  self.addEventListener('error', (error) => {
    console.warn('event error', error);
  });
  ```

## Handle errors via 3rd-party libraries

### Bugsnag

See https://docs.bugsnag.com/platforms/javascript/.

You can run Bugsnag using the CDN version or npm dependencies. However, Bugsnag requires additional polyfills at runtime, as it will try to access the browser environment. The script below has been tested at the time of writing these docs.

```javascript
/**
 * Window polyfill
 */
(() => {
  const document = {
    documentElement: {
      outerHTML: '',
      createElement: () => ({}),
      clientWidth: 0,
      clientHeight: 0,
    },
    addEventListener: () => {},
  };
  const history = {};
  const window = self;
  self.window = window;
  window.document = document;
  window.history = history;
})();

/**
 * Bugsnag
 */
// Add bugsnag CDN javascript here
Bugsnag.start({apiKey: 'YOUR-BUGSNAG-API-KEY'});

/**
 * Add error handlers
 */
self.onerror = (error) => {
  Bugsnag.notify(error);
};
```

By default, Bugsnag has already sent error for `unhandledrejection`. You only need to listen to `onerror`.

### Sentry

See https://docs.sentry.io/platforms/javascript/.

Using Sentry for UI extensions is straightforward. You only need to import the main Sentry bundle or `@sentry/browser` No polyfills are required.

```javascript
// Add Sentry CDN javascript here
self.Sentry = Sentry;
Sentry.init({
  dsn: 'YOUR-SENTRY-DSN-VALUE',
});

/**
 * Add error handlers
 */
self.onerror = (error) => {
  Sentry.captureException(new Error(error.reason.stack));
};

self.onunhandledrejection = (error) => {
  Sentry.captureException(new Error(error.reason.stack));
};
```

By default, Sentry does not listen for any errors. You will need to manually add listeners for both `error` and `unhandledRejection`.
