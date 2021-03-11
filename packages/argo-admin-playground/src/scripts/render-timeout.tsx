import React from 'react';
import {extend, render, Card} from '@shopify/argo-admin-react';

function App() {
  return <Card sectioned>You never see me</Card>;
}

extend(
  'intentional-to-force-timeout' as any,
  render(() => <App />),
);

// for Unsupported Component error
extend(
  'Admin::Product::SubscriptionPlan::Remove',
  render(() => <App />),
);