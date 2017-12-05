const readline = require('readline');
const fs = require('fs');
const extend = require('extend');
const jsonObjArray = [];

const rl = readline.createInterface({
    input: fs.createReadStream('customer-data.csv'),
    crlfDelay: Infinity
});

var counter = 0;
var jsonKeys = [];
rl.on('line', (line) => {
    var lineContentArray = line.split(',');

    if (counter === 0) {
        lineContentArray.forEach(function (item, index) {
            jsonKeys.push(item);
        });
    }
    else {
        var jsonObj = new Object();
        lineContentArray.forEach(function (item, index) {            
            var key = jsonKeys[index];
            var o = new Object();
            o[key] = item;

            extend(jsonObj, o);            
        });
        jsonObjArray.push(jsonObj);
    }
    counter++;    
});
rl.on('close', (line) => {
    fs.writeFile('data.json', JSON.stringify(jsonObjArray), function (err) {
        if (err) throw err;
    })
});