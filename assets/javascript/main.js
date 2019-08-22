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

  //-------------------------RESULTS LIST JSON AND CREATION------------------------------------------

    var xhr = new XMLHttpRequest();                         //#1 create XMLHttpReaquest object

    xhr.onload =  function() {                              //#4 when readystate changes
      if(xhr.status == 200) {                               //#5 if server status was OK
        responseObject = JSON.parse(xhr.responseText);      //convert the string to javascript object and store it to a variable
        var newMatchResult = '';                            // variable to hold the new HTML data
        for (var i = 0; i < 8; i++) {                       // loop through first 8 matches
          if (responseObject[i].outCome == 'win') {         // check if the outCome is win or loss
            matchColor = 'chartreuse';
          }
            else {
              matchColor = 'lightcoral';
          }                                                //constructing the html with the json data
          newMatchResult += '<li data-aos="flip-right" data-aos-anchor-placement="center-bottom">';
          newMatchResult += '<button class="match-item" style="background-color:' + matchColor + ';">';
          newMatchResult += "BO" + responseObject[i].bestOf + " " + "TPJ vs " + responseObject[i].enemy + " " + responseObject[i].score;
          newMatchResult += '</button>';
          newMatchResult += '<div class="match-info"><b>' + responseObject[i].league + '</b><br>';
          newMatchResult += responseObject[i].mapOne + '<br>' + responseObject[i].mapTwo + '<br>' + responseObject[i].mapThree + '<br>';
          newMatchResult += '</div>';

          document.getElementById('results-list').innerHTML = newMatchResult; //add the new HTML data to the page
        }
        var newMatchResult = '';                            // clear data
        for (var i = 8; i < responseObject.length; i++) {   //loop trough the rest of the matches
          if (responseObject[i].outCome == 'win') {         // check if the outCome is win or loss
            matchColor = 'chartreuse';
          }
            else {
              matchColor = 'lightcoral';
          }                                                 //constructing the html with the json data
          newMatchResult += '<li data-aos="flip-right" data-aos-anchor-placement="center-bottom">';
          newMatchResult += '<button class="match-item" style="background-color:' + matchColor + ';">';
          newMatchResult += "BO" + responseObject[i].bestOf + " " + "TPJ vs " + responseObject[i].enemy + " " + responseObject[i].score;
          newMatchResult += '</button>';
          newMatchResult += '<div class="match-info"><b>' + responseObject[i].league + '</b><br>';
          newMatchResult += responseObject[i].mapOne + '<br>' + responseObject[i].mapTwo + '<br>' + responseObject[i].mapThree + '<br>';
          newMatchResult += '</div>';

          document.getElementById('piilotettu').innerHTML = newMatchResult; //add the HTML data to the hidden ul
        }
      }
    }
    xhr.open ('GET', 'https://api.tpj.fi/api/data/results', true); //#2 Prepare the request
    xhr.send(null);                                       //#3 Send the request


//------------------------ UPCOMING MATCH LIST ---------------------------------------------
var xhru = new XMLHttpRequest();                         //#1 create XMLHttpReaquest object

xhru.onload =  function() {                              //#4 when readystate changes
  if(xhru.status == 200) {                               //#5 if server status was OK
    responseObject = JSON.parse(xhru.responseText);      //convert the string to javascript object and store it to a variable
    var newMatchUpcoming = '';                           // variable to hold the new HTML data
    if (responseObject.length == 0) {
      newMatchUpcoming += '<p><i>No Upcoming Matches :(</i></p>'
      document.getElementById('upcoming-list').innerHTML = newMatchUpcoming; //add the new HTML data to the page
    }
    else {
      for (var i = 0; i < responseObject.length; i++){                           // loop through first 8 matches
        if (responseObject[i].upcoming_league == 'FEL') {         // check if the league is FEL , Challengermode or Something else
          leagueColor = '#2466FF';
        }
        else if (responseObject[i].upcoming_league == 'Challengermode') {
          leagueColor = 'Orange';
        }
          else {
            leagueColor = '#b3b3b3';
        }

        var matchDay = responseObject[i].upcoming_match_day;
                                   //constructing the html with the json data
        newMatchUpcoming += '<li data-aos="flip-right" data-aos-anchor-placement="center-bottom">';
        newMatchUpcoming += '<button class="match-item" style="background-color:' + leagueColor + ';">';
        newMatchUpcoming +=  matchDay.slice(8,10) + "."+ matchDay.slice(5,7) + " | " +"TPJ vs " + responseObject[i].upcoming_enemy + " ";
        newMatchUpcoming += '</button>';
        newMatchUpcoming += '<div class="match-info"><b>' + "League:" + " " + responseObject[i].upcoming_league + '</b><br>';
        newMatchUpcoming += '<b>' + "BO: " + responseObject[i].upcoming_bestOf + '</b><br>';
        newMatchUpcoming += '<b>' + "Match day: " + matchDay.slice(8,10) + "." + matchDay.slice(5,7) + "." + matchDay.slice(0,4) +'</b><br>';
        newMatchUpcoming += '<b>'+ "Starting time: " + " " + responseObject[i].upcoming_startTime +'</b> <br>';
        newMatchUpcoming += '<b>'+ "Stage: " + responseObject[i].upcoming_stage +  '</b><br>';
        newMatchUpcoming += '</div>';

        document.getElementById('upcoming-list').innerHTML = newMatchUpcoming; //add the new HTML data to the page
      }
    }

  }
}
xhru.open ('GET', 'https://api.tpj.fi/api/data/upcoming', true); //#2 Prepare the request
xhru.send(null);                                       //#3 Send the request
});
//------------------------ MATCH LIST MORE INFO --------------------------------------------
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
