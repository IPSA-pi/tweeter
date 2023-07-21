/* eslint-disable prefer-arrow-callback */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetObj) {
  const escape = function (str) {
    const tweetTag = document.createElement('p');
    tweetTag.appendChild(document.createTextNode(str));
    return tweetTag.innerHTML;
  };

  const safeInput = escape(tweetObj.content.text);

  const article = `<article class="tweet-cont">
        <header class="tweet-header">
          <span class="user-info">
            <img src=${tweetObj.user.avatars} alt="Robert Bresson portrait">
            <p>${tweetObj.user.name}</p>
          </span>
          <p class="handle">${tweetObj.user.handle}</p>
        </header>  
        <p class="tweet">${safeInput}</p>  
        <footer>
          <p class="when">${timeago.format(tweetObj.created_at)}</p>
          <span class="icons">
            <span class="fa-solid fa-flag"></span>
            <span class="fa-solid fa-retweet"></span>
            <span class="fa-solid fa-heart"></span>
          </span>
        </footer>
        <article>`;
  return article;
  // return tweetTemplate;
};

const renderTweets = function (tweetsArray) {
  // const tweetsHtml = [];
  $('.tweet-container').empty();
  tweetsArray.forEach((t) => {
    // tweetsHtml.unshift(createTweetElement(t));
    const result = createTweetElement(t);
    $('.tweets-container').prepend(result);
  });
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json',
    success: (result) => {
      renderTweets(result);
    },
    error: (error) => {
      console.error('An error occured, ', error);
    },
  });
};

$(document).ready(function () {
  loadTweets();
  $('#tweetForm').submit((event) => {
    event.preventDefault();
    $('.error').css({ visibility: 'hidden', position: 'absolute' });

    const data = $('#tweetForm').serialize();

    if (data === 'text=' || data === 'null' || data === /^[^%]*(%20[^%]*)*$/) {
      $('.errorNothing').css({ visibility: 'visible', position: 'relative' });
      // alert('please provide input');
      return false;
    }

    if (data.length > 145) {
      // alert("you're tweet is to long");
      $('.errorLength').css({ visibility: 'visible', position: 'relative' });
      return false;
    }

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data,
      success: (result) => {
        loadTweets();
        document.getElementById('tweetForm').reset();
      },
      error(err) {
        console.log('There was an error', err);
      },
    });
  });
});
