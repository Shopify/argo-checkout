import React from 'react';
import {Stack as ArgoStack} from '@shopify/argo';
import {Stack as PolarisStack} from '@shopify/polaris';
import {ReactPropsFromRemoteComponentType} from '@shopify/argo/utilities';

type StackProps = ReactPropsFromRemoteComponentType<typeof ArgoStack>;

export default function Stack({
  children,
  alignment,
  distribution,
  spacing,
  vertical,
  wrap,
}: StackProps) {
  return (
    <PolarisStack
      alignment={alignment}
      distribution={distribution}
      spacing={spacing}
      vertical={vertical}
      wrap={wrap}
    >
      {children}
    </PolarisStack>
  );
}
