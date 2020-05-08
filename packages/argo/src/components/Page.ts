import {createRemoteComponent} from '@shopify/remote-ui-core';

import {Action} from '../types';
import {ThumbnailProps} from './Thumbnail';

export interface PageProps {
  thumbnail?: ThumbnailProps; // TODO: explore making thumbnail as React.ReactElement<ThumbnailProps>. Ref https://github.com/Shopify/app-extension-libs/issues/176
  title: string;
  subTitle?: string;
  primaryAction?: Action;
  secondaryActions?: Action[];
  children?: React.ReactNode;
}

export const Page = createRemoteComponent<'Page', PageProps>('Page');