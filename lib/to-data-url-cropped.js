/* @flow */
'use strict'

import createCanvasFromImageData from './create-from-image-data.js'
import getImageDataCropped from './get-image-data-cropped.js'

function toDataURLCropped (
  canvas /* : HTMLCanvasElement */,
  type /* : string | void */,
  encoderOptions /* : number | void */
) /* : string | void */ {
  const imageData = getImageDataCropped(canvas)
  if (!imageData) {
    return
  }
  const croppedCanvas = createCanvasFromImageData(imageData)
  return croppedCanvas.toDataURL(type, encoderOptions)
}

export default toDataURLCropped
