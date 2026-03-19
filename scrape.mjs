import scrape from 'website-scraper';

const options = {
  urls: ['https://drive-school-tnc.webflow.io/'],
  directory: './cloned-site',
  recursive: true,
  maxDepth: 5,
  ignoreErrors: true, 
  urlFilter: function(url) {
    if (url.includes('drive-school-tnc.webflow.io')) return true;
    if (url.includes('cdn.prod.website-files.com')) return true;
    if (url.includes('ajax.googleapis.com')) return true;
    if (url.includes('d3e54v103j8qbb.cloudfront.net')) return true;
    return false;
  }
};

console.log("Starting scraper...");

scrape(options).then((result) => {
    console.log("Entire website successfully downloaded to ./cloned-site");
}).catch((err) => {
    console.error("An error occurred", err);
});
