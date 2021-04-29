import {extend, Card} from '@shopify/argo-admin';

extend('Playground', (root) => {
  const card = root.createComponent(Card, {});

  card.appendChild('This is the best extension.');
  root.appendChild(card);

  root.mount();
});
