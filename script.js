import {$,jQuery} from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;
function fillDiv(div, proportional) {
    var currentWidth = div.outerWidth();
    var currentHeight = div.outerHeight();
  
    var availableHeight = window.innerHeight;
    var availableWidth = window.innerWidth;
  
    var scaleX = availableWidth / currentWidth;
    var scaleY = availableHeight / currentHeight;
  
    if (proportional) {
      scaleX = Math.min(scaleX, scaleY);
      scaleY = scaleX;
    }
  
    var translationX = Math.round((availableWidth - (currentWidth * scaleX)) / 2);
    var translationY = Math.round((availableHeight - (currentHeight * scaleY)) / 2);
  
    div.css({
      "position": "fixed",
      "left": "0px",
      "top": "0px",
      "-webkit-transform": "translate(" + translationX + "px, "
                                        + translationY + "px) scale3d("
                                        + scaleX + ", " + scaleY + ", 1)",
      "-webkit-transform-origin": "0 0"
    });
  }
  function initialize() {
    var div = $("#fill");
    fillDiv(div, true);
  
    if ("onorientationchange" in window) {
      console.log("Using orientationchange");
      // There seems to be a bug in some Android variants such that the
      // metrics like innerHeight and outerHeight (used in fillDiv above)
      // are not updated when the orientationEvent is triggered. The
      // half-second delay gives the browser a chance to update the
      // metrics before rescaling the div.
      $(window).bind("orientationchange", function() { setTimeout(function() { fillDiv(div, true); }, 500) });
    } else if ("ondeviceorientation" in window) {
      console.log("Using deviceorientation");
      // Unlike the event above this not limited to a horzontal/vertical
      // flip and will trigger for any device orientation movement
      $(window).bind("deviceorientation", function() { setTimeout(function() { fillDiv(div, true); }, 500) });
    }else {
      console.log("No orientation supported, fallback to resize");
      $(window).bind("resize", function() { fillDiv(div, true); });
    }
  }
  
  $(window).load(initialize);