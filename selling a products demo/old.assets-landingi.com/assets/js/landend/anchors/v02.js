(function ($) {
    'use strict';

    function countOffset(trigger) {
        var hrefObj = $($(trigger).attr('href'));
        var scrollVal = hrefObj.offset().top;

        scrollVal -= calculateOverFixedSections();

        return scrollVal;
    }

    function calculateOverFixedSections() {
        var allSections = $('.widget-section');
        var calculatedReturn = 0;

        allSections.each(function (key, value) {
            var jQItem = $(value);

            if ('undefined' !== typeof jQItem.offset()) {
                var bottomYCheck = jQItem.offset().top + jQItem.outerHeight(true) === window.innerHeight;

                if ('fixed' === jQItem.css('position') && !bottomYCheck) {
                    calculatedReturn = jQItem.outerHeight();
                }
            }
        });

        return calculatedReturn;
    }

    function anchorsWatcher($, delay) {
        if (undefined === delay) {
            delay = 1000;
        }

        $('[subtype="anchor"]').on('click', function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: countOffset(this)
            }, delay);
        });
    }

    anchorsWatcher($, window.anchorScrollSpeed);
})(jQuery);
