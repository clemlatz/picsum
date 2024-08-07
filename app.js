#!/usr/bin/env node

'use strict';

import fs from 'fs';
import fetch from 'node-fetch';
import program from 'commander';

const getImage = async function(imageWidth, imageHeight, iteration, filename, retina, query) {

  let url        = `https://loremflickr.com/${imageWidth}/${imageHeight}`
  const imageNum = iteration + 1;

  if (query !== null) {
    url += `/${query}`;
  }

  const res = await fetch(url);
  const dest = fs.createWriteStream(`./${filename}-${imageNum}.jpg`);
	res.body.pipe(dest);
  process.stdout.write(`Downloading image ${imageNum} (${imageWidth}*${imageHeight})...\n`)

  if (retina) {
    const imageWidthRetina  = imageWidth * 2;
    const imageHeightRetina = imageHeight * 2;
    const urlRetina = res.url.replace(imageWidth, imageWidthRetina).replace(imageHeight, imageHeightRetina);
    const resRetina  = await fetch(urlRetina);
    const destRetina = fs.createWriteStream(`./${filename}-${iteration+1}@2x.jpg`);
  	resRetina.body.pipe(destRetina);
    process.stdout.write(`Downloading retina image ${iteration+1} (${imageWidth*2}*${imageHeight*2})...\n`);
  }
}

program
  .version('1.1.0')
  .option('-w, --width [width]',    'image width in pixels (default 100)')
  .option('-h, --height [height]',  'image height in pixels (default 100)')
  .option('-n, --number [number]',  'number of images to get (default 1)')
  .option('-f, --filename [name]',  'set output filename (default image)')
  .option('-r, --retina',           'download retina versions as well (default false)')
  .option('-q, --query [keywords]', 'keywords for searching thematic pictures')
  .parse(process.argv);

const imageWidth  = program.width    || 100;
const imageHeight = program.height   || program.width || 100;
const number      = program.number   || 1;
const filename    = program.filename || 'image';
const retina      = program.retina   || false;
const query       = program.query    || null;

for (let i = 0; i < number; i++) {
  getImage(imageWidth, imageHeight, i, filename, retina, query).catch((error) => process.stdout.write(`Error: ${error}\n`));
}
