// 1. Select the DOM elements (Where our state will be displayed)
const quoteTextElement = document.getElementById('quote-text');
const quoteAuthorElement = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

// 2. Define our State Variables (The Vanilla JS version of 'useState')
let isLoading = false;
let currentQuote = { text: '', author: '' };

// 3. The Fetch Function (Modern ES6+ API Consumption)
const fetchQuote = async () => {
    // Set loading state to true and update the UI
    isLoading = true;
    updateUI();

    try {
        const response = await fetch('https://dummyjson.com/quotes/random');

        // Check if the GET request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Update our state with the new data
        currentQuote = {
            text: data.quote,
            author: data.author
        };
    } catch (error) {
        console.error('Error fetching quote:', error);
        currentQuote = {
            text: 'Oops! Failed to fetch a quote. Please try again.',
            author: ''
        };
    } finally {
        // Set loading state to false and update the UI, regardless of success or failure
        isLoading = false;
        updateUI();
    }
};

// 4. Update the UI based on state (Simulating React's automatic re-renders)
const updateUI = () => {
    if (isLoading) {
        quoteTextElement.textContent = 'Loading...';
        quoteAuthorElement.textContent = '';
        newQuoteBtn.disabled = true;
    } else {
        quoteTextElement.textContent = `"${currentQuote.text}"`;
        quoteAuthorElement.textContent = currentQuote.author ? `- ${currentQuote.author}` : '';
        newQuoteBtn.disabled = false;
    }
};

// 5. Event Listeners (User Interaction)
newQuoteBtn.addEventListener('click', fetchQuote);

// 6. Initial Load (The Vanilla JS version of 'useEffect')
// Wait for the HTML document to fully load before fetching the very first quote
document.addEventListener('DOMContentLoaded', () => {
    fetchQuote();
});
