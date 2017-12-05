# picsum

Picsum is a commmand-line utility that allows you to download random pictures to use as placeholders
from [picsum.photos](http://picsum.photos/).

## Install

1. Install [node & npm](https://nodejs.org/en/download/) (node v8 required)
2. `npm install -g picsum`

## Usage

    Usage: picsum [options]

    Options:

    -V, --version          output the version number
    -w, --width [width]    image width in pixels (default 100)
    -h, --height [height]  image height in pixels (default 100)
    -n, --number [number]  number of images to get (default 1)
    -f, --filename [name]  set output filename (default image)
    -r, --retina           download retina versions as well (default false)
    -h, --help             output usage information

Example:

    piscum -w 1024 -h 768 -n 5 -f photo -r

will download five 1024x768 images plus five 2048x1536 (retina) images and name them `photo-1.jpg`, `photo-1@2x.jpg`, `photo-2.jpg`, `photo-2@2.jpg`, etc. in the current directory.


## TODO

* Tests!

## Changelog

### DEV
* Use Unsplash Source instead of picsum.photos

### 1.0.0 (2017-11-16)
* First release
