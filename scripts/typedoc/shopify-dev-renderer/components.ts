import {resolve, extname} from 'path';
import * as fs from 'fs';

import type {
  Paths,
  Packages,
} from '../types';

import {createDependencyGraph} from '../utilities/dependency-graph';

import {renderYamlFrontMatter, findUuid, dedupe, propsTable, strip, firstSentence} from './shared';
import type {Node} from './shared';

const additionalPropsTables: string[] = [];

export async function components(paths: Paths) {
  const componentIndex = resolve(`${paths.inputRoot}/src/components/index.ts`);
  const {nodes, components} = await buildComponentGraph(componentIndex);

  const outputRoot = resolve(`${paths.outputRoot}`);
  const componentDocsPath = resolve(`${paths.outputRoot}/components`);

  if (!fs.existsSync(outputRoot)) {
    fs.mkdirSync(outputRoot);
  }

  if (!fs.existsSync(componentDocsPath)) {
    fs.mkdirSync(componentDocsPath);
  }

  const indexFile = resolve(`${paths.outputRoot}/components/index.md`);
  let index = renderYamlFrontMatter({
    gid: findUuid(indexFile),
    url: `${paths.shopifyDevUrl}/components/index`,
    title: 'Components for checkout extensions',
    description: 'A list of components for checkout extensions.',
    hidden: true,
  });

  index += `Argo provides many powerful UI components that a
  [rendering extension](${paths.shopifyDevUrl}/extension-points#rendering) can
  use to build an interface. This UI is rendered natively by Shopify, so you
  can depend on it to be performant, accessible, and work in all of Checkout’s
  supported browsers. \n\nThe following components are available as part of Argo
  for Checkout, but make sure that you check the documentation for your
  [extension point](${paths.shopifyDevUrl}/extension-points#extension-points)
  to ensure the component is available in the extension points you are
  targeting.\n\n`;

  index += '<ul style="column-count: auto;column-width: 12rem;">';

  components.forEach(({value: {name, docs, props}}: any) => {
    const outputFile = `${componentDocsPath}/${name.toLowerCase()}.md`;
    const componentUrl = `${
      paths.shopifyDevUrl
    }/components/${name.toLowerCase()}`;

    const docsContent = docs ? strip(docs.content).trim() : '';

    let markdown = renderYamlFrontMatter({
      gid: findUuid(outputFile),
      url: componentUrl,
      title: `${name}`,
      description: `"${firstSentence(docsContent)}"`,
      hidden: true,
    });
    markdown += docsContent ? `${docsContent}\n\n` : '';

    const examples = renderComponentExamplesFor(name, paths.packages);
    if (examples.length > 0) {
      markdown += examples;
    }

    const face = nodes.find(({value}: any) => value.name === props.name);
    if (
      face &&
      face.value.kind === 'InterfaceType' &&
      face.value.properties.length > 0
    ) {
      markdown += '## Props\noptional = ?\n';
      markdown += propsTable(
        name,
        docs,
        face.value.properties,
        nodes,
        componentIndex,
        additionalPropsTables,
        false,
        undefined,
      );
    }

    markdown += dedupe(additionalPropsTables).reverse().join('');

    const contentFolder = resolve(
      `${paths.inputRoot}/src/components/${name}/content`,
    );
    markdown += getAdditionalContentFor(contentFolder);

    fs.writeFile(outputFile, markdown, function (err) {
      if (err) throw err;
    });

    additionalPropsTables.length = 0;
    index += `<li><a href="${componentUrl}">${name}</a></li>`;
  });

  index += '</ul>';

  // Write the component table of contents
  fs.writeFile(indexFile, index, function (err) {
    if (err) throw err;
  });
}

async function buildComponentGraph(componentIndex: string) {
  const graph = await createDependencyGraph(componentIndex);

  const nodes: Node[] = [];

  graph.forEach((value) => {
    value.locals.forEach((value: any, key) => {
      if (value.kind !== 'Imported') {
        if (value.name == null) {
          value.name = key;
        }
        nodes.push({value, module: undefined});
      }
    });
  });

  const components = [
    ...new Set(nodes.filter(({value}: any) => value.kind === 'Component')),
  ];

  // console.log(JSON.stringify(nodes))

  // Sort alphabetically (tsdoc seems to get this confused)
  components.sort((aa: any, bb: any) => {
    if (aa.value.name > bb.value.name) {
      return 1;
    } else if (aa.value.name < bb.value.name) {
      return -1;
    } else {
      return 0;
    }
  });

  return {nodes, components};
}

function renderComponentExamplesFor(name: string, packages: Packages): string {
  const examples: any = {};

  Object.keys(packages).forEach((packageName) => {
    const packagePath = packages[packageName];
    const folder = resolve(`${packagePath}/src/components/${name}/examples`);

    if (fs.existsSync(folder)) {
      fs.readdirSync(folder).forEach((file) => {
        const extension = extname(file).split('.').pop();
        examples[packageName] = `{% highlight ${extension} %}{% raw %}\n`;
        examples[packageName] += fs.readFileSync(`${folder}/${file}`, 'utf8');
        examples[packageName] += '\n{% endraw %}{% endhighlight %}\n\n';
      });
    }
  });

  let markdown = '';

  const exampleCount = Object.keys(examples).length;

  if (exampleCount > 1) {
    const sections = Object.keys(examples).join(', ');
    markdown += `{% sections "${sections}" %}\n\n`;
    markdown += Object.values(examples).join('\n\n----\n\n');
    markdown += '{% endsections %}\n\n';
  } else if (exampleCount > 0) {
    markdown += Object.values(examples).join('\n\n----\n\n');
  }

  return markdown;
}

function getAdditionalContentFor(contentFolder: string) {
  let markdown = '';

  if (fs.existsSync(contentFolder)) {
    fs.readdirSync(contentFolder).forEach((file) => {
      markdown += fs.readFileSync(`${contentFolder}/${file}`, 'utf8');
    });
  }

  return markdown;
}
