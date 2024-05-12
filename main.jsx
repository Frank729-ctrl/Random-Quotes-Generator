let genQuote=document.querySelector("#new-quote");
let tweetBut=document.querySelector("#tweet-quote");
let content=document.querySelector("#text");
let author=document.querySelector("#author");


const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return data;
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
          text: `"${content.innerText}" - ${author.innerText}`
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



async function writter(data){
  let getter=new Promise((resolve,reject)=>{
      if(data != undefined){
        resolve(content.textContent=data.content);
        resolve(author.textContent=data.author);
      }
    })
  };



genQuote.addEventListener("click",async ()=>{
  const data=await fetchQuote();
  writter(data);
});