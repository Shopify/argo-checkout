import * as fs from 'fs';
import {resolve, extname} from 'path';

import {compileForSandbox} from './compile-for-sandbox';
import type {Packages} from '../../../types';

interface Example {
  filename: string;
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
          filename: file,
          extension: extname(file).split('.').pop(),
          content: fs.readFileSync(`${componentExamplesFolder}/${file}`, 'utf8'),
        })
      });
    }
  });

  return examples;
}

export function renderExamplesForComponent(examples: Map<string, Example>): string {
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

export function renderSandboxComponentExamples(examples: Map<string, Example>, compiledPath: string): string {
  let markdown = '';

  const compiledFilename = getCompiledFilename(examples);

  markdown += `{% codeblock extensions_sandbox, compiled: "${compiledPath}/${compiledFilename}" %}\n\n`;

  examples.forEach((example, key) => {
    markdown += [
      `{% code ${example.extension}, title: "${key}" %}`,
      `${example.content}`,
      '{% endcode %}',
      '\n'
    ].join('\n');
  })

  markdown += '{% endcodeblock %}\n';

  return markdown;
}

function getCompiledFilename(examples: Map<string, Example>): string {
  // we assume the first item in paths.packages is the one we want to feed to the compiler
  const key = [...examples.keys()][0];
  const example = examples.get(key)
  return example.filename.replace(extname(example.filename), '.js')

}

export function compileComponentExamples(examples: Map<string, Example>, examplesPath: string) {
  if (!fs.existsSync(examplesPath)) {
    fs.mkdirSync(examplesPath, {recursive: true});
  }

  // we actually only need one compiled file per example
  examples.forEach(async (example, key) => {

    if(key === 'React') return;

    try {
      const compiledContent = await compileForSandbox(example.content)

      const compiledFilename = example.filename.replace(extname(example.filename), '.js')
      fs.writeFile(`${examplesPath}/${compiledFilename}`, compiledContent, function (err) {
        if (err) throw err;
      });
    } catch(error) {
      console.log(`error compiling ${example.filename}`)
      console.log(error)
    }
  })
}