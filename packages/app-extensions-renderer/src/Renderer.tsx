import {AppProvider, FormLayout} from '@shopify/polaris';
import React from 'react';
import {parseLisp} from './ast';
import buildStdlib from './stdlib';
import {DataSource} from './useDataSource';

interface ComponentList {
  [name: string]: any;
}
interface PropList {
  [name: string]: any;
}

interface RendererProps {
  code: string;
  dataSource: DataSource;
  components: ComponentList;
  onWorkerAction: (id: string) => void;
}

export function Renderer({code, dataSource, components, onWorkerAction}: RendererProps) {
  const library = {
    ...buildStdlib(dataSource, onWorkerAction),
    ...buildComponentLib(components),
  };

  const ast = parseLisp(code);
  const view = ast.evaluate(library);
  console.log(ast, view);
  if (view) {
    return (
      <AppProvider i18n={{}}>
        <FormLayout>{view}</FormLayout>
      </AppProvider>
    );
  }
  return null;
}

function buildComponentLib(components: ComponentList): ComponentList {
  return Object.keys(components).reduce((lib: ComponentList, name) => {
    lib[name] = reactify(components[name]);
    return lib;
  }, {});
}

const reactify = (component: any) => (props: PropList, children: any) => {
  return React.createElement(component, props, children);
};
