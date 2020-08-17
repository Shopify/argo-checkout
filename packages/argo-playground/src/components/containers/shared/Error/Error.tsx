import React from 'react';
import {Stack, TextContainer, DisplayText, Button} from '@shopify/polaris';
import './Error.css';

import ErrorMonitorImage from './error-monitor.png';

export function Error() {
  return (
    <div className="Error-wrapper">
      <Stack distribution="fill" wrap={false} alignment="center">
        <Stack.Item>
          <TextContainer>
            <DisplayText>
              There's a problem loading <br /> this app
            </DisplayText>

            <Button outline>Get Support</Button>
          </TextContainer>
        </Stack.Item>
        <Stack.Item>
          <img style={{width: '100%'}} src={ErrorMonitorImage} alt="Error Monitor" />
        </Stack.Item>
      </Stack>
    </div>
  );
}
