/**
 * @returns {Object} quote info
 */
const fetchQuotes =  async() => {

    // esto contiene todo (codigo de error, url,timers,status,...) el valor no!
    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await res.json();

    console.log(data[0]);
    return data[0];

}


// 'B' es mayuscula para desirle a mis compañeros que es la App en si
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async(element) => {

    document.querySelector('#app-title').innerHTML = 'Breaking bad App'

    element.innerHTML = 'Loading ...'

    const quoteLabel = document.createElement('blockquote');
    const authoLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerHTML = 'Next quote'

    const renderQuotes = ( data ) =>{
        quoteLabel.innerHTML = data.quote;
        authoLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authoLabel, nextQuoteButton);
    }

    // - MI INTENTO
    //añadir addEventListener
    // nextQuoteButton.addEventListener(('click'), () =>{
    //     quoteLabel.innerHTML = '00';
    //     authoLabel.innerHTML = '';
    //     console.log(quoteLabel.textContent);
    //     nextQuoteButton.disabled = true;
    //     fetchQuotes()
    //         .then( renderQuotes );
    //     if(quoteLabel.textContent !== '') nextQuoteButton.disabled = false;

    // })

    nextQuoteButton.addEventListener('click', async() =>{
        element.innerHTML = 'Loading ...'; // overwrite 'element'
        const quote = await fetchQuotes();
        renderQuotes(quote);
    })


    // this is a promise
    fetchQuotes()
        .then( renderQuotes );

}