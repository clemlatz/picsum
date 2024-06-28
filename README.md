# picsum

Picsum is a commmand-line utility that allows you to download random pictures to use as
placeholders from [LoremFlickr](https://loremflickr.com/).

## Requirements

- [Node.js v8+](https://nodejs.org/en/download/)

## Usage

```console
npx picsum
```

Options

```console
-V, --version           output the version number
-w, --width [width]     image width in pixels (default 100)
-h, --height [height]   image height in pixels (default 100)
-n, --number [number]   number of images to get (default 1)
-f, --filename [name]   set output filename (default image)
-r, --retina            download retina versions as well (default false)
-q, --query [keywords]  keywords for searching thematic pictures
-h, --help              output usage information
```

Example:

    npx picsum -w 1024 -h 768 -n 5 -f photo -r -q cats

will download five cats images in 1024x768 and in 2048x1536 (retina) and name them
`photo-1.jpg`, `photo-1@2x.jpg`, `photo-2.jpg`, `photo-2@2x.jpg`, etc. in the current
directory.

## TODO

- Tests!
- Prevent downloading the same image twice

## Changelog

### 1.1.2 (2020-09-16)

- Upgrade node-fetch dependency to fix security vulnerability

### 1.1.1 (2019-04-11)

- Fix typo in README

### 1.1.0 (2017-12-05)

- Add a query parameter to search image by keywords
- Use Unsplash Source instead of picsum.photos

### 1.0.0 (2017-11-16)

- First release
