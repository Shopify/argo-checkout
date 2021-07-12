import React from 'react';
import {extend, render, TextBlock} from '@shopify/admin-ui-extensions-react';

function App() {
  return (
    <TextBlock size="small" variation="subdued">
      TextBlock
    </TextBlock>
  );
}

extend(
  'Playground',
  render(() => <App />),
);
