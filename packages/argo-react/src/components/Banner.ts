import {createRemoteReactComponent, ReactPropsFromRemoteComponentType} from '@remote-ui/react';

import {Banner as BaseBanner} from '@shopify/argo/components';

export type BannerProps = ReactPropsFromRemoteComponentType<typeof BaseBanner>;
export const Banner = createRemoteReactComponent(BaseBanner);
