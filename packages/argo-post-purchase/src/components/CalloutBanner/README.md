# CalloutBanner

CalloutBanner is used to inform buyers about the details of a limited
time offer. They differ from Banner which is used to report status.

Guidelines:

- Never display more than one CalloutBanner
- Place callout banners near the top of the page to bring the buyer's attention
- The text should be written as concisely as possible
- Be considerate and avoid anxiety provoking language:
  - Avoid exclamation points  – “Wait! Before time runs out!”
  - Give it a feeling of personalization

## Props
optional = ?

| Name | Type | Description |
| --- | --- | --- |
| title? | <code>string</code> | Callout banners have an optional title. Use a title to grab the buyers attention with a short, concise message.  |
| border? | <code>"none" &#124; "block"</code> | Adds a top and bottom border to the callout banner @default 'block'  |
| background? | <code>"secondary" &#124; "transparent"</code> | Sets the background color of the callout banner @default 'secondary'  |
| alignment? | <code>"leading" &#124; "center" &#124; "trailing"</code> | Sets the alignment of the title and children @default 'center'  |
| spacing? | <code>"xtight" &#124; "tight" &#124; "loose" &#124; "xloose"</code> | Sets the spacing between the title and children @default 'tight'  |