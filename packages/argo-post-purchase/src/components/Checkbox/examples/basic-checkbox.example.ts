import {extend, Checkbox} from '@shopify/argo-post-purchase';

extend('Checkout::PostPurchase::Render', (root) => {
  const checkbox = root.createComponent(
    Checkbox,
    {id: 'checkbox', name: 'checkbox'},
    'Save this information for next time',
  );

  root.appendChild(checkbox);
});
