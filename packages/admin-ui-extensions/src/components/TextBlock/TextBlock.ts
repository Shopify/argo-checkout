import {createRemoteComponent} from '@remote-ui/core';

type Size = 'small' | 'base' | 'medium' | 'large' | 'extraLarge';

type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

export interface TextBlockProps {
  /** Size of the text */
  size?: Size;
  /** Give text additional visual meaning */
  variation?: Variation;
}

/**
 * TextBlock is used to render a block of text that occupies the full width available.
 * Usually used to render paragraphs of text.
 */
export const TextBlock = createRemoteComponent<'TextBlock', TextBlockProps>(
  'TextBlock',
);
