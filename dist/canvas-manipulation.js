/*
 * @blinkmobile/canvas-manipulation: v1.0.0
 * https://github.com/blinkmobile/canvas-manipulation#readme
 *
 * Copyright 2017 BlinkMobile
 * Released under the MIT license
 *
 * Helper functions for manipulating a HTMLCanvasElement
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.canvasManipulation = global.canvasManipulation || {})));
}(this, (function (exports) { 'use strict';

/* @flow */
function getCanvasRenderingContext2D(canvas /* : HTMLCanvasElement */
) /* : CanvasRenderingContext2D */{
  var ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new TypeError('CanvasRenderingContext2D could not be created from <canvas> element');
  }
  return ctx;
}

/* @flow */
function drawImageCentered(canvas /* : HTMLCanvasElement */
, image /* : CanvasImageSource */
) /* : void */{
  var width = canvas.width;
  var height = canvas.height;
  var hRatio = width / image.width;
  var vRatio = height / image.height;
  var ratio = Math.min(hRatio, vRatio, 1);
  var centerShiftX = (width - image.width * ratio) / 2;
  var centerShiftY = (height - image.height * ratio) / 2;
  var destWidth = image.width * ratio;
  var destHeight = image.height * ratio;
  var ctx = getCanvasRenderingContext2D(canvas);
  // ctx.clearRect(0, 0, width, height)
  ctx.clearRect(centerShiftX, centerShiftY, destWidth, destHeight);
  ctx.drawImage(image, centerShiftX, centerShiftY, destWidth, destHeight);
}

/* @flow */
function createCanvasFromImageData(imageData /* : ImageData */
) /* : HTMLCanvasElement */{
  var canvas = document.createElement('canvas');
  var ctx = getCanvasRenderingContext2D(canvas);

  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.clearRect(0, 0, imageData.width, imageData.height);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

/* @flow */
function getImageDataCropped(canvas /* : HTMLCanvasElement */
) /* : ImageData | void */{
  var imgWidth = canvas.width;
  var imgHeight = canvas.height;
  var ctx = getCanvasRenderingContext2D(canvas);
  var imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

  var data = imageData.data;
  var getAlpha = function getAlpha(x, y) {
    return data[(imgWidth * y + x) * 4 + 3];
  };
  var scanY = function scanY(fromTop) {
    var offset = fromTop ? 1 : -1;

    // loop through each row
    for (var y = fromTop ? 0 : imgHeight - 1; fromTop ? y < imgHeight : y > -1; y += offset) {
      // loop through each column
      for (var x = 0; x < imgWidth; x += 1) {
        if (getAlpha(x, y)) {
          return y;
        }
      }
    }
    return null; // all image is transparent
  };
  var scanX = function scanX(fromLeft) {
    var offset = fromLeft ? 1 : -1;

    // loop through each column
    for (var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? x < imgWidth : x > -1; x += offset) {
      // loop through each row
      for (var y = 0; y < imgHeight; y += 1) {
        if (getAlpha(x, y)) {
          return x;
        }
      }
    }
    return null; // all image is transparent
  };
  var cropTop = scanY(true);
  var cropBottom = scanY(false);
  var cropLeft = scanX(true);
  var cropRight = scanX(false);
  if (cropTop === null || cropBottom === null || cropLeft === null || cropRight === null) {
    return;
  }
  // If the image has a 1 pixel width, cropRight and cropLeft would be the same value
  // hence the need to add an extra pixel to the width and height values
  var width = cropRight - cropLeft + 1;
  var height = cropBottom - cropTop + 1;
  return ctx.getImageData(cropLeft, cropTop, width, height);
}

/* @flow */
function resize(canvas /* : HTMLCanvasElement */
, width /* : number */
, height /* : number */
, scaleDown /* : boolean */
) /* : boolean */{
  // Dont do anything if width and height have not changed
  if (canvas.width === width && canvas.height === height) {
    return true;
  }

  // Get the cropped image inside the canvas so that we can check if we need
  // to resize the image before we resize the canvas
  var croppedImageData = getImageDataCropped(canvas);

  // If image is completly transparent, just resize.
  if (!croppedImageData) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  // If the cropped image will fit inside the new canvas size,
  // we can just center it inside the new canvas
  if (width >= croppedImageData.width && height >= croppedImageData.height) {
    var centerShiftX = (width - croppedImageData.width) / 2;
    var centerShiftY = (height - croppedImageData.height) / 2;
    var ctx = getCanvasRenderingContext2D(canvas);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(croppedImageData, centerShiftX, centerShiftY, 0, 0, croppedImageData.width, croppedImageData.height);
    return true;
  }

  // If the cropped image will not fit inside the new canvas size
  // we can either scale the image down to fit or just clear the canvas
  if (!scaleDown) {
    canvas.width = width;
    canvas.height = height;
    return false;
  }

  var croppedCanvas = createCanvasFromImageData(croppedImageData);
  canvas.width = width;
  canvas.height = height;
  drawImageCentered(canvas, croppedCanvas);
  return true;
}

/* @flow */
function toDataURLCropped(canvas /* : HTMLCanvasElement */
, type /* : string | void */
, encoderOptions /* : number | void */
) /* : string | void */{
  var imageData = getImageDataCropped(canvas);
  if (!imageData) {
    return;
  }
  var croppedCanvas = createCanvasFromImageData(imageData);
  return croppedCanvas.toDataURL(type, encoderOptions);
}

/* @flow */

exports.drawImageCentered = drawImageCentered;
exports.resize = resize;
exports.toDataURLCropped = toDataURLCropped;

Object.defineProperty(exports, '__esModule', { value: true });

})));
