import React, {useCallback} from 'react';
import {Card, Stack, Link} from '@shopify/argo-admin-react';

export function LinkExample() {
  const linkAction = useCallback(() => {
    console.log('Link clicked');
  }, []);

  return (
    <Card sectioned title="Link">
      <Stack>
        <Link url="/admin/products">Relative link to Products</Link>
        <Link url="/admin/products" external>
          Relative external link to Products
        </Link>
        <Link url="http://google.com">Link to Google that should always open in new tab</Link>
        <Link url="javascript:alert(window.location);">Sanitized Javascript in links</Link>
        <Link onClick={linkAction}>Link that triggers log</Link>
      </Stack>
    </Card>
  );
}
