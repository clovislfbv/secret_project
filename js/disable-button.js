var $j = jQuery.noConflict();

/*******
 * Disable the start button, if nothing is written otherwise it enables it
 * *******/

function success() {
    if($j("#username").val() === ""){
      $j('#btn_sendform').prop('disabled', true);
      console.log("mauvais");
    } else {
      if ($j("#mySecret").val() === "") { 
        $j('#btn_sendform').prop('disabled', true);
        console.log("mauvais");
      } else {
        $j('#btn_sendform').prop('disabled', false);
        console.log("bon");
      }
    }
  }