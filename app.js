#!/usr/bin/env node

'use strict';

const fs    = require('fs');
const fetch = require('node-fetch');

const getImage = async function(imageWidth, imageHeight, iteration, filename, retina) {

  const url      = `https://source.unsplash.com/${imageWidth}x${imageHeight}`;
  const imageNum = iteration + 1;

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

const program = require('commander');

program
  .version('1.0.0')
  .option('-w, --width [width]',   'image width in pixels (default 100)')
  .option('-h, --height [height]', 'image height in pixels (default 100)')
  .option('-n, --number [number]', 'number of images to get (default 1)')
  .option('-f, --filename [name]', 'set output filename (default image)')
  .option('-r, --retina',          'download retina versions as well (default false)')
  .parse(process.argv);

const imageWidth  = program.width    || 100;
const imageHeight = program.height   || program.width || 100;
const number      = program.number   || 1;
const filename    = program.filename || 'image';
const retina      = program.retina   || false;

for (let i = 0; i < number; i++) {
  getImage(imageWidth, imageHeight, i, filename, retina).catch((error) => process.stdout.write(`Error: ${error}\n`));
}
