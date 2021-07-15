import {extend, ExtensionPoint, TextField, Form} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const form = root.createComponent(Form, {
    onSubmit: () => console.log('submitted!'),
  }, [
    root.createComponent(TextField, {
      label: 'Super text field',
      type: 'text',
      onInput: (value) => console.log(value, ' was typed'),
    }),
  ]);

  root.appendChild(form);

  root.mount();
});
