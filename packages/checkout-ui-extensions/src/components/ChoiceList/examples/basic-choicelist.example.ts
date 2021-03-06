import {
  extend,
  ChoiceList,
  Choice,
  BlockStack,
} from '@shopify/checkout-ui-extensions';

extend('Checkout::Feature::Render', (root) => {
  const choiceList = root.createComponent(
    ChoiceList,
    {
      name: 'Choice',
      value: 'first',
      // eslint-disable-next-line no-console
      onChange: () => console.log('onChange Triggered'),
    },
    [
      root.createComponent(BlockStack, undefined, [
        root.createComponent(Choice, {id: 'first'}, 'First choice'),
        root.createComponent(Choice, {id: 'second'}, 'Second choice'),
      ]),
    ],
  );

  root.appendChild(choiceList);
});
