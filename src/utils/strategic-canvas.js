const strategic = {
    rightRectangle: (ctx, e, target, beginAt, loadingCache) => {
        loadingCache()
        ctx.beginPath()
        ctx.moveTo(...beginAt)
        const [x2, y2] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
        const [x3, y3] = [beginAt[0], beginAt[1] + (y2 - beginAt[1]) * 2]
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.closePath()
        ctx.stroke()
    },
    topRectangle: (ctx, e, target, beginAt, loadingCache) => {
        loadingCache()
        ctx.beginPath()
        ctx.moveTo(...beginAt)
        const [x2, y2] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
        const [x3, y3] = [beginAt[0] - x2 + beginAt[0], e.pageY - target.offsetTop + 16]
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.closePath()
        ctx.stroke()
    },
    square: (ctx, e, target, beginAt, loadingCache) => {
        loadingCache()
        ctx.beginPath()
        ctx.moveTo(...beginAt)
        const [x2, y2] = [e.pageX - target.offsetLeft, beginAt[1]]
        const [x3, y3] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
        const [x4, y4] = [beginAt[0], e.pageY - target.offsetTop + 16]
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.lineTo(x4, y4)
        ctx.closePath()
        ctx.stroke()
    },
    round: (ctx, e, target, beginAt, loadingCache) => {
        loadingCache()
        ctx.beginPath();
        const r = (((e.pageY - target.offsetTop + 16 - beginAt[1]) ** 2 + (e.pageX - target.offsetLeft - beginAt[0]) ** 2) ** 0.5) / 2
        ctx.arc((e.pageX - target.offsetLeft + beginAt[0])/2, (e.pageY - target.offsetTop + 16 + beginAt[1])/2 , r,0,360 )
        ctx.closePath()
        ctx.stroke()
    },
    eraser: (ctx, e, target, beginAt) => {
        const [x, y] = [e.pageX - target.offsetLeft - 8, e.pageY - target.offsetTop + 8]
        ctx.clearRect(x, y, 16, 16)
    },
    pencil: (ctx, e, target, beginAt, loadingCache) => {
        loadingCache()
        const [x, y] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop + 16]
        ctx.lineTo(x, y)
        ctx.stroke()
    },
    circle: (ctx, e, target, beginAt) => {

    },
}

function Chooser(type) {
    this.type = type
}

Chooser.prototype.draw = function (ctx, e, target, beginAt, loadingCache) {
    strategic[this.type](ctx, e, target, beginAt, loadingCache)
}

export default Chooser
