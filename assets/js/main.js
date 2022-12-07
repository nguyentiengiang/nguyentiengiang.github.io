;
(function () {

  'use strict';

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };


  var fullHeight = function () {

    var height = $(window).height();
    height = (height < 400) ? (height + 200) : height;
    //if ( !isMobile.any() ) {
    $('.js-fullheight').css('height', height);
    $(window).resize(function (height) {
      $('.js-fullheight').css('height', height);
    });
    //}
  };

  // Parallax
  var parallax = function () {
    $(window).stellar();
  };

  var contentWayPoint = function () {
    var i = 0;
    $('.animate-box').waypoint(function (direction) {

      if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

        i++;

        $(this.element).addClass('item-animate');
        setTimeout(function () {

          $('body .animate-box.item-animate').each(function (k) {
            var el = $(this);
            setTimeout(function () {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn animated-fast');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft animated-fast');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight animated-fast');
              } else {
                el.addClass('fadeInUp animated-fast');
              }

              el.removeClass('item-animate');
            }, k * 100, 'easeInOutExpo');
          });

        }, 50);

      }

    }, {
      offset: '85%'
    });
  };



  var goToTop = function () {

    $('.js-gotop').on('click', function (event) {

      event.preventDefault();

      $('html, body').animate({
        scrollTop: $('html').offset().top
      }, 500, 'easeInOutExpo');

      return false;
    });

    $(window).scroll(function () {

      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $('.js-top').addClass('active');
      } else {
        $('.js-top').removeClass('active');
      }

    });

  };

  var pieChart = function () {
    $('.chart-primary').easyPieChart({
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'butt',
      barColor: '#ff0000',
      trackColor: "#f5f5f5",
      size: 160,
      animate: 1000
    });
    $('.chart-intermediate').easyPieChart({
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'butt',
      barColor: '#00ff00',
      trackColor: "#f5f5f5",
      size: 160,
      animate: 1000
    });
    $('.chart-advance').easyPieChart({
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'butt',
      barColor: '#FF9000',
      trackColor: "#f5f5f5",
      size: 160,
      animate: 1000
    });
    $('.chart-professional').easyPieChart({
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'butt',
      barColor: '#FF9000',
      trackColor: "#f5f5f5",
      size: 160,
      animate: 1000
    });
  };

  var skillsWayPoint = function () {
    if ($('#fh5co-skills').length > 0) {
      $('#fh5co-skills').waypoint(function (direction) {

        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(pieChart, 400);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '90%'
      });
    }

  };


  // Loading page
  var loaderPage = function () {
    $(".fh5co-loader").fadeOut("slow");
  };


  $(function () {
    contentWayPoint();
    goToTop();
    loaderPage();
    fullHeight();
    parallax();
    // pieChart();
    skillsWayPoint();
  });

  // Send contact
  var formContact = $('form#contact-me')
  // console.log(JSON.stringify(formContact))
  $('#contact-me-btn').on('click', function (e) {
    e.preventDefault();
    var reqUrl = "https://script.google.coms/macros/s/AKfycbxNkuCCvqXT0JjG8GpKbtbagTbGcQpc-nt90o1uuAxULdmZOohpBBONeP2v92VbzaXHNg/exec?" + formContact.serialize();
    var reqOptions = {
      mode: 'no-cors',
      redirect: "follow",
      method: "GET",
      // body: formContact.serialize(),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    };

    fetch(reqUrl, reqOptions)
      .then((e) => {
        $("#contact-name").val("");
        $("#contact-email").val("");
        $("#contact-message").val("");
        $("#result-contact").html("I will get back to you as soon as possible !!!");
      })
      .catch((e) => {
        console.log(e);
        if (e) {
          $("#result-contact").html("Error while connect with google app :( <br>Please try later or contact direct me by email");
        }
      })
      .finally(
        setTimeout(function () {
          $("#result-contact").html("");
        }, 5000)
      );
  });

  $('#changeLanguage').on('change', function (e) {
    var lang = $(this).val();
    window.location.replace(window.location.origin + "/" + lang);
  });

}());
