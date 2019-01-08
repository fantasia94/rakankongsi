(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _counter = require('./landend/counter');

var Counter = _interopRequireWildcard(_counter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

$(function () {
    $(document).find('.widget-counter').each(function () {
        Counter.initializeCounter($(this));
    });
});

},{"./landend/counter":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var initializeCounter = function initializeCounter($counter) {
    var timer,
        repeat = $counter.attr('data-repeat'),
        version = $counter.attr('data-version'),
        date = $counter.attr('data-date'),
        uid = $counter.attr('id'),
        end;

    if (repeat !== '-1') {
        end = new Date(date);
    } else {
        var cArray = document.cookie ? document.cookie.split(';') : [],
            Cookies = {};

        for (var c in cArray) {
            if (cArray.hasOwnProperty(c) && typeof c === 'string') {
                var temp = cArray[c].split('=');

                Cookies[temp[0].replace(/\s/g, '')] = temp[1];
            }
        }

        if (Cookies['count-' + uid]) {
            end = new Date(Cookies['count-' + uid]);
        } else {
            end = new Date();

            var exp = new Date();
            exp.setMonth(exp.getMonth() + 1);

            document.cookie = 'count-' + uid + '=' + end + ';expires=' + new Date(exp) + ';path=' + window.location.pathname;
        }

        end.setMinutes(end.getMinutes() + parseInt(date, 10));
    }

    if (!version) {
        end.setTime(end.getTime() + end.getTimezoneOffset() * 60 * 1000);
    }

    function showRemaining() {
        var now = new Date(),
            distance = end - now,
            days,
            hours,
            minutes,
            seconds,
            _second = 1000,
            _minute = _second * 60,
            _hour = _minute * 60,
            _day = _hour * 24;

        if (distance < 0) {
            if (!version || parseInt(version, 10) < 2 || !repeat || repeat <= 0) {
                clearInterval(timer);
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                while (distance < 0) {
                    end.setDate(end.getDate() + parseInt(repeat, 10));
                    distance = end - now;
                }
            }
        }

        if (distance >= 0) {
            days = Math.floor(distance / _day);
            hours = Math.floor(distance % _day / _hour);
            minutes = Math.floor(distance % _hour / _minute);
            seconds = Math.floor(distance % _minute / _second);
        }

        $counter.find('.widget-text[data-format]').each(function () {
            var $el = $(this),
                output = $(this).attr('data-format');

            output = output.replace('%dddd', ('000' + days).slice(-4));
            output = output.replace('%ddd', ('00' + days).slice(-3));
            output = output.replace('%dd', ('0' + days).slice(-2));
            output = output.replace('%d', days);
            output = output.replace('%hh', ('0' + hours).slice(-2));
            output = output.replace('%mm', ('0' + minutes).slice(-2));
            output = output.replace('%ss', ('0' + seconds).slice(-2));
            output = output.replace('%h', hours);
            output = output.replace('%m', minutes);
            output = output.replace('%s', seconds);

            $el.text(output);
        });

        if ($counter.find('.widget-text').length === 0) {
            var format = $counter.attr('data-format');

            format = format.replace('%dddd', ('000' + days).slice(-4));
            format = format.replace('%ddd', ('00' + days).slice(-3));
            format = format.replace('%dd', ('0' + days).slice(-2));
            format = format.replace('%d', days);
            format = format.replace('%hh', ('0' + hours).slice(-2));
            format = format.replace('%mm', ('0' + minutes).slice(-2));
            format = format.replace('%ss', ('0' + seconds).slice(-2));
            format = format.replace('%h', hours);
            format = format.replace('%m', minutes);
            format = format.replace('%s', seconds);

            $counter.text(format);
        }
    }

    timer = setInterval(showRemaining, 1000);
};

exports.initializeCounter = initializeCounter;

},{}]},{},[1]);
