import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expected2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expected3 = '[{"name":"common","status":"nested","children":[{"name":"follow","status":"added","value":false},'
  + '{"name":"setting1","status":"unchanged","value":"Value 1"},{"name":"setting2","status":"deleted","value":200},'
  + '{"name":"setting3","status":"modified","valueBefore":true,"valueAfter":null},{"name":"setting4","status":"added",'
  + '"value":"blah blah"},{"name":"setting5","status":"added","value":{"key5":"value5"}},'
  + '{"name":"setting6","status":"nested","children":[{"name":"doge","status":"nested","children":[{"name":"wow",'
  + '"status":"modified","valueBefore":"","valueAfter":"so much"}]},{"name":"key","status":"unchanged","value":"value"},'
  + '{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","status":"nested","children":[{"name":"baz",'
  + '"status":"modified","valueBefore":"bas","valueAfter":"bars"},{"name":"foo","status":"unchanged","value":"bar"},'
  + '{"name":"nest","status":"modified","valueBefore":{"key":"value"},"valueAfter":"str"}]},{"name":"group2",'
  + '"status":"deleted","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"added","value":{"deep":'
  + '{"id":{"number":45}},"fee":100500}}]';

test('stylish json files', () => {
  const actual = genDiff('__fixtures__/nested1.json', '__fixtures__/nested2.json');

  expect(actual).toEqual(expected);
});

test('stylish yaml files', () => {
  const actual = genDiff('__fixtures__/nested1.yml', '__fixtures__/nested2.yaml');

  expect(actual).toEqual(expected);
});

test('plain json files', () => {
  const actual = genDiff('__fixtures__/nested1.yml', '__fixtures__/nested2.yaml', 'plain');

  expect(actual).toEqual(expected2);
});

test('json format', () => {
  const actual = genDiff('__fixtures__/nested1.yml', '__fixtures__/nested2.yaml', 'json');

  expect(actual).toEqual(expected3);
});
