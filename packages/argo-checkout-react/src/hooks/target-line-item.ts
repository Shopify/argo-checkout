import {ExtensionPoint} from '@shopify/argo-checkout';

import {useExtensionApi} from './api';
import {useSubscription} from './subscription';

class ExtensionHasNoTargetError extends Error {
  constructor(extensionPoint: ExtensionPoint) {
    super(
      `Cannot call 'useTargetLineItem()' on extensionPoint '${extensionPoint}'. Property 'target' is not found on api.`,
    );
  }
}

/**
 * Returns the target line item.
 */
export function useTargetLineItem() {
  const api = useExtensionApi<'Checkout::LineItem::RenderAfter'>();
  if (!api.target) {
    throw new ExtensionHasNoTargetError(api.extensionPoint);
  }
  return useSubscription(api.target);
}
