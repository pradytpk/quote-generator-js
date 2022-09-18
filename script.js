const quoteContainer = document.getElementById("quote-contanier");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show new quote
function newQuote() {
  loading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if the field is blank
  if (!quote.author) {
    authorText.textContent = "unknow";
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length to determins styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote hide loader
  quoteText.textContent = quote.text;
  complete()
}

// Get Quotes from api
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listener
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// onload
getQuotes();

