import { test, expect } from '@jest/globals'
import fs from 'fs';
import path from 'path';
import parseFile from '../src/parser.js';

const expected = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

test('json file', () => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/nested1.json'), 'utf-8');
  const actual = parseFile(file1, '.json');
  expect(actual).toEqual(expected);
});

test('yaml file', () => {
  const file2 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/nested1.yml'), 'utf-8');
  const actual = parseFile(file2, '.yml');
  expect(actual).toEqual(expected);
});

test('another format', () => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/nested1.json'), 'utf-8');
  const actual = parseFile(file1, 'asn');
  expect(actual).toEqual({});
});
