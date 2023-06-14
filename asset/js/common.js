$(".mobile_nav").click(function () {

    var mm = $(".mobile_menu"),
        mn = $(".mobile_nav"),
        a = "active";

    if (mm.hasClass(a) && mn.hasClass(a)) {
        mm.removeClass(a).fadeOut(200);
        mn.removeClass(a);
        $('.mobile_menu li').each(function () {
            $(this).removeClass('slide');
        });
    } else {
        mm.addClass(a).fadeIn(200);
        mn.addClass(a);
        $('.mobile_menu li').each(function (i) {
            var t = $(this);
            setTimeout(function () { t.addClass('slide'); }, (i + 1) * 100);
        });
    }

});

/* function for sliding cards*/
function sideScrollCards(elementWrapper, cardCalss, direction, increment, animationFunction) {
    increment = increment || 1;
    var slideIndex = elementWrapper + 'Index';
    window[slideIndex] = (typeof window[slideIndex] != 'undefined') ? window[slideIndex] : 0;
    var cardCalssList = document.getElementsByClassName(cardCalss);
    var firstCard = cardCalssList[0];
    var wrapperDiv = document.getElementById(elementWrapper);
    wrapperDiv.style.transition = 'transform 0.6s ease';
    var cardNos = cardCalssList.length;
    var cardWidth = firstCard.offsetWidth;
    var distanceToTransalte = 0;
    var wrapperWidth = wrapperDiv.offsetWidth;
    var cardStyle = firstCard.currentStyle || window.getComputedStyle(firstCard);
    var wrapperStyle = wrapperDiv.currentStyle || window.getComputedStyle(wrapperDiv);
    var cardOuterWidth = cardWidth + parseFloat(cardStyle.marginRight) + parseFloat(cardStyle.marginLeft);
    var wrapperInnerWidth = wrapperWidth - (parseFloat(wrapperStyle.paddingRight) + parseFloat(wrapperStyle.paddingLeft));
    var totalWidthOfCards = cardOuterWidth * cardNos;
    if (direction === 'prev') {
        window[slideIndex] = (window[slideIndex] > 0) ? window[slideIndex] - increment : 0;
    } else if (direction === 'next') {
        window[slideIndex] = (window[slideIndex] <= cardNos) ? window[slideIndex] + increment : 0;
    }
    console.log('fnindex : ' + window[slideIndex]);
    //window[slideIndex] = (window[slideIndex] > (cardNos - 1)) ? 0 : window[slideIndex];
    distanceToTransalte = window[slideIndex] * cardOuterWidth;
    if (distanceToTransalte > ((totalWidthOfCards - wrapperInnerWidth) + (cardOuterWidth * increment))) {
        window[slideIndex] = 0;
        distanceToTransalte = 0;
    } else if (distanceToTransalte > (totalWidthOfCards - wrapperInnerWidth)) {
        distanceToTransalte = totalWidthOfCards - wrapperInnerWidth;
        window[slideIndex] = cardNos;
    }
    distanceToTransalte = (distanceToTransalte === 0) ? 0 : '-' + distanceToTransalte;
    wrapperDiv.style.transform = 'translateX(' + distanceToTransalte + 'px)';
    if (animationFunction) {
        animationFunction();
    }
}
