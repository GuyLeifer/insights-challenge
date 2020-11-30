const puppeteer = require('puppeteer');
require('dotenv').config();
const axios = require('axios')

function scrape ()  {
    (async () => {
        try {
            const browser = await puppeteer.launch({
                args: ['--proxy-server=socks5://127.0.0.1:9050'], //dark web
                // headless: false
            })
            const page = await browser.newPage();
            await page.goto('http://nzxj65x32vh2fkhk.onion/all'); //dark web
            // await page.goto('https://paste.scratchbook.ch/lists');
    
            const posts = await page.$$('.col-sm-12');
            posts.forEach( async (post) => {
    
                const href = await post.$eval('.btn-success', (el) => el.getAttribute('href'));
                const id = href.replace('http://nzxj65x32vh2fkhk.onion/', "");
                const title = await post.$('h4');
                const titleContent = await (await title.getProperty('innerText')).jsonValue();
    
                const text = await post.$('div[class="text"]');
                let textContent = await (await text.getProperty('innerText')).jsonValue();
                textContent = textContent.replace(/\s\s+/g, ' ');

                const footer = await post.$('div[class="col-sm-6"]');
                const footerContent = await (await footer.getProperty('innerText')).jsonValue();
                let [author, date] = footerContent.split(' at ');
                date = new Date(date);
                author = author.slice(10);

                    axios.post('http://localhost:3001/posts', {
                        id: id,
                        title: titleContent,
                        content: textContent,
                        author: author,
                        date: date
                    }).then(res => {
                        console.log(`success`)
                    }).catch(error => {
                        console.error(error)
                    })
                // console.log(id, titleContent, textContent, author, date)
                await browser.close();
            })
        } catch (err) {
            console.log(err.massage)
        }
    })()
}

module.exports = scrape;