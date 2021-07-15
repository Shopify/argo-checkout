import React from 'react';
import {extend, render, ExtensionPoint, TextField, Form} from '@shopify/admin-ui-extensions-react';

function App() {
  return (
    <Form onSubmit={() => console.log('submitted!')}>
      <TextField
        label="Super text field"
        onChange={(value) => console.log(value, ' was typed')} />
    </Form>
  );
}

extend(
  'Playground',
  render(() => <App />),
);
