$(function() {
    $('a[href*="#"]').click(function() {
        $(document).off("scroll");
        $('a[href*="#"]').parent().removeClass("active");
  
        var target = $(this.hash);
        target = target.length ? target : $('header');
        if (target.length) {
          $(this).parent().addClass("active");
  
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            $(document).on("scroll", onScroll);
          });
          return false;
        }
    });
  });
  
  
  $(document).on("scroll", onScroll);
  
  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.navbar .navbar-list li a').each(function () {
          var currLink = $(this);
          var path = currLink.attr("href");
          var refElement;
  
          if (path == '#') {
            refElement = $('header');
          } else if (path[0] == '#') {
            refElement = $(path);
          }
  
  
          if (refElement !== undefined && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.navbar .navbar-list li').removeClass("active");
              currLink.parent().addClass("active");
          }
      });
  }