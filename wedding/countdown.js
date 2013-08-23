(function() {
    var el = document.getElementById('countdown'),
        endDate = new Date('August 24, 2013 15:45:00'),
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
            hours = diff / hour

            tmp = diff % hour
            minutes = tmp / minute

            tmp = diff % minute
            seconds = tmp / 1000

            countdown = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
        }

        el.textContent = countdown;

        setTimeout(tick, 1000)
    }())
}())

