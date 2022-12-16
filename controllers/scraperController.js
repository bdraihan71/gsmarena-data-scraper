const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

exports.index = (req, res) => {
    const tempFolder = './tempDate/';

    fs.readdir(tempFolder, (err, files) => {
        console.log(files)
        // files.forEach(file => {
        //     console.log(file);
        // });
    });

    res.render('pages/scraper');
}

exports.scraper = async(req, res) => {
    let { gsmarena_url } = req.body

    // URL of the page we want to scrape
    const url = gsmarena_url.trim();

    try{
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let file_name = $('.specs-phone-name-title').text()
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

        let filtered = await mobile.filter(function (el) {
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

        fs.writeFile(`tempDate/${file_name}.json`, JSON.stringify(filtered, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(11)
            console.log("Successfully written data to file");
        })

        // let file = `./tempDate/${file_name}.json`
        // res.download(file)

    } catch (err) {
        console.error(err)

    }
    res.redirect('back');
}