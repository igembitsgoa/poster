// import "bootstrap";
var $ = require("jquery");
window.jQuery = $;
window.$ = $;

import "../css/featherlight.min.scss";
import "./featherlight.min.js";

$(document).ready(function () {
  $(function () {
    var $uttarakhand = $("#human_practices_map g#layer3");
    $uttarakhand.on({
      mouseenter: function () {
        var $parent = $uttarakhand.parent();
        // $uttarakhand.remove();
        $parent.append($uttarakhand);
      },
    });
  });
});
