/* @flow */
'use strict'

function getCanvasRenderingContext2D (
  canvas /* : HTMLCanvasElement */
) /* : CanvasRenderingContext2D */ {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new TypeError('CanvasRenderingContext2D could not be created from <canvas> element')
  }
  return ctx
}

export default getCanvasRenderingContext2D
