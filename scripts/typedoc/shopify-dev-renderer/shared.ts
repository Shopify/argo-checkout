import * as fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import markdownTable from 'markdown-table'

import type {
  LocalReference,
  RemoteComponent,
  Type,
  Documentation,
  PropertySignature,
  Tag,
} from '../types';

import {Module} from '../utilities/dependency-graph';

export interface Node {
  value: RemoteComponent | Type | LocalReference;
  module: Module | undefined;
}

interface FrontMatter {
  gid: string;
  url: string;
  title: string;
  description?: string;
  hidden: boolean;
}

export function renderYamlFrontMatter(frontMatter: FrontMatter) {
  let matter = '---\n';

  (Object.keys(frontMatter) as (keyof FrontMatter)[]).forEach((key) => {
    matter += `${key}: ${frontMatter[key]}\n`;
  });

  matter += '---\n\n';
  return matter;
}

export function findUuid(file: string) {
  let uuid = uuidv4();
  if (fs.existsSync(file)) {
    const uuidMatch = fs
      .readFileSync(file, 'utf8')
      .match(
        /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g,
      );

    if (uuidMatch != null) {
      uuid = uuidMatch[0];
    }
  }

  return uuid;
}

export function dedupe<T>(array: T[]) {
  return [...new Set(array)];
}

export function propsTable(
  name: string,
  docs: Documentation | undefined,
  properties: PropertySignature[],
  exports: Node[],
  dir: string,
  additionalPropsTables: string[],
  titleAndDocs = true,
  headingLevel = 2,
) {
  let markdown = '';

  if (titleAndDocs) {
    let heading = '';
    for (let hh = 0; hh < headingLevel; hh++) {
      heading += '#';
    }
    markdown += `<a name="${name}"></a>\n\n${heading} ${name}\n\n`;
    markdown += `${docs ? `${strip(docs.content).trim()}\n\n` : ''}`;
  } else {
    markdown += '\n';
  }

  const table = [];

  // table header row
  const propertiesHaveParameters = properties.filter(({parameters}) => parameters).length > 0;
  if(propertiesHaveParameters){
    table.push(['Type', 'Description'])
  } else {
    table.push(['Name', 'Type', 'Description'])
  }


  properties.forEach(
    ({name: propName, optional, value, docs: propDocs, parameters}) => {
      if (propName === 'Checkout::KitchenSink') return;

      if(parameters) {
        const thisParamType = paramsType(
          parameters,
          exports,
          dir,
          additionalPropsTables
        );
        const thisPropType = propType(value, exports, dir, additionalPropsTables);
        const type = `<code>(${thisParamType}): ${thisPropType}</code>`;
        const description = propDocs ? strip(propDocs.content) : ''
        table.push([type, description]);
      } else {
        const name = `${propName}${optional ? '?' : ''}`;
        const type = `<code>${propType(
          value,
          exports,
          dir,
          additionalPropsTables
        )}</code>`;

        const content = propDocs ? strip(propDocs.content) : '';
        const tags = propDocs?.tags?.length
        ? propDocs.tags.map(stringifyTag).join('\n')
        : '';
        const description = `${newLineToBr(content + tags)}`;

        table.push([name, type, description]);
      }
    }
  );

  markdown += markdownTable(table, {
    stringLength: () => 3,
  });

  return markdown;
}

function newLineToBr(string): string {
  return string
   .replace(/\n\n/g, '<br /><br />')
   .replace(/\n/g, ' ')
}


function propType(value: any, exports: any[], dir: string, additionalPropsTables: string[]): any {
  let params = '';
  if (value.params != null && value.params.length > 0) {
    params = `<<wbr>${value.params
      .map((param: any) => propType(param, exports, dir, additionalPropsTables))
      .join(', ')}<wbr>>`;
  }

  switch (value.kind) {
    case 'AnyType':
      return 'any';
    case 'NullType':
      return 'null';
    case 'UnknownType':
      return 'unknown';
    case 'VoidType':
      return 'void';
    case 'StringType':
      return 'string';
    case 'BooleanType':
      return 'boolean';
    case 'ArrayType':
      return `${propType(value.elements, exports, dir, additionalPropsTables)}[]`;
    case 'NumberType':
      return 'number';
    case 'Local':
      // eslint-disable-next-line no-case-declarations
      const local = exports.find(
        ({value: exportValue}: any) => exportValue.name === value.name,
      );

      if (local == null) {
        // eslint-disable-next-line no-console
        console.warn(
          `Can’t resolve export type \`${value.name}\` in ${dir}. Maybe it’s not exported from the component index or imported from a remote package.`,
        );

        return `${value.name}${params}`;
      }
      local.value.params = value.params;
      return propType(local.value, exports, dir, additionalPropsTables);
    case 'InterfaceType':
      additionalPropsTables.push(
        propsTable(
          value.name,
          value.docs,
          value.properties,
          exports,
          dir,
          additionalPropsTables,
          true,
          3,
        ),
      );
      return `<a href="#${value.name}">${value.name}</a>${params}`;
    case 'UnionType':
      const PIPE = '&#124;';
      const union = value.types
        .map((type: any) => {
          return propType(type, exports, dir, additionalPropsTables);
        })
        .join(` ${PIPE} `)
      return `${union}`;
    case 'StringLiteralType':
      return `"${value.value}"`;
    case 'NumberLiteralType':
      return `${value.value}`;
    case 'BooleanLiteralType':
      return `${value.value}`;
    case 'FunctionType':
      return `(${paramsType(
        value.parameters,
        exports,
        dir,
        additionalPropsTables
      )}) => ${propType(value.returnType, exports, dir, additionalPropsTables)}`;
    case 'MappedType':
      // eslint-disable-next-line no-case-declarations
      const ref = exports.find(
        ({value: exportValue}: any) => exportValue.name === value.ref,
      );
      // special case for Responsive only
      additionalPropsTables.push(responsive(ref, additionalPropsTables));
      return `<a href="#${value.name}">${value.name}</a>`;
    default:
      if (value.kind === 'UndocumentedType' && value.name === 'T') {
        return 'T';
      }
      return `<pre>${JSON.stringify(value, null, 2)}</pre>`;
  }
}

function sentenceCaseTagName(tagName: string) {
  const input = tagName.slice(1);
  const result = input.replace(/([A-Z])/g, ' $1').toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function stringifyTag(tag: Tag) {
  let string = sentenceCaseTagName(tag.name);
  if (tag.content) {
    string += `: <code>${tag.content}</code>`;
  }
  return string;
}

function escapeHTML(html: string) {
  const chars: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&#34;',
  };
  return html.replace(/[&<>"]/g, (tag: string) => chars[tag] || tag);
}

export function strip(content: string) {
  return escapeHTML(
    content
      .replace('/**', '')
      .replace('*/', '')
      .replace(/\n \* /g, '\n')
      .replace(/\n \*/g, '\n')
      .replace(/\n\n \* /g, '\n\n')
  );
}

export function firstSentence(content: string) {
  const lines = content.split(/(\n|\. )/g);
  let firstSentence = lines.length ? lines[0] : content;
  if(firstSentence[firstSentence.length-1] !== '.'){
    firstSentence += '.';
  }
  return firstSentence;
}

function paramsType(params: any[], exports: any[], dir: string, additionalPropsTables: string[]) {
  return params
    .map((param) => `${param.name}: ${propType(param.type, exports, dir, additionalPropsTables)}`)
    .join(', ');
}

function responsive(breakpoint: any, additionalPropsTables: string[]) {
  const breakpoints = propType(breakpoint.value, [], '', additionalPropsTables);

  let markdown = '<a name="Responsive"></a>\n\n### Responsive\n\n';

  markdown += `Responsive is a [Mapped Type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html). It allows you to set different values at different breakpoints by providing an object where the keys are Breakpoints: <code>${breakpoints}</code>\n\n`;
  markdown +=
    'For example, if a property accepts `number | Responsive`, it would accept a number or an object where the keys are Breakpoints and the values are numbers:\n\n';
  markdown += `{% highlight js %}{% raw %}
{
  'base': 1,
  'small': 0.5,
  'large': 2
}
{% endraw %}{% endhighlight %}\n\n`;

  return markdown;
}
