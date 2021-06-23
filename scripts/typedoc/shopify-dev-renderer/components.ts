import {resolve, extname} from 'path';
import * as fs from 'fs';

import type {Paths, Packages} from '../types';

import {createDependencyGraph} from '../utilities/dependency-graph';

import {compileForSandbox} from './compile-for-sandbox';

import {
  renderYamlFrontMatter,
  visibilityToFrontMatterMap,
  findUuid,
  dedupe,
  propsTable,
  strip,
  firstSentence,
} from './shared';
import type {Node, Visibility} from './shared';

export interface Content {
  title: string;
  frontMatterDescription: string;
  description: string;
}

interface Options {
  subcomponentMap?: {[rootComponent: string]: string[]};
  componentsToSkip?: string[];
  generateReadmes?: boolean;
  compileExamples?: boolean;
  visibility?: Visibility;
}

export async function components(
  paths: Paths,
  content: Content,
  options: Options = {},
) {
  const {title, frontMatterDescription, description} = content;
  const componentIndex = resolve(`${paths.inputRoot}/src/components/index.ts`);
  const {nodes, components} = await buildComponentGraph(componentIndex);
  const {
    subcomponentMap = {},
    componentsToSkip = [],
    generateReadmes = false,
    visibility = 'hidden',
    compileExamples = false,
  } = options;

  const visibilityFrontMatter = visibilityToFrontMatterMap.get(visibility);

  const outputRoot = resolve(`${paths.outputRoot}`);
  const componentDocsPath = resolve(`${paths.outputRoot}/components`);

  if (!fs.existsSync(outputRoot)) {
    fs.mkdirSync(outputRoot, {recursive: true});
  }

  if (!fs.existsSync(componentDocsPath)) {
    fs.mkdirSync(componentDocsPath, {recursive: true});
  }

  const indexFile = resolve(`${paths.outputRoot}/components/index.md`);
  let index = renderYamlFrontMatter({
    gid: findUuid(indexFile),
    url: `${paths.shopifyDevUrl}/components/index`,
    title: title,
    description: frontMatterDescription,
    ...visibilityFrontMatter,
  });

  index += `${description}\n\n`;

  index += '<ul style="column-count: auto;column-width: 12rem;">';

  components.forEach(({value: {name, docs, props}}: any) => {
    if (componentsToSkip.includes(name)) return;

    const filename = name.toLowerCase();
    const outputFile = `${componentDocsPath}/${filename}.md`;

    const docsContent = docs ? strip(docs.content).trim() : '';

    const componentUrl = `${paths.shopifyDevUrl}/components/${filename}`;

    let markdown = renderYamlFrontMatter({
      gid: findUuid(outputFile),
      url: componentUrl,
      title: `${name}`,
      description: `"${firstSentence(docsContent)}"`,
      ...visibilityFrontMatter,
    });
    const docsContentMd = docsContent ? `${docsContent}\n\n` : '';
    markdown += docsContentMd;

    markdown += renderExampleImageFor(name, paths.shopifyDevAssets);

    const examples = renderComponentExamplesForComponent(name, paths.packages);
    if (examples.length > 0) {
      markdown += examples;
    }

    const additionalPropsTables: string[] = [];
    let propsTableMd = '';
    const face = nodes.find(({value}: any) => value.name === props.name);
    if (
      face &&
      face.value.kind === 'InterfaceType' &&
      face.value.properties.length > 0
    ) {
      propsTableMd += '## Props\noptional = ?\n';
      propsTableMd += propsTable(
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
    markdown += propsTableMd;

    const additionalPropsTablesMd = dedupe(additionalPropsTables)
      .reverse()
      .join('');
    markdown += additionalPropsTablesMd;

    if (Object.keys(subcomponentMap).includes(name)) {
      const subcomponentsMd = subcomponentMap[name]
        .map((subcomponent) => {
          const {
            value: {name: subName, docs: subDocs, props: subProps},
          } = components.find(
            ({value}: any) => value.name === subcomponent,
          ) as any;

          const subTitle = `## ${subName}\n\n`;
          const subDocsContent = subDocs ? strip(subDocs.content).trim() : '';
          const subDocsContentMd = subDocsContent
            ? `${subDocsContent}\n\n`
            : '';
          const subAdditionalPropsTables: string[] = [];
          let subPropsTableMd = '';
          const subFace = nodes.find(
            ({value}: any) => value.name === subProps.name,
          );
          if (
            subFace &&
            subFace.value.kind === 'InterfaceType' &&
            subFace.value.properties.length > 0
          ) {
            subPropsTableMd += '### Props\noptional = ?\n';
            subPropsTableMd += propsTable(
              subName,
              subDocs,
              subFace.value.properties,
              nodes,
              componentIndex,
              subAdditionalPropsTables,
              false,
              undefined,
            );
          }

          return (
            subTitle +
            subDocsContentMd +
            subPropsTableMd +
            subAdditionalPropsTables
          );
        })
        .join('\n\n');

      markdown += '\n\n' + subcomponentsMd;
    }

    const contentFolder = resolve(
      `${paths.inputRoot}/src/components/${name}/content`,
    );
    const additionalContent =
      '\n\n' + getAdditionalContentFor(contentFolder, paths.shopifyDevUrl);
    markdown += additionalContent;

    fs.writeFile(outputFile, markdown, function (err) {
      if (err) throw err;
    });

    if (generateReadmes === true) {
      const readmeFile = resolve(
        `${paths.inputRoot}/src/components/${name}/README.md`,
      );
      const title = `# ${name}\n\n`;
      let readmeMarkdown =
        title + docsContentMd + propsTableMd + additionalPropsTablesMd;

      fs.writeFile(readmeFile, readmeMarkdown, function (err) {
        if (err) throw err;
      });
    }

    if(compileExamples === true) {

    }

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

function renderComponentExamplesForComponent(componentName: string, packages: Packages): string {
  const examples = findExamplesForComponent(componentName, packages);

  let markdown = '';

  if (examples.size > 1) {
    const sections = [...examples.keys()].join(', ');
    markdown += `{% sections "${sections}" %}\n\n`;

    examples.forEach(example => {
      markdown += `{% highlight ${example.extension} %}{% raw %}\n`;
      markdown += `${example.content}`;
      markdown += '\n{% endraw %}{% endhighlight %}\n\n';
    })

    markdown += Object.values(examples).join('\n\n----\n\n');
    markdown += '{% endsections %}\n\n';
  } else if (examples.size > 0) {
    markdown += Object.values(examples).join('\n\n----\n\n');
  }

  return markdown;
}


interface Example {
  extension: string;
  content: string;
}

function findExamplesForComponent(componentName: string, packages: Packages): Map<string, Example> {
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

function renderExampleImageFor(
  componentName: string,
  shopifyDevAssetsUrl: string,
) {
  const filename = componentName.toLowerCase();
  const image = resolve(`${shopifyDevAssetsUrl}/components/${filename}.png`);
  if (fs.existsSync(image)) {
    return `---\n### Example\n![${filename}](/assets/api/checkout-extensions/components/${filename}.png)`;
  }

  return '';
}

function getAdditionalContentFor(contentFolder: string, shopifyDevUrl: string) {
  let markdown = '';

  if (fs.existsSync(contentFolder)) {
    fs.readdirSync(contentFolder).forEach((file) => {
      markdown += fs.readFileSync(`${contentFolder}/${file}`, 'utf8');
    });
  }

  markdown = markdown.replace(
    /https:\/\/github\.com\/Shopify\/ui-extensions\/tree\/main\/packages\/checkout-ui-extensions\/src\/components\/(\w+)/g,
    (_match, p1) => `${shopifyDevUrl}/components/${p1}`.toLowerCase(),
  );
  markdown = markdown.replace(
    /https:\/\/github\.com\/Shopify\/checkout-web\/tree\/master\/packages\/checkout-ui-extensions\/src\/components\/(\w+)/g,
    (_match, p1) => `${shopifyDevUrl}/components/${p1}`.toLowerCase(),
  );

  return markdown;
}
