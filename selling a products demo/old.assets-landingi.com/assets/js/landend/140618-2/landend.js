/*! http://mths.be/placeholder v2.0.7 by @mathias */
(function(e,t,n){function l(e){var t={};var r=/^jQuery\d+$/;n.each(e.attributes,function(e,n){if(n.specified&&!r.test(n.name)){t[n.name]=n.value}});return t}function c(e,t){var r=this;var i=n(r);if(r.value==i.attr("placeholder")&&i.hasClass("placeholder")){if(i.data("placeholder-password")){i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id"));if(e===true){return i[0].value=t}i.focus()}else{r.value="";i.removeClass("placeholder");r==p()&&r.select()}}}function h(){var e;var t=this;var r=n(t);var i=this.id;if(t.value==""){if(t.type=="password"){if(!r.data("placeholder-textinput")){try{e=r.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":r,"placeholder-id":i}).bind("focus.placeholder",c);r.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}r=r.removeAttr("id").hide().prev().attr("id",i).show()}r.addClass("placeholder");r[0].value=r.attr("placeholder")}else{r.removeClass("placeholder")}}function p(){try{return t.activeElement}catch(e){}}var r="placeholder"in t.createElement("input");var i="placeholder"in t.createElement("textarea");var s=n.fn;var o=n.valHooks;var u=n.propHooks;var a;var f;if(r&&i){f=s.placeholder=function(){return this};f.input=f.textarea=true}else{f=s.placeholder=function(){var e=this;e.filter((r?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":c,"blur.placeholder":h}).data("placeholder-enabled",true).trigger("blur.placeholder");return e};f.input=r;f.textarea=i;a={get:function(e){var t=n(e);var r=t.data("placeholder-password");if(r){return r[0].value}return t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,t){var r=n(e);var i=r.data("placeholder-password");if(i){return i[0].value=t}if(!r.data("placeholder-enabled")){return e.value=t}if(t==""){e.value=t;if(e!=p()){h.call(e)}}else if(r.hasClass("placeholder")){c.call(e,true,t)||(e.value=t)}else{e.value=t}return r}};if(!r){o.input=a;u.value=a}if(!i){o.textarea=a;u.value=a}n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(c);setTimeout(function(){e.each(h)},10)})});n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})})}})(this,document,jQuery);
$(function() {$("input, textarea").placeholder();});

/* Array.contains as facade for checking if element exists in array */
if (!Array.prototype.contains) {
    Array.prototype.contains = function(element) { var i = this.length; while (i--) { if (this.hasOwnProperty(i) && this[i] == element) { return true; } } return false; };
}

function addParamsToUrl(url, params) {
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            url += (url.split('?')[1] ? '&':'?') + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }
    }

    return url;
}
/* get url params */
function getUrlVars() { var vars = {}; var href = document.URL ? document.URL : window.location.href; href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; }); return vars; }

$(function () {
    var supported = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content'];
    var params = getUrlVars();
    var utms = {};

    $.each(params, function(key, value){
        if (supported.contains(key)) {
            utms[key] = value;
        }
    });

    $('form').each(function() {
        $(this).prop('action', function (i, val) {
            return addParamsToUrl(val, utms);
        });
    });
});

jQuery.fn.preventDoubleSubmission = function () {
    $(this).on('submit.prevent', function (e) {
        var $form = $(this);

        if ($form.data('submitted') === true) {
            e.preventDefault();
            e.stopImmediatePropagation();
        } else {
            $form.data('submitted', true);
        }
    });

    return this;
};

var validateCallbacks = [];

function registerValidateCallback(callback) {
    validateCallbacks.push(callback);
}

(function () {
    'use strict';

    $('[subtype="popup"]').on('click', function (e) {
        e.preventDefault();

        var $popup = $($(this).attr('href'));

        $popup.show(300, addTranslate.bind(null, $popup));

        if (typeof youtubeVideos !== 'undefined') {
            youtubeVideos.forEach(function (video) {

                if (video.autoplay === 1 && $('#' + video.hash).closest('.landingi-popup').length !== 0) {
                    youtubePlayers[video.hash].playVideo();
                }
            });
        }
    });

    $('.landingi-popup-body').on('click', '*', function (e) {
        e.stopPropagation();
    });

    $('.landingi-popup').on('click', function () {
        closePopup($(this));
    });

    $('.widget-popupcloser').on('click', function () {
        closePopup($(this).parents('.landingi-popup').first());
    });

    $(document).on('keydown', function (e) {
        if (escapePressed(e)) {
            $('.landingi-popup').each(function (i, popup) {
                var $popup = $(popup);

                removeTranslate($popup);
                $popup.hide(300);
            });
        }
    });

    function escapePressed(e) {
        return e.key === 'Escape' || e.keyCode === 27 || e.which === 27;
    }

    function addTranslate($popup) {
        $popup.css('transform', 'translate3d(0,0,0)');
    }

    function removeTranslate($popup) {
        $popup.css('transform', '');
    }

    function closePopup($popup)
    {
        removeTranslate($popup);
        $popup.hide(300);

        if (typeof youtubeVideos !== 'undefined') {
            youtubeVideos.forEach(function (video) {

                if ($('#' + video.hash).closest('.landingi-popup').length !== 0) {
                    youtubePlayers[video.hash].pauseVideo();
                }
            });
        }
    }

    $('form').preventDoubleSubmission();

    $('form.widget-form').on('submit.validate', validate);

    function validate(e) {
        e.preventDefault();

        var $body = $('body');
        var $form = $(this);
        var $button = $form.find('.widget-input-button');
        var $overlay = $button.find('.widget-overlay');
        var popup = $form.parents('.landingi-popup').first();
        var tooltips = $('.form-error-tooltip');
        var extras = { '_landing-hash': $form.attr('data-hash') };

        if (popup.length) {
            extras['_popup'] = popup.attr('id').replace('#', '');
        }

        $overlay.css('color', $button.css('color'));
        $overlay.append('<i class="fa fa-spinner fa-spin"></i>');
        $button.css('color', 'transparent');

        $form.ajaxSubmit({
            url: 'https://api.landingi.com/validate',
            data: extras,
            method: 'POST',
            processData: false,
            contentType: false,
            error: function (xhr, status, err) {
                $form.data('submitted', false);
                tooltips.remove();
                $button.css('color', '');
                $overlay.empty();

                if (xhr.status === 400) {
                    var data = JSON.parse(xhr.responseText);
                    var html = data.html;

                    validateCallbacks.forEach(function (callback) {
                        var callback_html = callback(html);

                        if (callback_html) {
                            html = callback_html;
                        }
                    });

                    $body.append(html);
                    window.positionValidationTooltips();
                    window.scrollToFirstTooltip();
                } else {
                    alert(err);
                }
            },
            success: function () {
                if (window.submitGAformTracking) {
                    window.submitGAformTracking();
                    setTimeout(function() {
                        $form.data('submitted', false);
                        $form.off('.validate');
                        $form.submit();
                    }, 300);
                } else {
                    $form.data('submitted', false);
                    $form.off('.validate');
                    $form.submit();
                }
            }
        });
    }
})();

(function(factory){var registeredInModuleLoader=!1;if(typeof define==='function'&&define.amd){define(factory);registeredInModuleLoader=!0}
if(typeof exports==='object'){module.exports=factory();registeredInModuleLoader=!0}
if(!registeredInModuleLoader){var OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=OldCookies;return api}}}(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key]}}
return result}
function init(converter){function api(key,value,attributes){var result;if(typeof document==='undefined'){return}
if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires}
try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result}}catch(e){}
if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent)}else{value=converter.write(value,key)}
key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);return(document.cookie=[key,'=',value,attributes.expires?'; expires='+attributes.expires.toUTCString():'',attributes.path?'; path='+attributes.path:'',attributes.domain?'; domain='+attributes.domain:'',attributes.secure?'; secure':''].join(''))}
if(!key){result={}}
var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1)}
try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie)}catch(e){}}
if(key===name){result=cookie;break}
if(!key){result[name]=cookie}}catch(e){}}
return result}
api.set=api;api.get=function(key){return api.call(api,key)};api.getJSON=function(){return api.apply({json:!0},[].slice.call(arguments))};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}))};api.withConverter=init;return api}
return init(function(){})}))
