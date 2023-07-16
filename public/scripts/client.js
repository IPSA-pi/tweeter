/* eslint-disable prefer-arrow-callback */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetObj) {
  // console.log(format(tweetObj.created_at));
  /// const tweetTemplate = $('<article>');
  // tweetTemplate.append(`
  const article = `<article class="tweet-cont">
        <header class="tweet-header">
          <span class="user-info">
            <img src="https://i.imgur.com/73hZDYK.png" alt="Robert Bresson portrait">
            <p>${tweetObj.user.name}</p>
          </span>
          <span class="handle">
            <p>${tweetObj.user.handle}</p>
          </span>
        </header>  
        <p class="tweet">${tweetObj.content.text}</p>  
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
  $('.tweetForm').submit((event) => {
    event.preventDefault();
    const data = $('.tweetForm').serialize();

    if (data === 'text=' || data === 'null') {
      alert('please provide input');
      return false;
    }

    if (data.length > 145) {
      alert("you're tweet is to long");
      return false;
    }

    console.log('data: ', data);
    // 1. Place holder to make all the validations
    // For e.g. validate for the null / empty or you want to check for 140 characters
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data,
      success: (result) => {
        loadTweets();
      },
      error(err) {
        console.log('There was an error', err);
      },
    });
  });
});
