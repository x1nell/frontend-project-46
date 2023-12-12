import _ from 'lodash';

const stylish = (tree) => {
  const replacer = ' ';
  const spaceCount = 4;

  const iter = (node, depth) => {
    const indentSize = depth * spaceCount;
    const littleIndentSize = depth * spaceCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const currentLittleIndent = replacer.repeat(littleIndentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    const iterIfNested = (value) => {
      if (_.isObject(value)) {
        return iter([value], depth + 1);
      }

      return value;
    };

    const result = node.map((obj) => {
      const value = `${obj.name}: ${iterIfNested(obj.value)}`;
      if (obj.status === 'added') {
        return `${currentLittleIndent}+ ${value}`;
      }
      if (obj.status === 'deleted') {
        return `${currentLittleIndent}- ${value}`;
      }

      if (obj.status === 'unchanged') {
        return `${currentIndent}${value}`;
      }

      if (obj.status === 'modified') {
        const valueBefore = `${currentLittleIndent}- ${obj.name}: ${iterIfNested(obj.valueBefore)}`;
        const valueAfter = `${currentLittleIndent}+ ${obj.name}: ${iterIfNested(obj.valueAfter)}`;
        return `${valueBefore}\n${valueAfter}`;
      }

      if (obj.status === 'nested') {
        return `${currentIndent}${obj.name}: ${iter(obj.children, depth + 1)}`;
      }

      const keys = Object.keys(obj);
      const nestedObj = keys.map((key) => `${currentIndent}${key}: ${iterIfNested(obj[key])}`);

      return nestedObj.join('\n');
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
