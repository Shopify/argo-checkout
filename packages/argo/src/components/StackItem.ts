import {createRemoteComponent} from '@remote-ui/core';

export interface StackItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
}

export const StackItem = createRemoteComponent<'StackItem', StackItemProps>('StackItem');
