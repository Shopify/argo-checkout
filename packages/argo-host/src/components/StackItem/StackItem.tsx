import React from 'react';
import {StackItem as ArgoStackItem} from '@shopify/argo';
import {ReactPropsFromRemoteComponentType} from '@shopify/argo/utilities';
import {Stack as PolarisStack} from '@shopify/polaris';

type StackItemProps = ReactPropsFromRemoteComponentType<typeof ArgoStackItem>;

export default function StackItem({children, fill}: StackItemProps) {
  return <PolarisStack.Item fill={fill}>{children}</PolarisStack.Item>;
}
