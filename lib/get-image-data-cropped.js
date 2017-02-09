/* @flow */
'use strict'

import getCanvasRenderingContext2D from './get-2d-context.js'

function getImageDataCropped (
  canvas /* : HTMLCanvasElement */
) /* : ImageData | void */ {
  const imgWidth = canvas.width
  const imgHeight = canvas.height
  const ctx = getCanvasRenderingContext2D(canvas)
  const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight)

  const data = imageData.data
  const getAlpha = (x, y) => {
    return data[(((imgWidth * y) + x) * 4) + 3]
  }
  const scanY = (fromTop) => {
    const offset = fromTop ? 1 : -1

    // loop through each row
    for (let y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
      // loop through each column
      for (let x = 0; x < imgWidth; x += 1) {
        if (getAlpha(x, y)) {
          return y
        }
      }
    }
    return null // all image is transparent
  }
  const scanX = function (fromLeft) {
    const offset = fromLeft ? 1 : -1

    // loop through each column
    for (let x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
      // loop through each row
      for (let y = 0; y < imgHeight; y += 1) {
        if (getAlpha(x, y)) {
          return x
        }
      }
    }
    return null // all image is transparent
  }
  const cropTop = scanY(true)
  const cropBottom = scanY(false)
  const cropLeft = scanX(true)
  const cropRight = scanX(false)
  if (cropTop === null ||
      cropBottom === null ||
      cropLeft === null ||
      cropRight === null) {
    return
  }
  // If the image has a 1 pixel width, cropRight and cropLeft would be the same value
  // hence the need to add an extra pixel to the width and height values
  const width = (cropRight - cropLeft) + 1
  const height = (cropBottom - cropTop) + 1
  return ctx.getImageData(cropLeft, cropTop, width, height)
}

export default getImageDataCropped
