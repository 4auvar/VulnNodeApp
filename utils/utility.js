
function custom_sanitizer_regex(user_input) {
    /*
     * The regex searches for < followed by one or more alphanumeric character,
     * followed by one or more non-alphanumeric characters, and then single
     * alphanumeric character.
     * bypass: <<img|hscript>alert(1)</script>
     */

    let p = "<(\\w+)\\W+[\\w]";
    return user_input.replace(new RegExp(p), "")
}

function isFromBlackListOfXSS(user_input) {

    blackList = [/href/, /<img/, /<script>/, /<\/script>/, /onload/, /<div/, /<meta/, /<a/,
        /onclick/, /<svg/, /<embed/, /<body/, /<article/, /<audio/, /<canvas/, /<iframe/, /<link/, /<object/,
        /<style/, /<span/, /<input/, /<table/, /<tr/, /<td/, /<title/, /<video/]

    let flag = 0;

    for (let i = 0; i < blackList.length; i++) {
        let pattern = blackList[i];

        if (pattern.test(user_input)) {
            flag = 1;
            break;
        }
    }
    if (flag == 1)
        return true;
    else
        return false;
}

function isFromBlackListOfSqli(user_input) {

    blackList = [/--/, /;/, /or/, /and/, /@@/, /@/, /char/, /nchar/, /varchar/, /nvarchar/,
        /table/, /alter/, /begin/, /cast/, /create/, /cursor/, /declare/, /delete/, /drop/, /end/, /exec/,
        /union/, /execute/, /fetch/, /select/, /insert/, /kill/, /open/, /sys/, /sysobjects/, /syscolumns/,
        /update/]

    let flag = 0;

    console.log("isFromBlackListOfSqli : " + user_input);
    for (let i = 0; i < blackList.length; i++) {
        let pattern = blackList[i];

        if (pattern.test(user_input)) {
            flag = 1;
            break;
        }
    }
    if (flag == 1)
        return true;
    else
        return false;
}

function pingMe(ip) {
    return new Promise((resolve, reject) => {
        const { exec } = require('child_process');
        let command = 'ping -c 3 ' + ip;
        console.log("command : " + command);

        exec(command, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(stdout);
            }
        });
    });
}

function readDosAndDonts(filename) {
    return new Promise((resolve, reject) => {
        var fs = require('fs');
        var path = require('path');
        filePath = path.join(__dirname, filename);
        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });

}

function searchLogs(search) {
    return new Promise((resolve, reject) => {
        let rgx = new RegExp('(public\\[\\d+\\] +.*' + search + '.*)');
        var fs = require('fs');
        var path = require('path');
        filePath = path.join(__dirname, 'customLogs.txt');
        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                let resp = "";
                let lines = data.split(/\r\n|\n/);
                lines.forEach(element => {
                    if (rgx.test(element)) {
                        resp += element + "\n";
                    }
                });
                console.log("from utils - resp : " + resp);
                resolve(resp);
            } else {
                console.log("from utils error - : " + err);
                reject(err);
            }
        });
    });
}

function parseXML(xmlInput) {
    return new Promise((resolve, reject) => {
        var libxml = require("libxmljs")
        var parserOptions = {
            noblanks: true,
            noent: true,
            nocdata: true
        };

        try {
            var doc = libxml.parseXmlString(xmlInput, parserOptions);
            return resolve(doc);
        } catch (e) {
            return reject(new Error('Xml parsing error'));
        }
    });
}

function getDeserializeData(data) {
    return new Promise((resolve, reject) => {
        try {
            var serialize = require('node-serialize');
            var str = new Buffer(data, 'base64').toString('ascii');
            var obj = serialize.unserialize(str);
            if (obj.fullname) {
                return resolve(obj.fullname);
            } else {
                return reject(new Error("User data not found"));
            }
        } catch (e) {
            return reject(e);
        }
    });
}

module.exports = {
    custom_sanitizer_regex: custom_sanitizer_regex,
    isFromBlackListOfXSS: isFromBlackListOfXSS,
    isFromBlackListOfSqli: isFromBlackListOfSqli,
    pingMe: pingMe,
    readDosAndDonts: readDosAndDonts,
    searchLogs: searchLogs,
    parseXML: parseXML,
    getDeserializeData: getDeserializeData
};