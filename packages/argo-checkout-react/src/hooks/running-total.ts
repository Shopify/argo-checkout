import type {RenderExtensionPoint} from '@shopify/argo-checkout';

import {useExtensionApi} from './api';
import {useSubscription} from './subscription';

/**
 * Returns the running total calculated at the current step.
 */
export function useRunningTotal<
  ID extends RenderExtensionPoint = RenderExtensionPoint
>() {
  return useSubscription(useExtensionApi<ID>().runningTotal);
}
