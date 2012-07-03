(function() {
    var el = document.getElementById('countdown'),
        endDate = new Date('July 27, 2012 17:00:00'),
        curDate,
        diff,
        days,
        hours,
        minutes,
        seconds,
        tmp,
        countdown,
        pad = function(number) { return (number < 10 ? '0' : '') + Math.floor(number) },
        minute = 60 * 1000,
        hour = minute * 60,
        day = hour * 24
    ;(function tick() {
        curDate = new Date()
        diff = new Date(curDate.getTime() - endDate.getTime())
        if (diff > 0) {
            countdown = "It's over!"
        }
        else {
            diff = Math.abs(diff)
            days = diff / day

            tmp = diff % day
            hours = tmp / hour

            tmp = diff % hour
            minutes = tmp / minute

            tmp = diff % minute
            seconds = tmp / 1000

            countdown = pad(days) + ':' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
        }

        if ('textContent' in el) {
            el.textContent = countdown
        }
        else {
            el.innerText = countdown
        }
        setTimeout(tick, 1000)
    }())
}())

