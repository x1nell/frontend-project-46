import _ from 'lodash';

const plain = (tree) => {
  const iter = (node, acc) => {
    const setValueText = (value) => {
      if (_.isObject(value)) {
        return '[complex value]';
      }

      if (typeof value === 'string') {
        return `'${value}'`;
      }

      return value;
    };

    const result = node.reduce((accum, obj) => {
      const name = acc ? `${acc}.${obj.name}` : obj.name;
      if (obj.status === 'unchanged') {
        return accum;
      }
      if (obj.status === 'added') {
        return [...accum, `Property '${name}' was added with value: ${setValueText(obj.value)}`];
      }
      if (obj.status === 'deleted') {
        return [...accum, `Property '${name}' was removed`];
      }

      if (obj.status === 'modified') {
        return [...accum, `Property '${name}' was updated. From ${setValueText(obj.valueBefore)} to ${setValueText(obj.valueAfter)}`];
      }

      return [...accum, iter(obj.children, `${name}`)];
    }, []);

    return result.join('\n');
  };

  return iter(tree, '');
};

export default plain;
