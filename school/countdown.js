(function() {
    var el = document.getElementById('countdown'),
        endDate = new Date('March 30, 2012 17:10:00'),
        curDate,
        diff,
        days,
        hours,
        minutes,
        seconds,
        tmp,
        countdown,
        pad = function(number) { return (number < 10 ? '0' : '') + number }
    ;(function() {
        curDate = new Date()
        diff = new Date(curDate.getTime() - endDate.getTime())
        days = Math.abs(diff / (24 * 60 * 60 * 1000))
        tmp = diff % (24 * 60 * 60 * 1000)
        hours = Math.abs(tmp / (60 * 60 * 1000))
        tmp = tmp % (60 * 60 * 1000)
        minutes = Math.abs(tmp / (60 * 1000))
        tmp = tmp % (60 * 1000)
        seconds = Math.abs(tmp / 1000)
        countdown = pad(parseInt(days, 10)) + ':' + pad(parseInt(hours, 10)) + ':' + pad(parseInt(minutes, 10)) + ':' + pad(parseInt(seconds, 10))
        if ('textContent' in el) el.textContent = countdown
        else el.innerText = countdown
        setTimeout(arguments.callee, 1000)
    }())
}())

