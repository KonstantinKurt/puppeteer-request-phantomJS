const Crawler = require('crawler');
const puppeteer = require('puppeteer');
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const url = `https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1`;
const detailUrl = `https://emex.ru/f?detailNum=4340160080`;
const phantom = require('phantom');


// (async () => {
//
//
//     const response = await request({
//             uri: detailUrl,
//             //uri: url,
//             // headers: {
//             //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//             //     'Accept-Encoding': 'gzip, deflate, br',
//             //     'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
//             //     'Cache-Control': 'max-age=0',
//             //     'Connection': 'keep-alive',
//             //     'Host': 'www.imdb.com',
//             //     'Upgrade-Insecure-Requests': '1',
//             //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
//             // },
//             gzip: true
//         }
//     );
//     console.log(response);
//     fs.writeFileSync('./dataMovies.txt', response);
//     let $ = cheerio.load(response);
//     // let title = $('div[class="title_wrapper"] > h1').text().trim();
//     // console.log(title);
//     // let test = $('span[data-bind="text: brandData().MakeName"]').text();
//     //  console.log(`Test: ${test}`);
//
//     // let test = $('span[class="detail-make"]').text();
//     // console.log(test);
//
//
// })();

// let getCategories = new Crawler({
//     maxConnections: 1,
//     rateLimit: 1000,
//     callback: function(err, res, done) {
//         err && console.log(err);
//         let $ = cheerio.load(res.body);
//         let test = $('span[data-bind="text: brandData().MakeName"]').text();
//         console.log(`Test: ${test}`);
//         fs.writeFileSync('./dataCrawler.txt',res.body );
//         done();
//     }
// });
//
// getCategories.queue(detailUrl);

// const waitForResponse = (page, url) => {
//     return new Promise(resolve => {
//         page.on("response", function callback(response) {
//             if (response.url() === url) {
//                 resolve(response);
//                 page.removeListener("response", callback)
//             }
//         })
//     })
// };
//

(async () => {

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     width: 1800,
    //     height: 800
    // });
    // const page = await browser.newPage();
    // await page.setViewport({width: 1800, height: 800})
    // await page.goto(detailUrl);
    // await page.waitForNavigation({waitUntil: 'domcontentloaded'});
    // await page.evaluate(() => {
    //     let elements = document.getElementsByClassName(`dashed`);
    //     console.log(elements.length);
    //     for (let element of elements)
    //         element.click();
    // });
    // await page.waitFor(3000);
    // let html = await page.content();
    // await fs.writeFile('./datapuppeteer.txt',html ,()=>{console.log(`file saved`);});

    let fileContent = fs.readFileSync("datapuppeteer.txt", "utf8");
    let $ = cheerio.load(fileContent);
    let test = $(`span[data-bind="text: brandData().MakeName"]`).text();
    console.log(`Test: ${test}`);
    let refferences = [],
        names = [],
        suppliers = [],
        prices = [];
    refferences.push($(`div[data-bind="linkOrText: { text: detailInfo.VisibleNum, href: emex.find.brand.replacementSearchlUrl(detailInfo) }"]`).first().text());
    $(`div[data-bind="linkOrText: { text: detailInfo.VisibleNum, href: emex.find.brand.replacementSearchlUrl(detailInfo) }"] > a`).each(function () {
        refferences.push($(this).text());
    });
    console.log(`Refferences \n ${refferences} \n Length: ${refferences.length}`);
    $(`div[class *= "col"] > span[class="detail-make"]`).each(function () {
        names.push($(this).text());
    });
    console.log(`Names \n ${names} \n Length: ${names.length}`);
    $(`div[class *= "expandable-list"]`).eq(0).find(`span[data-bind = "text: quantityText"]`).each(function(){
       console.log($(this).text());
    });

})();
// WORKS, BUT ONLY WITH USING setTimeout and have problems with stability;

// (async function () {
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//     const status = await page.open(detailUrl);
//     const content = await page.property('content');
//     // setTimeout(function (){fs.writeFile('./data.txt', content, function(err, data) {})},5000);
//     setTimeout(function () {
//         let $ = cheerio.load(content);
//         let test = $('span[data-bind="text: brandData().MakeName"]').text();
//         console.log(`Test: ${test}`);
//     }, 10000);
//     await instance.exit();
//
// })();


