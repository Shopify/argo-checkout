import {render, Image} from '@shopify/argo-checkout-react';

render('Checkout::Feature::Render', () => <App />);

function App() {
  return <Image source="http://placekitten.com/300/300" />;
}
