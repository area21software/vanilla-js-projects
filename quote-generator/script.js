const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const quoteSpan = document.getElementById("quote");
const authorSpan = document.getElementById("author");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");
const h1Error = document.getElementById("error");

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function showError() {
    quoteContainer.hidden = true;
    loader.hidden = true;
    h1Error.textContent = "Oops, there seem to be an error";
    h1Error.hidden = false;
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteSpan.textContent} - ${authorSpan.textContent}`;
    window.open(twitterUrl, "_blank");
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (quote.text.length > 75) {
        quoteSpan.classList.add("long-quote");
    } else {
        quoteSpan.classList.remove("long-quote");
    }
    quoteSpan.textContent = quote.text;

    if (!quote.author) {
        authorSpan.textContent = "- Unknown";
    } else {
        authorSpan.textContent = `- ${quote.author}`;
    }

    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl =
        "https://jacintodesign.github.io/quotes-api/data/quotes.json";

    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        newQuote();
    } catch (err) {
        showError();
    }
}

function start() {
    getQuotes();
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

start();
