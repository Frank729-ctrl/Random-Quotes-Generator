import React, { useState, useEffect } from 'react';

const QuoteBox = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleTweetQuote = async () => {
    try {
      const response = await fetch(`https://api.twitter.com/2/tweets/1707467289023356928/quote_tweets`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer QFzlX0YnduyKXBosW7RTPPXOX9YrGW',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `"${quote}" - ${author}`
        })
      });
      if (!response.ok) {
        throw new Error('Failed to quote tweet');
      }
      console.log('Quote tweet created successfully');
    } catch (error) {
      console.error('Error quoting tweet:', error);
    }
  };

  return (
    <div id="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>
      <button id="tweet-quote" onClick={handleTweetQuote}>
        Tweet Quote
      </button>
    </div>
  );
};

export default QuoteBox;
