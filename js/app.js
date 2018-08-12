
// create a request variable
const request = new XMLHttpRequest();

// open new connection
request.open("GET", "http://quotes.stormconsultancy.co.uk/quotes.json", true);
request.onload = _ => {
    const quoteList = JSON.parse(request.responseText);

    // create revealing module pattern
    const Quote = (_ => {

        const $quote = document.querySelector("#quote-box");

        const init = _ => {
            render();
            listeners();
        }

        const render = _ => {

            let randIndex = Math.floor(Math.random() * quoteList.length);
            let currentQuote = quoteList[randIndex].quote;
            let currentAuthor = quoteList[randIndex].author;

            const colors = ["#2E4F75", "#710C04", "#9C3455", "#8B5646", "#329676", "#738986", "#AE5D62", "#025563", "#7B564F", "#7A554D", "#BC712D", "#90797E", "#475859"]
            let currentColor = colors[Math.floor(Math.random()*colors.length)]

            let markup = "";
            markup += `
                <div id="text">" ${currentQuote}"</div>
                <div id="author">- ${currentAuthor}</div>
                <button class="button" id="new-quote">New Quote</button>
                <a title="Post this quote to tumblr!" target="_blank"><i class="fa fa-tumblr-square"></i></a>
                <a title="Tweet this quote!" target="_blank"><i class="fa fa-twitter-square"></i></a>

            `
            $quote.innerHTML = markup;

            document.querySelector("#text").style.color = currentColor;
            document.querySelector("#author").style.color = currentColor;
            document.querySelector(".fa-twitter-square").style.color = currentColor;
            document.querySelector(".fa-tumblr-square").style.color = currentColor;
            document.querySelector("#new-quote").style.backgroundColor = currentColor;
            document.body.style.backgroundColor = currentColor;

            document.querySelector(".fa-twitter-square").addEventListener("click", _ => {
                window.open("https://twitter.com/intent/tweet?" + "&text=" + currentQuote + " - " + currentAuthor);
            })

            listeners();
        }

        const listeners = _ => {
            document.querySelector("#new-quote").addEventListener("click", render);

            document.body.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    console.log("dammit")
                    render();
                }
            });
        }

        return {
            init
        }

    })();

    Quote.init();
}
request.send();




// cache the DOM
// const newQuoteButtonEl = document.getElementById("new-quote");
// const quoteBoxEl = document.getElementById("quote-box");
// const textEl = document.getElementById("text");
// const authorEl = document.getElementById("author");

// function changeQuote() {
//     let quotes = quoteList;
//     textEl.innerHTML = `Click the button to see your quote!`

//     newQuoteButtonEl.addEventListener("click", function(){
//         let currentIndex = Math.floor(Math.random()*quotes.length);
//         let quoteIndex = quotes[currentIndex];

//         textEl.innerHTML = `" ${quoteIndex.text}" `;
//         authorEl.innerHTML = `- ${quoteIndex.author}`;

//         textEl.style.color = quoteIndex.color;
//         authorEl.style.color = quoteIndex.color;
//         newQuoteButtonEl.style.backgroundColor = quoteIndex.color;
//         document.body.style.backgroundColor = quoteIndex.color;
//     });


// };
// changeQuote();