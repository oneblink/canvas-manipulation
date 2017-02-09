/* @flow */
'use strict'

describe('canvasManipulation', function () {
  describe('toDataURlCropped()', function () {
    var canvas
    var ctx

    beforeEach(function () {
      canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 300
      ctx = canvas.getContext('2d')
    })

    it('should return undefined if canvas is empty', function () {
      var dataURLCropped = window.canvasManipulation.toDataURLCropped(canvas)
      expect(dataURLCropped).toBeUndefined()
    })

    it('should be different to canvas.toDataUrl()', function () {
      if (ctx) {
        ctx.fillStyle = 'rgb(255,0,0)'
        ctx.fillRect(0, 0, 100, 100)
      }

      var dataURLCropped = window.canvasManipulation.toDataURLCropped(canvas)
      var dataURL = canvas.toDataURL()
      expect(dataURLCropped).not.toBe(dataURL)
    })
  })
})
