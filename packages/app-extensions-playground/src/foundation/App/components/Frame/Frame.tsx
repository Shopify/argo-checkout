import React, {ReactNode, useState} from 'react';
import {Route} from '@shopify/react-router';
import {Frame as PolarisFrame, Navigation, TopBar} from '@shopify/polaris';
import {HomeMajorTwotone, ListMajorMonotone, StarOutlineMinor} from '@shopify/polaris-icons';

interface Props {
  children?: ReactNode;
}

export function Frame({children}: Props) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <PolarisFrame
      showMobileNavigation={navOpen}
      onNavigationDismiss={() => setNavOpen(false)}
      topBar={<TopBar showNavigationToggle onNavigationToggle={() => setNavOpen(!navOpen)} />}
      navigation={
        <Route
          render={({location}) => (
            <Navigation location={location.pathname} onDismiss={() => setNavOpen(false)}>
              <Navigation.Section
                items={[
                  {
                    label: 'Home',
                    url: '',
                    exactMatch: true,
                    icon: HomeMajorTwotone,
                  },
                  {
                    label: 'Components List',
                    url: '/components-list',
                    exactMatch: true,
                    icon: ListMajorMonotone,
                  },
                  {
                    label: 'Product Reviews',
                    url: '/product-reviews',
                    exactMatch: true,
                    icon: StarOutlineMinor,
                  },
                ]}
              />
            </Navigation>
          )}
        />
      }
    >
      {children}
    </PolarisFrame>
  );
}