import React, {useCallback} from 'react';
import {ClickableProps} from '@shopify/argo/components';

export default function Clickable({onClick, children}: ClickableProps) {
  const polarisOnClick = useCallback(
    e => {
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );
  return <div onClick={polarisOnClick}>{children}</div>;
}