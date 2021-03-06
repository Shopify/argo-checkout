import {extend, OptionList} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const options = [
    {label: 'Red', value: 'red', disabled: false},
    {label: 'Green', value: 'green', disabled: false},
    {label: 'Blue', value: 'blue', disabled: false},
  ];
  let selected = [];

  const list = root.createComponent(OptionList, {
    title: 'OptionList title',
    options,
    allowMultiple: true,
    selected,
    onChange: (newSelected) => {
      console.log(`option selected: ${newSelected}`);
      selected = newSelected;
    },
  });
  root.appendChild(list);

  root.mount();
});
