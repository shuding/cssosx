/*
*	Dock.js
*	Author:  github.com/quietshu
*	Email:   ds303077135@gmail.com
*	License: GPL2
*/
;(function() {

    var ICON_NUMBER = 10;
    var ICON_MIN_WIDTH = 64;
    var ICON_MAX_WIDTH = 128;

    var n, w,
        icon = [],
        iconLeft = [],
        newWidth = [],
        newMargin = [],
        container, bg,
        intoInterval, intervalCount,
        movein = 0,
        pause = 0,
        cMargin;

    var expandWidth = ICON_NUMBER * 64 + 230;

    function init() {
        container = document.getElementById("container");
        container.style.marginLeft = "0px";
        var icons = container.childNodes;
        bg = document.getElementById("bg");
        n = 0;
        for (var i = 0; i < icons.length; ++i)
            if (icons[i].tagName == "IMG") {
                iconLeft[n] = icons[i].getBoundingClientRect().left;
                icon[n++] = icons[i];
            }
        container.addEventListener("mousemove", mouseMove, false);
        container.addEventListener("mouseleave", mouseLeave, false);
    }

    function fastCos(x) {
        var x2 = x * x;
        var x4 = x2 * x2;
        var x6 = x4 * x2;
        var x8 = x6 * x2;
        var x10 = x8 * x2;
        return 1 - (1814400 * x2 - 151200 * x4 + 5040 * x6 - 90 * x8 + x10) / 3628800;
    }

    function setSize(index, dist) {
        icon[index].style.width = (Math.abs(dist) > 200 ? 64 : fastCos(dist * .015707963) * 32 + 96) + "px";
    }

    function getSize(dist) {
        return (Math.abs(dist) > 200 ? 64 : fastCos(dist * .015707963) * 32 + 96);
    }

    function iconTrans() {
        if (intervalCount >= 5) {
            movein = 1;
            pause = 0;
            clearInterval(intoInterval);
            return;
        }
        var t = 5 - intervalCount;
        for (var i = 0; i < n; ++i) {
            icon[i].style.width = (newWidth[i] + icon[i].getBoundingClientRect().width * (t - 1)) / t + "px";
        }
        container.style["margin-left"] = (cMargin + parseFloat(container.style["margin-left"]) * (t - 1)) / t + "px";
        ++intervalCount;
    }

    function calcInitSize(x, ani) {
        var tmp, minDis = -1000, leftIndex = -1, rightIndex = -1;
        var pos = -1;
        for (var i = 0; i < n; ++i) {
            tmp = x - iconLeft[i] - 32;
            if (tmp <= 200) {
                if (tmp < -200 && rightIndex == -1) {
                    rightIndex = i;
                } else if (leftIndex == -1) {
                    leftIndex = i;
                }
            }
        }
        if (leftIndex == 0) {
            leftIndex = 0;
            pos = 0;
        }
        if (rightIndex == -1) {
            rightIndex = n;
            pos = 1;
        }

        if (!movein) {
            var cWidth = 0;

            for (var i = 0; i < leftIndex; ++i) {
                newWidth[i] = ICON_MIN_WIDTH;
                cWidth += ICON_MIN_WIDTH;
            }
            for (var i = leftIndex; i < rightIndex; ++i) {
                newWidth[i] = getSize(x - iconLeft[i] - 32);
                cWidth += newWidth[i];
            }
            for (var i = rightIndex; i < n; ++i) {
                newWidth[i] = ICON_MIN_WIDTH;
                cWidth += ICON_MIN_WIDTH;
            }
            cWidth += (n - 1) * 5;

            if (pos == 0) {
                cMargin = expandWidth - cWidth;
            } else if (pos == 1) {
                cMargin = -(expandWidth - cWidth);
            } else {
                cMargin = 0;
            }

            if (!pause) {
                pause = 1;
                intervalCount = 0;
                intoInterval = setInterval(iconTrans, 15);
            }
            return;
        }

        for (var i = 0; i < n; ++i) {
            icon[i].style["margin-left"] = "0";
            icon[i].style.width = "64px";
        }

        for (var i = leftIndex; i < rightIndex; ++i) {
            icon[i].style["margin-left"] = "0";
            setSize(i, x - iconLeft[i] - 32);
        }

        if (pos == 0) {
            container.style["margin-left"] = (expandWidth - container.getBoundingClientRect().width) + "px";
        } else if (pos == 1) {
            container.style["margin-left"] = -(expandWidth - container.getBoundingClientRect().width) + "px";
        } else {
            container.style["margin-left"] = "0px";
            var idle = (expandWidth - container.getBoundingClientRect().width) / (rightIndex - leftIndex) + "px";
            for (var i = leftIndex; i < rightIndex; ++i)
                icon[i].style["margin-left"] = idle;
        }
    }

    function mouseMove(e) {
        var x = e.clientX;
        var bound = container.getBoundingClientRect();
        if (x > bound.right || x < bound.left)
            return;
        calcInitSize(x);
    }

    function mouseLeave(e) {
        for (var i = 0; i < n; ++i)
            icon[i].setAttribute("class", "animate");
        container.setAttribute("class", "animate");
        for (var i = 0; i < n; ++i)
            icon[i].style.width = "64px";
        container.style["margin-left"] = "0px";
        movein = 0;
        setTimeout(function () {
            for (var i = 0; i < n; ++i) {
                icon[i].setAttribute("class", "");
                icon[i].style["margin-left"] = "0px";
            }
            container.setAttribute("class", "");
        }, 80);
    }

    function date_time() {
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'];
        d = date.getDate();
        day = date.getDay();
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        h = date.getHours();
        if (h < 10) {
            h = "0" + h;
        }
        m = date.getMinutes();
        if (m < 10) {
            m = "0" + m;
        }
        s = date.getSeconds();
        if (s < 10) {
            s = "0" + s;
        }
        result = '' + days[day].substr(0, 3) + ' ' + months[month].substr(0, 3) + ' ' + d + '  ' + ' ' + h + ':' + m + ':' + s;
        document.getElementById('system_time').innerHTML = result;
        result = '' + days[day] + ', ' + months[month] + ' ' + d + ', ' + year;
        document.getElementById('system_date_line').innerHTML = result;
    }

    function drag() {
        var toolbar = document.getElementById("toolbar"),
            finder = document.getElementById("finder");
        var active = false,
            stx, sty;

        finder.style.top = (window.innerHeight - 435) * 0.5 + "px";
        finder.style.left = (window.innerWidth - 770) * 0.5 + "px";

        toolbar.onmousedown = function (event) {
            active = true;
            stx = event.pageX - parseFloat(finder.style.left);
            sty = event.pageY - parseFloat(finder.style.top);
        };

        document.onmouseup = function (event) {
            active = false;
        };
        
        document.onmousemove = function (event) {
            console.log(stx);
            if(active) {
                var dx = event.pageX - stx,
                    dy = event.pageY - sty;
                finder.style.left = dx + "px";
                finder.style.top = dy + "px";
            }
        };
    }

    init();
    setInterval(date_time, 1000);
    drag();
})();
