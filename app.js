#!/usr/bin/env node

'use strict';

const fs    = require('fs');
const fetch = require('node-fetch');

const getImage = async function(imageWidth, imageHeight, iteration, filename) {

  const url = `https://picsum.photos/${imageWidth}/${imageHeight}?random`

  const res = await fetch(url);
  const dest = fs.createWriteStream(`./${filename}-${iteration+1}.jpg`);
	res.body.pipe(dest);
  process.stdout.write(`Downloading image ${iteration+1} (${imageWidth}*${imageHeight})...\n`)
}

const program = require('commander');

program
  .version('0.0.1')
  .option('-w, --width [width]',   'image width in pixels (default 100)')
  .option('-h, --height [height]', 'image height in pixels (default 100)')
  .option('-n, --number [number]', 'number of images to get (default 1)')
  .option('-f, --filename [name]', 'set output filename (default image)')
  .parse(process.argv);

const imageWidth  = program.width    || 100;
const imageHeight = program.height   || program.width || 100;
const number      = program.number   || 1;
const filename    = program.filename || 'image';

for (let i = 0; i < number; i++) {
  getImage(imageWidth, imageHeight, i, filename).catch((error) => process.stdout.write(`Error: ${error}\n`));
}
