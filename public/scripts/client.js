/* eslint-disable prefer-arrow-callback */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // mock tweets array
  const tweets = [
    {
      user: {
        name: 'Robert Bresson',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@pickPocket',
      },
      content: {
        text: 'Make visible what, without you, might perhaps never have been seen.',
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd',
      },
      content: {
        text: 'Je pense , donc je suis',
      },
      created_at: 1461113959088,
    },
  ];

  // get tweet obj
  const createTweetElement = function (tweetObj) {
    const tweetTemplate = `
    <article class="tweet-cont">
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
          <p class="when">${tweetObj.created_at}</p>
          <span class="icons">
            <span class="fa-solid fa-flag"></span>
            <span class="fa-solid fa-retweet"></span>
            <span class="fa-solid fa-heart"></span>
          </span>
        </footer>
      </article>
    `;
    return tweetTemplate;
  };

  const renderTweets = function (tweetsArray) {
    const tweetsHtml = [];
    tweetsArray.forEach((t) => tweetsHtml.push(createTweetElement(t)));
    console.log(tweetsHtml);
    return $('.tweet-cont').append(tweetsHtml);
  };

  renderTweets(tweets);
});
