var pdfjsLib = window['pdfjs-dist/build/pdf']
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/build/pdf.worker.js'

window.onload = function() {
    var c = document.getElementById('canvas')
    var ctx = c.getContext('2d')
    ctx.canvas.width  = window.innerWidth
    ctx.canvas.height = window.innerHeight
    var topCanvas = document.createElement('canvas')
    topCanvas.setAttribute('id', 'topCanvas')
    var ctx1 = topCanvas.getContext('2d')
    async function renderpdf() {
        var loadingTask = await pdfjsLib.getDocument('/images/sample.pdf')
        loadingTask.promise.then(doc => {
        doc.getPage(1).then(page => {
            var viewport = page.getViewport({ scale: canvas.height / page.getViewport({ scale: 1 }).height });
            ctx.canvas.width = viewport.width
            ctx.canvas.height = viewport.height
            page.render({
                canvasContext: ctx,
                viewport: viewport,
            })
            ctx1.canvas.width = ctx.canvas.width
            ctx1.canvas.height = ctx.canvas.height
            canvas.parentNode.insertBefore(topCanvas, canvas)
        })
    })
}
renderpdf()


    var canvasx = $(topCanvas).offset().left
    var canvasy = $(topCanvas).offset().top
    var last_mousex = last_mousey = 0;
    var mousex = mousey = 0
    var mousedown = false

    $(topCanvas).on('mousedown', function(e) {
        last_mousex = parseInt(e.clientX-canvasx)
        last_mousey = parseInt(e.clientY-canvasy)
        mousedown = true
    })

    $(topCanvas).on('mouseup', function(e) {
        mousedown = false
        var width = mousex-last_mousex
        var height = mousey-last_mousey
        ctx.beginPath()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
        ctx.strokeRect(last_mousex - 7,last_mousey - 7,width,height)
        ctx1.clearRect(0,0,topCanvas.width,topCanvas.height)
    })

    $(topCanvas).on('mousemove', function(e) {
        mousex = parseInt(e.clientX-canvasx)
        mousey = parseInt(e.clientY-canvasy)
        if(mousedown) {
            ctx1.clearRect(0,0,topCanvas.width,topCanvas.height)
            ctx1.beginPath()
            var width = mousex-last_mousex
            var height = mousey-last_mousey
            ctx1.strokeStyle = 'red'
            ctx1.lineWidth = 3
            ctx1.strokeRect(last_mousex,last_mousey,width,height)
        }
})
}

