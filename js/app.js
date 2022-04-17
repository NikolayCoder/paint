const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')

const INITIAL_COLOR = 'black'
const CANVAS_SIZE_HEIGHT = 600
const CANVAS_SIZE_WIDTH = 950

canvas.height = CANVAS_SIZE_HEIGHT
canvas.width = CANVAS_SIZE_WIDTH


ctx.fillStyle = 'white'
ctx.fillRect(0,0,CANVAS_SIZE_WIDTH,CANVAS_SIZE_HEIGHT)

ctx.lineWidth = 2.5
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR

let painting = false
let filling = false

function stopPainting() {
	painting = false
}

function startPainting() {
	painting = true
}

function onMouseMove(event) {
	x = event.offsetX
	y = event.offsetY
	if (!painting) {
		ctx.beginPath()
		ctx.moveTo(x, y)
	} else {
		ctx.lineTo(x, y)
		ctx.stroke()
	}
}

function onMouseDown(event) {
	painting = true
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor
	ctx.strokeStyle = color
	ctx.fillStyle = color
}

function handleRangeChange(event) {
	const rangeValue = event.target.value
	ctx.lineWidth = rangeValue
}

function handleModeClick() {
	if (filling === true){
		filling = false
		mode.innerText = 'Заливка'
	} else {
		filling = true
		mode.innerText = 'Рисование'
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0,0,CANVAS_SIZE_WIDTH,CANVAS_SIZE_HEIGHT)
	}
}

function handleCM(event) {
	event.preventDefault()
}

function handleSaveClick() {
	const image = canvas.toDataURL() // по стандарту стоит 'image/png'
	const link = document.createElement('a')
	link.href = image
	link.download = "PaintJavaScript[Export]" // можно подставлять любое расширение image
	link.click()
	// const image = canvas.toDataURL('image/jpeg') - сохранение в формате jpeg, jpeg(jpg) сохроняется в плохои качестве
}

if (canvas) {
	canvas.addEventListener('mousemove', onMouseMove)
	canvas.addEventListener('mousedown', onMouseDown)
	canvas.addEventListener('mouseup', stopPainting)
	canvas.addEventListener('mouseleave', stopPainting)
	canvas.addEventListener('click', handleCanvasClick)
	canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if (range) {
	range.addEventListener('input', handleRangeChange)
}

if (mode) {
	mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
	saveBtn.addEventListener('click', handleSaveClick)
}