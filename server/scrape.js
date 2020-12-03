const puppeteer = require('puppeteer');
require('dotenv').config();
const axios = require('axios')
const fs = require('fs')

const tags = JSON.parse(fs.readFileSync('./tags.json', "utf-8"));
const peadophile = tags.Peadophile;
const weapons = tags.Weapons;
const trading = tags.Trading;

function scrape ()  {
    (async () => {
            console.log("until here 1")
            const browser = await puppeteer.launch({
                args: [
                    '--proxy-server=socks5://tor-proxy:9050',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage'
                ], //dark web + docker
                // headless: false
            })
            console.log("until here 2")
            const page = await browser.newPage();
            await page.goto('http://nzxj65x32vh2fkhk.onion/all'); //dark web
            // await page.goto('https://paste.scratchbook.ch/lists');
            console.log("until here 3")
    
            const posts = await page.$$('.col-sm-12');
            posts.forEach( async (post) => {
                
                const href = await post.$eval('.btn', (el) => el.getAttribute('href'));
                const id = href.replace('http://nzxj65x32vh2fkhk.onion/', "");
                const title = await post.$('h4');
                const titleContent = await (await title.getProperty('innerText')).jsonValue();
                if(titleContent === "") titleContent = "No Title"; // unified title

                const text = await post.$('div[class="text"]');
                let textContent = await (await text.getProperty('innerText')).jsonValue();
                textContent = textContent.replace(/\s\s+/g, ' '); // no extra spaces
                textContent = textContent.trim(); // no extra spaces before and after

                const footer = await post.$('div[class="col-sm-6"]');
                const footerContent = await (await footer.getProperty('innerText')).jsonValue();
                let [author, date] = footerContent.split(' at ');
                date = new Date(date); // UTC date
                author = author.slice(10);
                if(author.toLowerCase() === "guest" || author.toLowerCase() === "unknown") author = "Anonymous"; // unified author

                let tags = [];
                // tags
                for (let i  = 0; i < peadophile.length; i++) {
                    if(titleContent.indexOf(peadophile[i]) > 0 || textContent.indexOf(peadophile[i]) > 0 || author.indexOf(peadophile[i]) > 0) {
                        tags.push("peadophile")
                        break;
                    }  
                }
                for (let i  = 0; i < weapons.length; i++) {
                    if(titleContent.indexOf(weapons[i]) > 0 || textContent.indexOf(weapons[i]) > 0 || author.indexOf(weapons[i]) > 0) {
                        tags.push("weapons")
                        break;
                    }  
                }
                for (let i  = 0; i < trading.length; i++) {
                    if(titleContent.indexOf(trading[i]) > 0 || textContent.indexOf(trading[i]) > 0 || author.indexOf(trading[i]) > 0) {
                        tags.push("trading")
                        break;
                    }  
                }

                try {
                axios.post('http://localhost:3001/post', {
                    id: id,
                    title: titleContent,
                    content: textContent,
                    author: author,
                    date: date,
                    tags: tags
                }).then(res => console.log("until here 5"))
                .catch(error => {
                    console.log("mongo error", error.message)
                })
                } catch (err) {
                    console.log(err.message)
                }

                try {
                    axios.post('http://localhost:3001/elasticsearch/posts', {
                            id: id,
                            title: titleContent,
                            content: textContent,
                            author: author,
                            date: date,
                            tags: tags
                    }).then(res => console.log("until here 6"))
                    .catch(err => console.log("elasticsearch error", err.message))
                } catch (err) {
                    console.log(err.message)
                }

                await browser.close();
            })
    })()
}

module.exports = scrape;