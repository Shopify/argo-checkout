import * as fs from 'fs';
import {resolve, extname} from 'path';

import type {Packages} from '../../types';

interface Example {
  extension: string;
  content: string;
}

export function findExamplesForComponent(componentName: string, packages: Packages): Map<string, Example> {
  const examples = new Map();

  Object.keys(packages).forEach((packageName) => {
    const packagePath = packages[packageName];
    const componentExamplesFolder = resolve(`${packagePath}/src/components/${componentName}/examples`);

    if (fs.existsSync(componentExamplesFolder)) {
      fs.readdirSync(componentExamplesFolder).forEach((file) => {
        examples.set(packageName, {
          extension: extname(file).split('.').pop(),
          content: fs.readFileSync(`${componentExamplesFolder}/${file}`, 'utf8'),
        })
      });
    }
  });

  return examples;
}

export function renderComponentExamplesForComponent(examples: Map<string, Example>): string {
  let markdown = '';

  if (examples.size > 1) {
    const sections = [...examples.keys()].join(', ');
    markdown += `{% sections "${sections}" %}\n\n`;

    [...examples.values()].forEach((example, index) => {
      markdown += `{% highlight ${example.extension} %}{% raw %}\n`;
      markdown += `${example.content}`;
      markdown += '\n{% endraw %}{% endhighlight %}\n\n';
      if(index < examples.size-1){
        markdown += '\n\n----\n\n';
      }
    })

    markdown += '{% endsections %}\n\n';
  } else if (examples.size > 0) {
    markdown += Object.values(examples).join('\n\n----\n\n');
  }

  return markdown;
}