const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('result.csv');

const link = 'https://dev.to/t/javascript';

writeStream.write('Title,Link,Author,Date \n');

request(link, (err, res, html) => {
  if (!err && res.statusCode == 200) {
    const $ = cheerio.load(html);
    $('.single-article').each((i, el) => {
      const title = $(el)
        .find('.content')
        .text()
        .replace(/\s\s+/g, '');

      const blogLink =
        'https://dev.to' +
        $(el)
          .find('.index-article-link')
          .attr('href');

      const author = $(el)
        .find('h4')
        .text()
        .replace(/\s\s+/g, '')
        .split('・')[0];

      const dates = $(el)
        .find('h4')
        .text()
        .replace(/\s\s+/g, '')
        .split('・')[1];

      writeStream.write(`${title}, ${blogLink}, ${author}, ${dates} \n`);
    });
    console.log('Scraping Finished');
  }
});
