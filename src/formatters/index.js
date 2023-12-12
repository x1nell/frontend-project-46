import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTree = (tree, format) => {
  if (format === 'stylish') {
    return stylish(tree);
  }

  if (format === 'plain') {
    return plain(tree);
  }

  if (format === 'json') {
    return json(tree);
  }

  return {};
};

export default formatTree
