$(document).ready(() => {
  $('#tweet-text').on('input', function () {
    const counter = $(this).siblings('#form-footer').children('.counter');
    const charLimit = 140;
    const tweetLength = $(this).val().length;
    counter.val(charLimit - tweetLength);
    if (counter.val() < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});
