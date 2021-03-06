import {extend, Radio} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const radio1 = root.createComponent(Radio, {
    label: 'Option 1',
    helpText: 'Help text for option 1.',
    checked: true,
    id: 'option1',
    name: 'greatOptions',
    onChange: () => console.log('Option 1 selected'),
  });

  const radio2 = root.createComponent(Radio, {
    label: 'Option 2',
    helpText: 'Help text for option 2.',
    id: 'option2',
    name: 'greatOptions',
    checked: false,
    onChange: () => console.log('Option 2 selected'),
  });

  root.appendChild(radio1);
  root.appendChild(radio2);
  root.mount();
});
