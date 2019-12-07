var Random = function (n, m) {
    var dis = m - n
    var num = Math.random() * dis + n;
    num = parseInt(num, 10);
    return num
}

var isPc = function () {
    return navigator.platform.indexOf('Win32') != -1
}()

var fullScreen = function () {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
        el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE,这里其实就是模拟了按下键盘的F11,使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
    document.getElementsByClassName('btn')[0].remove()
}




// init svg
var svg = function () {
    var svg = d3.select("body").append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('class', 'svg')
    svg.style('background', 'black')
    // changeColor(svg, 1, function (r, g, b) {
    //     svg.style('background', Color.getColor(r, g, b))
    // });

    return svg
}()

var index = 0;
// tap event
var fnTextPopup = function (arr, options) {
    if (!arr || !arr.length) {
        return;
    }

    var handlder = function (event) {
        var x = event.pageX, y = event.pageY;
        var eleText = document.createElement('span');
        eleText.className = 'text-popup';
        eleText.style.color = "hsl(" + Math.random() * 360 + ",100%,50%)" //Color.getColor(r, g, b);
        this.appendChild(eleText);
        if (arr[index]) {
            eleText.innerHTML = arr[index];
        } else {
            index = 0;
            eleText.innerHTML = arr[0];
        }

        eleText.addEventListener('animationend', function () {
            eleText.parentNode.removeChild(eleText);
        });
        eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
        eleText.style.top = (y - eleText.clientHeight) + 'px';
        // index递增
        index++;
    }

    var calcuScore = function () {
        for (var i = 0; i < config.score.length; i++) {
            let item = config.score[i]
            if (typeof item.max != 'string') {
                if (index < item.max) {
                    let age = Random(item.age.start, item.age.end)
                    let msg = item.sologan
                    if ((typeof item.sologan).toLowerCase() == 'object') {
                        var s = new Date().getSeconds()
                        msg = item.sologan[s % 2]
                    }

                    let tab = config.tips[index]
                    let result = []
                    result.push('【', tab, '】', age, '岁!', msg)
                    showResult(result.join(''))
                    return;
                }
            } else {
                let age = Random(item.age.start, item.age.end)
                let msg = item.sologan
                if ((typeof item.sologan).toLowerCase() == 'object') {
                    var s = new Date().getSeconds()
                    msg = item.sologan[s % 2]
                }

                let tab = config.tips[index]
                let result = []
                result.push('【大神】', age, '岁!', msg)
                showResult(result.join(''))
                return;
            }

        }
    }

    var showResult = function (msg) {
        var si = setInterval(function () {
            var x = Random(10, 200)
            var y = Random(10, 512)
            let _x = x
            var text = svg
                .append("text")
                .text(msg)
                .attr("x", x)
                .attr("y", y)
                .attr("font-family", 'Verdana')
                .attr("font-size", 20)
                .attr('stroke', '#0cbfce')
                .attr('stroke-opacity', '0.5')
            setInterval(function () {
                x--
                if (x < -200) {
                    x = 500
                }
                text.attr('x', x)
            }, 1)
        }, 100)

        setTimeout(function () {
            clearInterval(si)
        }, 100 * config.textCounts)
    }

    document.documentElement.addEventListener(isPc ? 'click' : 'touchstart', handlder);

    // interval sec later end game
    var t = setTimeout(function () {
        document.documentElement.removeEventListener('click', handlder)
        document.documentElement.removeEventListener('touchstart', handlder)
        calcuScore()
    }, 1000 * config.gameTime)
};

// show text message
var intro = function (msg, f) {
    svg.selectAll('text').remove()
    var text = svg
        .append("text")
        .text(msg)
        .attr("x", f ? 90 : 30)
        .attr("y", 300)
        .attr("font-family", 'Verdana')
        .attr("font-size", f ? 200 : 20)
        .attr('stroke', '#0cbfce')
        .attr('stroke-opacity', '0.5')
}

// step1 
var step = 0;

var introStep = function (e) {
    if ($(e.currentTarget).hasClass('.btn')) {
        console.log('>> full screen')
        return
    }
    var introText = config.introText
    var tips = config.tips
    intro(introText[step])
    step++

    if (step == introText.length) {
        document.documentElement.removeEventListener(isPc ? 'click' : 'touchstart', introStep);
        intro('')
        var time = config.gameTime
        var t1 = setInterval(function () {
            if (time == 0) {
                intro('')
                clearInterval(t1)
                return
            }
            intro(time, true)
            time--
        }, 1000)
        fnTextPopup(tips);
    }
}


$(function () {
    main()
})

var main = function () {
    document.getElementsByClassName('btn')[0].addEventListener(isPc ? 'click' : 'touchstart', fullScreen)
    document.documentElement.addEventListener(isPc ? 'click' : 'touchstart', introStep);
    intro(config.welcome)
}