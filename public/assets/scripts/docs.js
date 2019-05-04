function findNewStuff() {
  $('div').each(function () {
    if ($(this).find('.new').length !== 0 || $(this).find('.removed').length !== 0 || $(this).hasClass('new-section')){
      $(this).addClass('show');
    } else {
      $(this).prev('h3').addClass('collapsed');
    }
  });
}

function linkAndExpand(id) {
  $(id).on('shown.bs.collapse', function() {
    console.log($(id).offset());
    $('html').animate({scrollTop: $(id).prev('h3').offset().top}, 'fast');
  });
  $(id).collapse('show');
}