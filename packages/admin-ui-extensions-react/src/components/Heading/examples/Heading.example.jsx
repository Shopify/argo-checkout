import React from 'react';
import {extend, render, Heading} from '@shopify/admin-ui-extensions-react';

function App() {
  return <Heading>Heading</Heading>;
}

extend(
  'Playground',
  render(() => <App />),
);
