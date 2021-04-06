const express = require('express');
const app = express();

const webserver = app.listen(5001, '127.0.0.1', function () {
    console.log('Node web server loaded and listening');
});

var scraper = require('table-scraper');

var data;

async function scrap() {
    return scraper
  .get('https://prod.chronorace.be/VirtualChallenge/1000Bornes/SoutienClub.aspx?chal=38&eventId=1188112508252308&lng=FR&c=2046&hash=vfRu4mv6nt1-PZyeZcqwCfFMEBo&fbclid=IwAR2bYZ1avbu4QrU-KsQjc5advjeuk76Dyplp-fWIHskaBRn0IMBhDuPFnM8')
  .then(function(tableData) {
      console.log(tableData);
    data = tableData[0];
    data.shift();
    data.forEach(people => {
        //console.log(people);
        people["4"] = people["4"].slice(0, -2);
        //console.log(people);
    });
    console.log("Scrapped");
  })
  .catch(function (error) {
      console.log(error);
  });
}

scrap();
setInterval(scrap, 300000);


app.get('/data-jmbpmc', function (req, res) {
    var dataToSend = {data : data};
    res.send(dataToSend);
});

app.use(express.static('public'));