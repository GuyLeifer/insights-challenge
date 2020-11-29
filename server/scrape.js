const puppeteer = require('puppeteer');

const data = [];

setInterval(function() {
    (async () => {
        const browser = await puppeteer.launch({
            args: ['--proxy-server=socks5://127.0.0.1:9050'], //dark web
            headless: false
        })
        const page = await browser.newPage();
        await page.goto('http://nzxj65x32vh2fkhk.onion/all'); //dark web
        // await page.goto('https://paste.scratchbook.ch/lists');

        const posts = await page.$$('.col-sm-12');
        posts.forEach( async (post) => {
            const title = await post.$('h4');
            const titleContent = await (await title.getProperty('innerText')).jsonValue();

            const text = await post.$('div[class="text"]');
            const textContent = await (await text.getProperty('innerText')).jsonValue();

            const footer = await post.$('div[class="col-sm-6"]');
            const footerContent = await (await footer.getProperty('innerText')).jsonValue();
            let [author, date] = footerContent.split(' at ');
            author = author.slice(10);
            console.log(titleContent, textContent, author, date)
        })
    })()}, 2 * 60 * 1000);


















//         const oddTable = await page.$$eval('.odd', post => {
//             let obj = {};
//             for (let i = 0; i < 4; i++) {
//                 if(i === 0) obj.title = post[i].textContent
//                 else if (i === 1) obj.name = post[i].textContent
//                 else if (i === 2) obj.language = post[i].textContent
//                 else if (i === 3) obj.timeLeft = post[i].textContent
//             }
//             data.push(obj)
//         })
//         const evenTable = await page.$$eval('.even', options => options.map(option => option.textContent))
//         console.log(data)
//         // console.log(evenTable)
//         // await browser.close()
// // }, 2 * 60 * 1000);



// (async () => {
// 	const args = ['--proxy-server=socks5://127.0.0.1:9050'];
// 	const browser = await puppeteer.launch({ args, headless: false });
// 	const page = await browser.newPage();
// 	await page.goto('https://paste.scratchbook.ch/lists');
// 	const isUsingTor = await page.$eval('body', el =>
// 		el.innerHTML.includes('Congratulations. This browser is configured to use Tor')
// 	);

// 	if (!isUsingTor) {
// 		console.log(colors.red.bold('Not using Tor. Closing...'));
// 		return await browser.close();
// 	}

// 	console.log(colors.green.bold('Using Tor. Continuing... '));

// 	// Now you can go wherever you want
// 	await page.goto('https://propub3r6espa33w.onion/');

//         // You would add additional code to do stuff... 

// 	// Then when you're done, just close
// 	await browser.close();
// })();