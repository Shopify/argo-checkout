import {isProductDataApi} from '@shopify/argo';

import {useExtensionApi} from './utils';

export function useProductData() {
  const api = useExtensionApi();
  if (!isProductDataApi(api)) {
    throw new Error('No productData api found');
  }
  return api.productData;
}
