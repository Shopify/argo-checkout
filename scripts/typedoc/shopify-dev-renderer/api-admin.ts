import {resolve} from 'path';
import * as fs from 'fs';

import type {Paths} from '../types';

import {
  createDependencyGraph,
  filterGraph,
} from '../utilities/dependency-graph';
import type {Module} from '../utilities/dependency-graph';

import {
  renderYamlFrontMatter,
  findUuid,
  dedupe,
  propsTable,
  strip,
  firstSentence,
  mkdir,
  findExamplesFor,
  renderExamples,
} from './shared';
import type {Node} from './shared';

interface Options {
  componentsToSkip?: string[];
}

const additionalPropsTables: string[] = [];

export async function adminExtensionApi(paths: Paths, options: Options) {
  const {componentsToSkip = []} = options;
  const extensionsIndex = resolve(
    `${paths.inputRoot}/src/extension-api/index.ts`,
  );

  const graph = await createDependencyGraph(extensionsIndex);
  const allApis = filterGraph(
    graph,
    ({name, kind}) => kind === 'InterfaceType' && name.endsWith('Api'),
  );

  // also filter the graph for all nodes (in case we need to reference them)
  const nodes = filterNodes(graph);

  // Write API files
  const extensionApisPath = resolve(`${paths.outputRoot}/api`);
  mkdir(extensionApisPath);

  const extensionApisUrl = `${paths.shopifyDevUrl}/api`;

  const indexContent = [];

  allApis.forEach(({name, docs, properties}) => {
    if (componentsToSkip.includes(name)) return;
    const pathname = name.toLowerCase();
    const outputFile = `${extensionApisPath}/${pathname}.md`;
    const url = `${extensionApisUrl}/${pathname}`;

    const docsContent = docs ? strip(docs.content).trim() : '';

    // 0. yaml front matter
    let markdown = renderYamlFrontMatter({
      gid: findUuid(outputFile),
      url,
      title: `${name}`,
      description: `"${firstSentence(docsContent)}"`,
      hidden: true,
    });

    // 1. Intro content
    markdown += docsContent ? `${docsContent}\n\n` : '';

    // 2. Examples
    const examples = findExamplesFor(name, paths.packages, '/extension-api');
    if (examples.size > 0) {
      markdown += renderExamples(examples);
    }

    // 3. Props table
    // Since the root types for APIs in admin-ui-extensions are nested,
    // we don't render the first table, and omit the header for the
    // first additional prop table.
    markdown += '## Props\noptional = ?\n';

    propsTable(
      name,
      docs,
      properties,
      nodes,
      extensionsIndex,
      additionalPropsTables,
      false,
      undefined,
    );

    const propsTablesToRender = dedupe(additionalPropsTables)
      .reverse()
      .join('');
    markdown += removeFirstHeader(propsTablesToRender);

    additionalPropsTables.length = 0;

    fs.writeFile(outputFile, markdown, function (err) {
      if (err) throw err;
    });

    indexContent.push(`<li><a href="${url}">${name}</a></li>`);
  });

  // Write index file
  const indexFile = resolve(`${extensionApisPath}/index.md`);
  let indexMarkdown = renderYamlFrontMatter({
    gid: findUuid(indexFile),
    url: extensionApisUrl,
    title: 'Extension points API',
    hidden: true,
    description: 'Extension points API',
  });

  indexMarkdown += ['<ul>', ...indexContent, '</ul>'].join('\n');

  fs.writeFile(indexFile, indexMarkdown, function (err) {
    if (err) throw err;
  });

  console.log(
    `📄  Generated docs for ${allApis.length} APIs to ${extensionApisPath}`,
  );
}

function filterNodes(graph: Map<string, Module>): Node[] {
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
  return nodes;
}

function removeFirstHeader(markdown: string): string {
  const lines = markdown.split('\n');

  let indexToRemove = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('###')) {
      indexToRemove = i;
      break;
    }
  }

  if (indexToRemove !== -1) {
    lines.splice(indexToRemove, 1);
  }

  return lines.join('\n');
}
