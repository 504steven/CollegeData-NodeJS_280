var lineReader = require('line-reader');

module.exports.home = function(req, res) {
    sendPage('public/html/index.html', res);
}

module.exports.getCollegeInfo = function(req, res) {
    var schoolName = getCollegeName(req);
    if (schoolName == "SJSU" || schoolName == "sjsu" || schoolName == "San Jose State University") {
        res.render('universityInfo');
    } else {
        sendPage('public/html/error.html', res)
    }
}

function getCollegeName(req) {
    return req.param('schoolName');
}

function sendPage(fileName, result) {
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
