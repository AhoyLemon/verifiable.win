//@prepros-prepend partials/_variables.js
//@prepros-prepend partials/_functions.js



$('select').change(function(){
  alert('hit');
  $("#widthTempOption").html($('#resizingSelectTag option:selected').text());
  $(this).width($("#selectTagWidth").width()); 
});

//@prepros-append partials/_vue.js
