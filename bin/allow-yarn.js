#!/usr/bin/env node

const { basename, resolve } = require('path');
const { unlinkSync, existsSync } = require('fs');

if (basename(process.env.npm_execpath) !== 'yarn.js') {
  console.log(`
  ╔═════════════════════════════════════════════════════════════╗
  ║                                                             ║
  ║   Use "yarn" for installation in this project.              ║
  ║                                                             ║
  ║   If you don't have Yarn, install it via "npm i -g yarn".   ║
  ║   For more details, go to https://yarnpkg.com/              ║
  ║                                                             ║
  ╚═════════════════════════════════════════════════════════════╝
  `);

  try {
    if (existsSync(resolve(__dirname, '../pnpm-lock.yaml'))) {
      unlinkSync(resolve(__dirname, '../pnpm-lock.yaml'));
    }

    if (existsSync(resolve(__dirname, '../package-lock.json'))) {
      unlinkSync(resolve(__dirname, '../package-lock.json'));
    }
  } catch (err) {
    // ignore
  }

  process.exit(1);
}
