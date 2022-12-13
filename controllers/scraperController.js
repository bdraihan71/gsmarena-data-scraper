const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

exports.index = (req, res) => {
    res.render('pages/scraper');
}

exports.scraper = async(req, res) => {
    let { gsmarena_url } = req.body

    // URL of the page we want to scrape
    const url = gsmarena_url.trim();

    try{
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        const file_name = $('.specs-phone-name-title').text()
        mobile = []

        $('#specs-list table tr').each((i, el) => {
            const data = {};
            data.data = $(el)
            .find('th')
            .text()
    
           data.topic = $(el)
            .find('td')
            .eq(0)
            .text()
    
            data.details = $(el)
            .find('td')
            .eq(1)
            .text()
    
            mobile.push(data);
        })

        let filtered = mobile.filter(function (el) {
            if(el.data != ""){
                a = el.data 
            }
            if(el.data == "")
            {
                el.data  =  a
            }
            if(el.topic == " ")
            {
                el.topic  =  "other"
            }
            return el
        });

        fs.writeFile(`${file_name}.json`, JSON.stringify(filtered, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
        })

    } catch (err) {
        console.error(err)

    }

    res.redirect('back');
}