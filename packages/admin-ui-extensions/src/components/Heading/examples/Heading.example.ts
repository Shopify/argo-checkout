import {extend, Heading} from '@shopify/argo-admin';

extend('Playground', (root) => {
  const heading = root.createComponent(Heading, {
    id: 'profile_heading',
    level: 3,
  });

  const headingText = root.createText('This is a Title');
  heading.appendChild(headingText);
  root.appendChild(heading);

  root.mount();
});
