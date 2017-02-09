/* @flow */
'use strict'

import getCanvasRenderingContext2D from './get-2d-context.js'

function createCanvasFromImageData (
  imageData /* : ImageData */
) /* : HTMLCanvasElement */ {
  const canvas = document.createElement('canvas')
  const ctx = getCanvasRenderingContext2D(canvas)

  canvas.width = imageData.width
  canvas.height = imageData.height
  ctx.clearRect(0, 0, imageData.width, imageData.height)
  ctx.putImageData(imageData, 0, 0)

  return canvas
}

export default createCanvasFromImageData
