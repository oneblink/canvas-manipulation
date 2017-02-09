/* @flow */
'use strict'

import getCanvasRenderingContext2D from './get-2d-context.js'

function drawImageCentered (
  canvas /* : HTMLCanvasElement */,
  image /* : CanvasImageSource */
) /* : void */ {
  const width = canvas.width
  const height = canvas.height
  const hRatio = width / image.width
  const vRatio = height / image.height
  const ratio = Math.min(hRatio, vRatio, 1)
  const centerShiftX = (width - (image.width * ratio)) / 2
  const centerShiftY = (height - (image.height * ratio)) / 2
  const destWidth = image.width * ratio
  const destHeight = image.height * ratio
  const ctx = getCanvasRenderingContext2D(canvas)
  // ctx.clearRect(0, 0, width, height)
  ctx.clearRect(centerShiftX, centerShiftY, destWidth, destHeight)
  ctx.drawImage(image, centerShiftX, centerShiftY, destWidth, destHeight)
}

export default drawImageCentered
