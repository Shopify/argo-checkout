import {extend, Link} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const logLink = root.createComponent(Link, {
    onPress: () => console.log('I was pressed'),
  });
  logLink.appendChild('I don’t do much.');

  root.appendChild(logLink);

  root.mount();
});
