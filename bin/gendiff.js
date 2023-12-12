#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.opts().format);
    console.log(diff);
  })
  .parse()
