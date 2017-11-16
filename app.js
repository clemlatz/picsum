#!/usr/bin/env node

'use strict';

const fs    = require('fs');
const fetch = require('node-fetch');

const getImage = async function(imageWidth, imageHeight) {

  const url = `https://picsum.photos/${imageWidth}/${imageHeight}?random`

  const res = await fetch(url);
  const dest = fs.createWriteStream('./image.jpg');
	res.body.pipe(dest);
}

const program = require('commander');

program
  .version('0.0.1')
  .option('-w, --width [width]', 'image width in pixels')
  .option('-h, --height [height]','image height in pixels')
  .parse(process.argv);

const imageWidth  = program.width || 100;
const imageHeight = program.height || program.width || 100;

getImage(imageWidth, imageHeight);
