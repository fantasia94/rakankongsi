(function ($) {
    $(document).ready(function () {
        var $input = $('#' + $('.form-error-tooltip').attr('data-uid'));
        var popup = $input.parents('.landingi-popup').first();

        if (popup.length) {
            popup.show();
        }

        position();

        if (!popup.length) {
            scrollToForm();
        }
    });

    $(window).resize(position);
    $(window).scroll(position);
    $('.landingi-popup-body').scroll(position);

    $('body').on('click', '.form-error-tooltip', function() {
        $(this).hide(300);
    });

    $('.widget-popupcloser, .landingi-popup-body').on('click', function () {
        $('.form-error-tooltip').hide(300);
    });

    window.positionValidationTooltips = position;
    window.scrollToFirstTooltip = scroll;

    function scroll () {
        var id = $('.form-error-tooltip').first().attr('data-uid');
        var $container = $('[id="' + id + '"]:visible').parents('.widget-container').first();

        if ($container.length === 0) {
            $container = $('#' + id);
        }

        var firstSection = $('.widget-section').first();
        var offset = $container.offset().top;

        if (firstSection.css('position') === 'fixed') {
            offset -= firstSection.outerHeight();
        }

        $('html, body').animate({scrollTop: offset}, 500);
    }

    function position () {
        var windowWidth = window.innerWidth;

        $('.form-error-tooltip').each(function () {
            var tooltip = $(this);
            var uid = tooltip.attr('data-uid');
            var input = $('[id="' + uid + '"]:visible');
            var inputType = input.hasClass('widget-textarea') ? 'textarea' :
                (input.hasClass('widget-input-select') ? 'select' : input.attr('type'));
            var container = input.parents('.widget-container').first();
            var form = container.parents('.widget-form').first();
            var formType = form ? (form.attr('data-orientation') || 'vertical') : 'vertical';
            var element = container.length ? container : input;

            if (!element.length) {
                return;
            }

            var elemPos = element.offset();
            var inputPos = input.offset();
            var label = form.find('.widget-regular-label');
            var labelDisplay = label.length ? label.css('display') : 'none';
            var popup = input.parents('.landingi-popup').first();
            var margin = 0;

            if (element.hasClass('widget-container')) {
                margin = parseInt(element.css('padding-bottom'), 10);
            }

            tooltip.removeClass('left right under under-right');
            tooltip.attr('style', '');

            if (popup.length) {
                if (popup.is(':visible')) {
                    var zIndex = popup.css('z-index');

                    tooltip.css('display', 'inline-block');
                    tooltip.css('z-index', zIndex);
                }
            } else {
                tooltip.css('display', 'inline-block');
            }

            if (formType === 'vertical' && elemPos.left > 330 && labelDisplay !== 'inline-block') {
                // Set tooltips left if there's enough space and form labels are above the inputs
                tooltip.addClass('left');

                tooltip.css({
                    top: inputPos.top + (input.outerHeight() / 2),
                    left: elemPos.left - tooltip.outerWidth() - 5,
                    transform: 'translateY(-50%)'
                });
            } else if ((formType === 'vertical') && (windowWidth - (elemPos.left + element.outerWidth()) > 330)) {
                // Set tooltips right if there's enough space
                tooltip.addClass('right');

                tooltip.css({
                    top: inputPos.top + (input.outerHeight() / 2),
                    left: elemPos.left + element.outerWidth() + 5,
                    transform: 'translateY(-50%)'
                });
            } else if (formType === 'horizontal' && inputType === 'checkbox') {
                // Set tooltips right for checkboxes in horizontal forms
                tooltip.addClass('under-right');

                tooltip.css({
                    top: inputPos.top + input.outerHeight() + 2,
                    left: inputPos.left - 5
                });
            } else {
                var top = elemPos.top + element.outerHeight() - margin;
                var left = inputPos.left + 19;

                if (['checkbox', 'radio'].indexOf(inputType) >= 0) {
                    if (inputType === 'checkbox') {
                        top = inputPos.top + input.outerHeight() + 2;
                        left = inputPos.left - 4;
                    }

                    top += 2;
                }

                // Set tooltips bottom in all other cases
                tooltip.addClass('under-right');

                tooltip.css({
                    top: top,
                    left: left
                });
            }
        });
    }

    function scrollToForm() {
        var id = $('.form-error-tooltip').first().attr('data-uid');

        if (id) {
            var $container = $('[id="' + id + '"]:visible').parents('.widget-container').first();
            var firstSection = $('.widget-section').first();
            var offset = $container.offset().top;

            if (firstSection.css('position') === 'fixed') {
                offset -= firstSection.outerHeight();
            }

            $('html, body').animate({scrollTop: offset}, 500);
        }
    }
})(jQuery);
