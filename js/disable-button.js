var $j = jQuery.noConflict();

/*******
 * Disable the start button, if nothing is written otherwise it enables it
 * *******/

function success() {
  if($j("#username").val() === ""){
    $j('#btn_login').prop('disabled', true);
    $j('#btn_register').prop('disabled', true);
    console.log("mauvais");
  } else {
    if ($j("#password").val() === "") { 
      $j('#btn_login').prop('disabled', true);
      $j('#btn_register').prop('disabled', true);
      console.log("mauvais");
    } else {
      $j('#btn_login').prop('disabled', false);
      $j('#btn_register').prop('disabled', false);
      console.log("bon");
    }
  }
}