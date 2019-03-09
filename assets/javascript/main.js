$(function(){ //On page load function


  $(window)

  //-----------------NAVBAR ONSCROLL------------------
  
  window.onscroll = function() {myFunction()};

  var header = document.getElementById("nav-wrapper");
  var sticky = header.offsetTop;
  
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  }

  //------------------TWITCH EMBEDDED-------------------
  /*
  new Twitch.Embed("twitch-embed", {
        width: '95%',
        height: 480,
        channel: "tpjcommunity",
        theme: 'light'
      });

      */



  // ----------------Animate On Scroll------------

  AOS.init({
    duration: 1200,
    once: true,
  });

  // -----------------FADE IN IMAGE---------------

  /*$('#canvas-img').ready(function(){
    $('#logo').fadeIn(0000);
  });*/


  // --------------------SMOOTH SCROLL----------------------------------------

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
              $target.css( "outline","0");
            };
          });
        }
      }
    });
});
//------------------------ MATCH LIST --------------------------------------------
$('.match-list').on('click', '.match-item', function(e){
  e.preventDefault();
  $(this).next('.match-info').not('animated').slideToggle();

});

//-------------------------SHOW MORE BUTTON---------------------------------
function showMore() {
  var $matches = $('#piilotettu');
  var $showMoreText = $('.show-more-text');
  var $arrowUp = $('.up');
  var $arrowDown = $('.down');
  
  if ($matches.is(':hidden')) {
    $matches.slideDown();
    $showMoreText.text("Show Less");
    $arrowDown.hide();
    $arrowUp.show();

  }
  else {
    $matches.slideUp();
    $showMoreText.text("Show More");
    $arrowUp.hide();
    $arrowDown.show();
  }
}
//------------------------- MOBIE NAV --------------------------------------
function toggleNav() {
  var nav = document.getElementById("mySidenav");
  if (nav.style.width == "250px") {
    nav.style.width = "0";
  }
  else {
    nav.style.width = "250px";
  }
}
/*
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}*/
