//var lineReader = require('line-reader');
var readline = require('readline');
var fs = require('fs');
var isWin = process.platform === "win32";
var projectfolername = isWin? 'Prototype/' : '';

var sjsu = {name: 'San Jose State University', params: {Name: 'San Jose State University', Location: 'San Jose, CA', Acceptance_rate: '53.4%', Graduation_rate: '51.6%', Average_annual_cost: '27,039 USD', Average_salary_after_attending_undergrad: '56,100 USD'}};
var stanford = {name: 'Stanford University', params: {Name: 'Stanford University', Location: 'Stanford, CA', Acceptance_rate: '5%', Graduation_rate: '95%', Average_annual_cost: '14,000 USD'}};
var berkeley = {name: 'University of California, Berkeley', params: {Name: 'University of California, Berkeley', Location: 'Berkeley, CA', Acceptance_rate: '17%', Graduation_rate: '91%', Average_annual_cost: '14,000 USD'}};


module.exports.home = function(req, res) {
    sendPage(  projectfolername + 'public/html/index.html', res);
}

module.exports.getCollegeInfo = function(req, res) {
    var schoolName = getCollegeName(req);
    if (schoolName == "SJSU" || schoolName == "sjsu" || schoolName == "San Jose State University") {
        res.render('universityInfo', sjsu);
    } else if (schoolName == "Stanford" || schoolName == "stanford" || schoolName == "Stanford University") {
        res.render('universityInfo', stanford);
    } else if (schoolName == "UCB" || schoolName == "ucb" || schoolName == "University of California, Berkeley") {
        res.render('universityInfo', berkeley);
    } else {
        sendPage(projectfolername + 'public/html/error.html', res);
        //sendPage('public/html/error.html', res);
    }
}

module.exports.get_overview = function(req, res) {
    sendPage(projectfolername + 'public/html/overview.html', res);
}

function getCollegeName(req) {
    return req.param('schoolName');
}

var html = '';
function sendPage(filename, res) {
    // console.log('reading file:');
    var readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });
    readInterface.on('line', function(line) {
        html += line + '\n';
    });
    res.send(html);
    html = '';
}


function sendPageOld(fileName, result) {
    var html = '';

    lineReader.eachLine(fileName,
        function(line, last) {
            html += line + '\n';
            if (last) {
                result.send(html);
                return false;
            } else {
                return true;
            }
        });
}