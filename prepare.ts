/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs-extra';

const PACKAGE_JSON = 'package.json';
const LIB_PATH = './lib';

fs.copySync(PACKAGE_JSON, path.join(LIB_PATH, PACKAGE_JSON));
