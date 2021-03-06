import {extend, Text} from '@shopify/admin-ui-extensions';

extend('Admin::Product::SubscriptionPlan::Add', (root, api) => {
  const {locale} = api;

  const text = root.createText(`My current locale is: ${locale.initialValue}`);

  locale.setOnChange((newLocale) => {
    text.updateText(`My current locale is: ${newLocale}`);
  });

  root.appendChild(text);
  root.mount();
});
