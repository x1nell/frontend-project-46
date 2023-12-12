import jsYaml from 'js-yaml';

const parseFile = (filename, ext) => {
  if (ext === '.json') {
    return JSON.parse(filename);
  }

  if (ext === '.yml' || ext === '.yaml') {
    return jsYaml.load(filename);
  }

  return {};
};

export default parseFile
