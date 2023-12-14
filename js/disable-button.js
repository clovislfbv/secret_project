var $j = jQuery.noConflict();

/*******
 * Disable the start button, if nothing is written otherwise it enables it
 * *******/

function success() {
  if($j("#username").val() === ""){
    $j('#btn_login').prop('disabled', true);
    $j('#btn_register').prop('disabled', true);
  } else {
    if ($j("#password").val() === "") { 
      $j('#btn_login').prop('disabled', true);
      $j('#btn_register').prop('disabled', true);
    } else {
      $j('#btn_login').prop('disabled', false);
      $j('#btn_register').prop('disabled', false);
    }
  }
}

function success_secret() {
  if ($j("#mySecret").val() === ""){
    $j('#btn_add_secret_modal').prop('disabled', true);
    $j('#btn_secret').prop('disabled', true);
  } else {
    $j('#btn_add_secret_modal').prop('disabled', false);
    $j('#btn_secret').prop('disabled', false);
  }
  $j(".invalid-feedback").addClass("d-none");
}