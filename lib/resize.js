/* @flow */
'use strict'

import createCanvasFromImageData from './create-from-image-data.js'
import drawImageCentered from './draw-image-centered.js'
import getCanvasRenderingContext2D from './get-2d-context.js'
import getImageDataCropped from './get-image-data-cropped.js'

function resize (
  canvas /* : HTMLCanvasElement */,
  width  /* : number */,
  height /* : number */,
  scaleDown  /* : boolean */
) /* : boolean */ {
  // Dont do anything if width and height have not changed
  if (canvas.width === width && canvas.height === height) {
    return false
  }

  // Get the cropped image inside the canvas so that we can check if we need
  // to resize the image before we resize the canvas
  const croppedImageData = getImageDataCropped(canvas)

  // If image is completly transparent, just resize.
  if (!croppedImageData) {
    canvas.width = width
    canvas.height = height
    return true
  }

  // If the cropped image will fit inside the new canvas size,
  // we can just center it inside the new canvas
  if (width >= croppedImageData.width && height >= croppedImageData.height) {
    const centerShiftX = (width - croppedImageData.width) / 2
    const centerShiftY = (height - croppedImageData.height) / 2
    const ctx = getCanvasRenderingContext2D(canvas)
    canvas.width = width
    canvas.height = height
    ctx.putImageData(
      croppedImageData,
      centerShiftX,
      centerShiftY,
      0,
      0,
      croppedImageData.width,
      croppedImageData.height,
    )
    return true
  }

  // If the cropped image will not fit inside the new canvas size
  // we can either scale the image down to fit or just clear the canvas
  if (!scaleDown) {
    canvas.width = width
    canvas.height = height
    return false
  }

  const croppedCanvas = createCanvasFromImageData(croppedImageData)
  canvas.width = width
  canvas.height = height
  drawImageCentered(canvas, croppedCanvas)
  return true
}

export default resize
