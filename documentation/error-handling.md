# Error handling

Because ui extensions script runs in non-browser environment (ex: WebWorker in Web, JavascriptCore on Mobile), it is recommended to listen and send errors to server manually. However, it is still possible to use external libraries for reporting errors. This document shows a couple of examples about how you can handle it.

## The generic way of handling errors

There are two types of errors when using ui extensions: lifecycle and non-lifecycle error.

- **Lifecycle error:** most errors will fall into this type. It could happen when ui extensions script is loaded / imported, the script is run / rendered, or any interaction via callback of ui extensions components or apis. To catch this error, you can add event listener for `unhandledrejection`.

  ```javascript
  self.onunhandledrejection = (error) => {
    console.warn('onunhandledrejection', error);
  };
  // or
  self.addEventListener('unhandledrejection', (error) => {
    console.warn('event unhandledrejection', error);
  });
  ```

- **Non-lifecycle error:** this error could happen when the script throw exception while running setTimeout callback. To catch this error, you can add event listener for `error`.

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

You can use either CDN version or npm dependencies to run Bugsnag. However, at runtime, Bugsnag requires additional polyfill as it tries to access browser environment. Below script has been tested at the time of writing this docs

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

Using Sentry for ui extensions is very straightforward. You only need Sentry main bundle or `@sentry/browser`.

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

By default, Sentry does not send any error. You need to add listeners for both `error` and `unhandledRejection`.
