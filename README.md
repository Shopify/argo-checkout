# Argo

Argo allows apps to integrate directly into Shopify surfaces such as Shopify admin, mobile apps, checkout, or POS. It includes a set of consistent UI components, and development tools for authoring them.

With Argo, you create app extensions by writing JavaScript or TypeScript to define your app’s behavior. Shopify securely hosts and renders your UI on the client. The result is a faster user experience, without the performance compromises that come with embedded apps.

## Key features

- Consistent user experience - no iFrames or SameSite headaches. Shopify renders your UI as part of the native platform.
- Fast and secure -  Shopify uses [remote-ui](https://github.com/Shopify/remote-ui) to render your UI as fast as possible while keeping the platform secure.
- Standard developer experience - Argo extensions are written in either JavaScript or TypeScript. React developers can leverage the high-level component interface, and vanilla JavaScript developers can use a DOM-like interface.

## Why did Shopify build Argo?

We built Argo so that apps can be first-class citizens on all of Shopify’s UI surfaces. 

To do that, we had to rethink how apps surface UI on all Shopify surfaces, such as the admin, mobile apps, and POS. Today, embedded apps render inside an iframe creating technical barriers to providing a fast and performant user experience. 

Argo uses “frameless” components — Shopify renders your UI for you, so there’s no performance hit, and your app has a fully native look and feel wherever it shows up. This may sound complex, but as you’ll soon see, the code you’ll write to implement this new type of UI extension should feel pretty familiar to you. 

[About this repo](#about-this-repo) | [Commands for Getting Started](#getting-started) | [Contributing](#contributing)

## About this repo

This repo contains a collection of packages for using Argo in Shopify Admin and Shopify Checkout.

| Package                                                                   | Description                                                                                                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| argo (Coming soon)                                                        | Shared APIs and utilities used in both argo-admin and argo-checkout libraries                                                                                 |
| [argo-admin](./packages/argo-admin/README.md)                             | Typings and APIs for Argo Admin components, containers, and extension points                                                                                  |
| [argo-admin-react](./packages/argo-admin-react/README.md)                 | Wrapper around argo-admin to support extension developers using React                                                                                         |
| [argo-checkout](./packages/argo-checkout/README.md)                       | Typings and APIs for Argo Checkout components, containers, and extension points                                                                               |
| [argo-checkout-react](./packages/argo-checkout-react/README.md)           | Wrapper around argo-checkout to support extension developers using React                                                                                      |
| [argo-post-purchase](./packages/argo-post-purchase/README.md)             | Tools for building a post-purchase extension                                                                                                                  |
| [argo-post-purchase-react](./packages/argo-post-purchase-react/README.md) | Wrapper around argo-post-purchase to support extension developers using React                                                                                 |
| [argo-run](./packages/argo-run/README.md)                                 | Tiny asset dev server and production asset builder, powered by [webpack](https://webpack.js.org)                                                              |
| [argo-webpack-hot-client](./packages/rgo-webpack-hot-client/README.md)    | An Argo-compatible replacement for [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client) that enables auto-reloading in Argo extensions |

## Getting Started

Which package you explore depends on the extension you are building.

### Admin Libraries

- If you’re building an extension for Shopify Admin, check out @shopify/argo-admin, which contains all of the typings for the API available to Argo extensions in Shopify Admin.

### Checkout Libraries

- If you’re building an extension for the main Checkout flow, you’ll need to read [`@shopify/argo-checkout`](packages/argo-checkout), which has all of the typings for the API available to Argo extensions in Checkout. It also has documentation for the available [global API](packages/argo-checkout/documentation/globals.md), [extension points](packages/argo-checkout/documentation/extension-points.md), and [components](packages/argo-checkout/documentation/components.md).
- If you’re building a post-purchase extension, the package check out [`@shopify/argo-post-purchase`](packages/argo-post-purchase), which contains the same documentation noted above for the post-purchase extension points.

## Contributing

Check out our [contribution guidelines](/CONTRIBUTING.md).
