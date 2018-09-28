// Parses our HTML and helps us find elements
const cheerio = require("cheerio");
// Makes HTTP request for HTML page
const request = require("request");

let sourceURL = "https://www.nytimes.com/section/us"

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing latest news from the New York Times\n" +
            "\n***********************************\n");
request(sourceURL, function(error, response, html) {
   
  // Load the HTML into cheerio and save it to a variable
  const $ = cheerio.load(html);
  // Make an empty array for the results from the page
  let results = [];

 // Go through each div on the page with a 'story-body' tag
  $("div.story-body").each(function(i, element){
     // Take link from child anchor tag
      let storyLink = $(element).find("a").attr("href");
        // For the headline
      $("h2.headline").each(function(i, element){
        let headline = $(element).text().trim();
        
        // To grab the summary
        $("p.summary").each(function(i, element) {
            let summary = $(element).text().trim();

            results.push({
                headline: headline,
                summary: summary,
                url: storyLink
            })
        })

      })
    })
    
  console.log(results)

})