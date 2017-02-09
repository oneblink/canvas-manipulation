/* @flow */
'use strict'

describe('canvasManipulation', function () {
  describe('resize()', function () {
    var canvas

    beforeEach(function () {
      canvas = document.createElement('canvas')
      canvas.width = 600
      canvas.height = 300
    })

    it('should resize canvas', function () {
      var contentPreserved = window.canvasManipulation.resize(canvas, 200, 50, true)
      expect(canvas.width).toBe(200)
      expect(canvas.height).toBe(50)
      expect(contentPreserved).toBe(true)
    })
  })
})
