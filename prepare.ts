/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs-extra';

const LIB_PATH = './lib';

const preservedFiles = [
  'package.json',
  'README.md',
];

for (const file of preservedFiles) {
  fs.copySync(file, path.join(LIB_PATH, file));
}
