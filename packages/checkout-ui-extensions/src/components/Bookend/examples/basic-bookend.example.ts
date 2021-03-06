import {
  extend,
  Bookend,
  TextField,
  Button,
} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const bookend = root.createComponent(Bookend, {trailing: true}, [
    root.createComponent(TextField, {label: 'Discount'}),
    root.createComponent(Button, {plain: true}, 'Apply'),
  ]);

  root.appendChild(bookend);
});
