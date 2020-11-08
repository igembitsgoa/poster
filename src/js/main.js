// import "bootstrap";
var $ = require("jquery");
window.jQuery = $;
window.$ = $;

import "../css/featherlight.min.scss";
import "./featherlight.min.js";

var state = null;

$(document).ready(function () {
  var states = [
    "Uttarakhand",
    "UttarPradesh",
    "Maharashtra",
    "TamilNadu",
    "Karnataka",
  ];
  for (var i = 0; i < states.length; i++) {
    $(document).on("click", "#" + states[i] + "_Marker", function () {
      state = $(this).attr("id").split("_")[0];
      toggle_states();

      $("g").removeClass("clicked");
      $(this).addClass("clicked");
    });
  }
});

function toggle_states() {
  $('body').attr('data-state', state);
}
