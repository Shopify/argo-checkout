import React, {useState, useMemo} from 'react';
import {render, ExtensionPoint} from '@shopify/app-extensions-renderer';
import {
  ResourceList,
  ResourceItem,
  Stack,
  Checkbox,
  Text,
  StackItem,
} from '@shopify/app-extensions-polaris-components/client';

render(ExtensionPoint.SubscriptionsManagement, () => <App />);

function App() {
  const dataList = [1, 2, 3, 4, 5, 12, 13, 145];
  const [listItems, setListItems] = useState(dataList);

  const [resourceListQuery, setResourceListQuery] = useState('');
  const resourceListFilterControl = useMemo(
    () => ({
      queryValue: resourceListQuery,
      queryPlaceholder: 'Search...',
      onQueryChange: q => {
        setResourceListQuery(q);
        setListItems(dataList.filter(r => r.toString().includes(q)));
      },
      onQueryClear: () => {
        setResourceListQuery('');
      },
    }),
    [resourceListQuery],
  );

  return (
    <>
      <ResourceList filterControl={resourceListFilterControl}>
        {listItems.map((item, index) => (
          <ResourceItem
            key={index}
            id={index}
            onClick={() => console.log('ResourceList item click:', item)}
          >
            <Stack alignment="center">
              <Checkbox />
              <StackItem fill>Every {item} week or 15 days * 20-25% off</StackItem>
              <Text>{item} product</Text>
            </Stack>
          </ResourceItem>
        ))}
      </ResourceList>
    </>
  );
}
