var width = document.getElementById('width')
var height = document.getElementById('height')
var scaleDown = document.getElementById('scale-down')
var wrapper = document.getElementById('wrapper')
var redButton = wrapper.querySelector('[data-action=draw-red]')
var blueButton = wrapper.querySelector('[data-action=draw-blue]')
var greenButton = wrapper.querySelector('[data-action=draw-green]')
var resizeButton = wrapper.querySelector('[data-action=resize]')
var resetButton = wrapper.querySelector('[data-action=reset]')
var canvas = wrapper.querySelector('canvas')
var ctx = canvas.getContext('2d')

function createCanvasImageSource (colour, width, height) {
  var tempCanvas = document.createElement('canvas')
  tempCanvas.width = width
  tempCanvas.height = height
  var tempCtx = tempCanvas.getContext('2d')
  tempCtx.fillStyle = colour
  tempCtx.fillRect(0, 0, width, height)
  return tempCanvas
}

var redImage = createCanvasImageSource('rgb(255,0,0)', 200, 200)
var blueImage = createCanvasImageSource('rgb(0,0,255)', 150, 150)
var greenImage = createCanvasImageSource('rgb(0,255,0)', 100, 100)

redButton.addEventListener('click', function (event) {
  window.canvasManipulation.drawImageCentered(canvas, redImage)
})

blueButton.addEventListener('click', function (event) {
  window.canvasManipulation.drawImageCentered(canvas, blueImage)
})

greenButton.addEventListener('click', function (event) {
  window.canvasManipulation.drawImageCentered(canvas, greenImage)
})

resizeButton.addEventListener('click', function (event) {
  window.canvasManipulation.resize(canvas, width.value, height.value, scaleDown.checked)
})

resetButton.addEventListener('click', function (event) {
  canvas.width = 300
  canvas.height = 300
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(0, 0, canvas.width, canvas.height)
})
