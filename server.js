const express = require('express');
const satelize = require('satelize');

//ustalenie: daty uruchomienia, portu, autora
const date = new Date().toLocaleDateString('pl-PL');
const port = 8080;
const author = 'Jakub Slusarski';

async function getTime(ip) {
    try {
        //pobranie timezone na podstaiwe adresu ip
        satelize.satelize({ip: ip}, function(err, payload) {
        });
        var timeZone = satelize['timezone']
        var localDate = new Date().toLocaleString('pl-PL', {timeZone: timeZone});

        return localDate
    } catch (e) {
      console.log(e);
      return 'Pobieranie danych z API nie powiodlo sie.';
    }
  }

const app = express();



console.log("Data: " + date)
console.log("Autor: " + author)
console.log("Port: " + port)

app.set('trust proxy', true)
app.use(async (req, res) => {
    var localDate = await getTime(req.ip)
    res.send(`<p>IP: ${req.ip}</p><p>Data, czas:  ${localDate}</p>`);
});

app.listen(port, '0.0.0.0');