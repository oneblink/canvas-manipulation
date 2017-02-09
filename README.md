# blinkmobile / canvas-manipulation [![npm](https://img.shields.io/npm/v/@blinkmobile/canvas-manipulation.svg?maxAge=2592000)](https://www.npmjs.com/package/@blinkmobile/canvas-manipulation) [![AppVeyor Status](https://img.shields.io/appveyor/ci/blinkmobile/canvas-manipulation/master.svg)](https://ci.appveyor.com/project/blinkmobile/canvas-manipulation) [![Travis CI Status](https://travis-ci.org/blinkmobile/canvas-manipulation.svg?branch=master)](https://travis-ci.org/blinkmobile/canvas-manipulation)

Helper functions for manipulating a HTMLCanvasElement

## Installation

1.  Install module via npm

    ```
    npm install @blinkmobile/canvas-manipulation --save
    ```

1.  Load this library and use a build step e.g. [webpack](https://webpack.github.io/) or [browserify](http://browserify.org/)

    ```js
    const canvasManipulation = require('@blinkmobile/canvas-manipulation')
    // OR
    import canvasManipulation from '@blinkmobile/canvas-manipulation'
    ```

1.  Or alternatively, load the script straight into a browser and access `canvasManipulation` globally

    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <script src="node_modules/@blinkmobile/canvas-manipulation/dist/canvas-manipulation.js"></script>
    </head>
    <body>
      ...
      <script>
        // available via window.canvasManipulation
      </script>
    </body>
    </html>
    ```

## Usage

##### `drawImageCentered(canvas: HTMLCanvasElement, image: CanvasImageSource)`

-   Draw a [CanvasImageSource](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) onto a [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)

-   Will center the image onto the canvas if the image is smaller than the canvas

-   Will scale the image down to fit if the image is bigger than the canvas

##### `resize(canvas: HTMLCanvasElement, width: number, height: number, scaleDown: boolean) : boolean`

-   Change the width and/or height of a [CanvasImageSource](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) while preserving the current content

-   Returns `true` if the canvas content has been preserved

-   If `scaleDown` is `false` and the content is larger than the newly sized canvas, the content will **not** be preserved

##### `toDataURLCropped(canvas: HTMLCanvasElement, type: string, encoderOptions: number) : string`

-   Create a [DataURL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) after cropping canvas content of white (transparent, the alpha must be 0) space

-   `type` and `encoderOptions` arguments are optional, see [HTMLCanvasElement.toDataURL() Parameters](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL#Parameters) for options and defaults

-   Returns a [DataURL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)

## Example

Check the `example` directory for a working example or run it yourself:

1.  Install [Node 6.x](https://nodejs.org/en/download/) or higher

1.  Clone this repository

    **Note**: The master branch can contain undocumented or backward compatibility breaking changes. You should checkout the latest release before running the demo.

1.  Install dependencies

    ```
    npm install
    ```

1.  Start demo

    ```
    npm start
    ```
