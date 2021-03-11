import React, {useState} from 'react';
import {Card, Stack, Checkbox} from '@shopify/argo-admin-react';

export function CheckboxExample() {
  const [noLabelChecked, setNoLabelChecked] = useState(false);
  const [fooChecked, setFooChecked] = useState(false);
  const [barChecked, setBarChecked] = useState(false);

  return (
    <Card sectioned title="Checkbox component">
      <Stack>
        <Checkbox checked={noLabelChecked} onChange={(newValue) => setNoLabelChecked(newValue)} />
        <Checkbox
          label="Checkbox with checked"
          checked={fooChecked}
          onChange={(newValue) => setFooChecked(newValue)}
        />
        <Checkbox
          label="Checkbox with value"
          value={barChecked}
          onChange={(newValue) => setBarChecked(newValue)}
        />
      </Stack>
    </Card>
  );
}
