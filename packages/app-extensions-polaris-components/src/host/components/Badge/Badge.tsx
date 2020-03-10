import {Badge as PolarisBadge} from '@shopify/polaris';
import React from 'react';

import {BadgeProps} from '../../../client/core';

export default function Badge({status, message}: BadgeProps) {
  return <PolarisBadge status={status}>{message}</PolarisBadge>;
}
