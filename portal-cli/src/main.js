#!/usr/bin/env node

const program = require('commander');
const { importxml } = require('./bin/importxml');

program.version('1.0.0').description('Portal Command Line Interface (CLI)');

program
  .command('importxml <filename>')
  .alias('i')
  .description('Load XML into develop backend')
  .action((name) => importxml(name));

program.parse(process.argv);
