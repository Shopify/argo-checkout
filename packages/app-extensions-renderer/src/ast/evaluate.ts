import {AST, traverse} from '.';

type ReturnValueOrConstant<T> = T extends (...args: any[]) => infer U ? U : T;
type EvaluationResult<T> = ReturnValueOrConstant<T[keyof T]>;

export default function<T extends {[name: string]: any}>(
  ast: AST,
  context?: T,
): EvaluationResult<T> {
  return traverse(ast, (type, value) => {
    switch (type) {
      case 'identifier':
        return context ? context[value] : undefined;
      case 'literal':
        return value;
      case 'list':
        const [first, ...rest] = value;
        if (typeof first === 'function') return first.call(undefined, ...rest);
        return [first, ...rest];
    }
  });
}