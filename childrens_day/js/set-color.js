/*******************
    *@author:jyjin
    *@date:2015.03.24
    *@remark: change color for web element
    *         waiting for optimized code and remove jquery code
    ******************/

(function () {

    Array.prototype.inArray = function (s) {
        var t = 0;
        for (var i = 0; i < this.length; i++) {
            if (a[i].toString() == s) {
                t = i;
                return;
            }
        }
        return t;
    };

    var Color = {

        dict: ['A', 'B', 'C', 'D', 'E', 'F', 10, 11, 12, 13, 14, 15],

        transferChat: function (s) {
            var i;
            for (var n = 0; n < s.length; n++) {
                i = $.inArray(s.charAt(n), Color.dict);
                if (i != -1) {
                    s = s.replace(s.charAt(n), Color.dict[i + 6]);
                }
            }
            return s;
        },

        getColorNumber: function (color, bit) {
            bit = bit || 16;
            color = color.indexOf('#') == -1 ? color.toUpperCase() : color.toUpperCase().substring(1, color.length);
            var reg = /^[0-9A-F]{6}$/
            var a = [],
                n = 0,
                d;
            d = color.length == 3 ? 1 : 2;
            while (n < 3 * d) {
                a[n / d] = color.substring(n, n += d);
            }
            for (var i = 0; i < color.length / d; i++) {
                a[i] = parseInt(Color.transferChat(a[i].charAt(0))) * bit + parseInt(Color.transferChat(a[i].charAt(1) || a[i].charAt(0)));
            }
            return a;
        },

        getColor: function (r, g, b, bit) {
            return '#' + this.getSingleColor(r) + this.getSingleColor(g) + this.getSingleColor(b);
        },

        getSingleColor: function (d, bit) {
            if (d > 255 || d < 0) {
                console.error('Maxsize is 255...');
                return;
            }
            d = d;
            var m, a = [];
            bit = bit || 16;
            while (d != 0) {
                m = d % 16;
                d = Math.floor(d / bit);
                if (m > 9)
                    m = Color.dict[m % 10];
                a.push(m);
            }
            return a.length == 0 ? '00' : a.reverse().join('');
        }
    };

    window.Color = Color;

})(window)

function changeColor(dom, time, callback) {
    time = time || 1;
    var min = 0,
        max = 255;
    var r = 255,
        g = 255,
        b = 255;
    var d = 255,
        f = 0,
        p = 0;

    setInterval(function () {
        f == 0 ? d-- : d++;
        // console.log(dom.style.backgroundColor)
        if (p == 0) {
            if (callback) {
                callback(d, g, b);
            } else {
                dom.style.backgroundColor = Color.getColor(d, g, b);
            }
            if (d == min) {
                p++;
                f = 1;
                // console.log('rrrrrrrrrrr')
            }
            return;
        }
        if (p == 1) {
            if (callback) {
                callback(d, g, b);
            } else {
                dom.style.backgroundColor = Color.getColor(d, g, b);
            }
            if (d == max) {
                p++;
                f = 0;
                // console.log('rrrrrrrrrrr')
            }
            return;
        }
        if (p == 2) {
            if (callback) {
                callback(r, d, b);
            } else {
                dom.style.backgroundColor = Color.getColor(r, d, b);
            }
            if (d == min) {
                p++;
                f = 1;
                // console.log('gggggggggggg')
            }
            return;
        }
        if (p == 3) {
            if (callback) {
                callback(r, d, b);
            } else {
                dom.style.backgroundColor = Color.getColor(r, d, b);
            }
            if (d == max) {
                p++;
                f = 0;
                // console.log('gggggggggggg')
            }
            return;
        }
        if (p == 4) {
            if (callback) {
                callback(r, g, d);
            } else {
                dom.style.backgroundColor = Color.getColor(r, g, d);
            }
            if (d == min) {
                p++;
                f = 1;
                // console.log('bbbbbbbbbbb')
            }
            return;
        }
        if (p == 5) {
            if (callback) {
                callback(r, g, d);
            } else {
                dom.style.backgroundColor = Color.getColor(r, g, d);
            }
            if (d == max) {
                p = 0;
                f = 0;
                // console.log('bbbbbbbbbbb')
            }
            return;
        }
    }, time);
}

function changePosition() {
    var h1 = document.getElementById('h1');
    var f = 0,
        t = 0,
        p = 0;
    setInterval(function () {
        f == 0 ? t++ : t--;
        if (p == 0) {
            h1.style.left = t + 'px';
            if (t == parseInt(window.screen.width) - $('#h1').width() && f == 0) {
                p++;
                f = 1;
            }
            return;
        }
        if (p == 1) {
            h1.style.top = t + 'px';
            if (t == 0 && f == 1) {
                p--;
                f = 0;
            }
            return;
        }
    }, 1)
}

// $(function() {
// 	// changeColor(document.body);
// 	changeColor(document.getElementById('h1'), 1, function(r, g, b) {
// 		document.getElementById('h1').style.backgroundColor = Color.getColor(r, g, b);
// 	});
// });