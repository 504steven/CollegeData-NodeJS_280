//var lineReader = require('line-reader');
var readline = require('readline');
var fs = require('fs');
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype/' : '';

var sjsu = {name: 'San Jose State University',
    params: {
        Name: 'San Jose State University',
        Location: 'San Jose, CA',
        Acceptance_rate: '53.4%',
        Graduation_rate: '51.6%',
        Average_annual_cost: '27,039 USD',
        Average_salary_after_attending_undergrad: '56,100 USD'
    }
};

var stanford = {name: 'Stanford University',
    params: {
        Name: 'Stanford University',
        Location: 'Stanford, CA',
        Acceptance_rate: '5%',
        Graduation_rate: '95%',
        Average_annual_cost: '14,000 USD'
    }
};

var berkeley = {name: 'University of California, Berkeley',
    params: {
        Name: 'University of California, Berkeley',
        Location: 'Berkeley, CA',
        Acceptance_rate: '17%',
        Graduation_rate: '91%',
        Average_annual_cost: '14,000 USD'
    }
};

var registeredUsers = [];

module.exports.home = function(req, res) {
    sendPage(projectFolerName + 'public/html/loginAndRegister.html', res);
};

module.exports.post_register = function(req, res) {
    console.log('register called');
    if (!req.body.username || !req.body.password) {
        res.send("Missing Username or Password for Registeration!");
    } else {
        var matches = registeredUsers.filter(function(user) {
            return user.username == req.body.username;
        });
        if (matches.length > 0) {
            res.send("username has been registered. use another username or try login");
        } else {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            };
            registeredUsers.push(newUser);
            req.session.user = newUser;
            console.log('new user registered : ' + newUser.username);
            res.redirect('/protected');
        }
    }
};

module.exports.post_login = function(req, res) {
    console.log('login called');
    var matches = registeredUsers.filter(function(user) {
        return user.username == req.body.username && user.password == req.body.password;
    });
    if (matches.length == 0) {
        res.send('wrong username or password');
    } else {
        req.session.user = matches[0];
        res.redirect('/protected');
    }
};

module.exports.get_logout = function(req, res) {
    if (req.session.user) {
        req.session.destroy(function() {
            console.log('session deleted');
        });
    }
    res.redirect('/');
};

module.exports.loggedIn = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send("must log in first");
    }
};

module.exports.get_protected = function(req, res) {
    sendPage(projectFolerName + 'public/html/index.html', res);
};

module.exports.getCollegeInfo = function(req, res) {
    console.log("finding college");
    var schoolName = req.param('schoolName');
    if (schoolName == "SJSU" || schoolName == "sjsu" || schoolName == "San Jose State University") {
        res.render('universityInfo', sjsu);
    } else if (schoolName == "Stanford" || schoolName == "stanford" || schoolName == "Stanford University") {
        res.render('universityInfo', stanford);
    } else if (schoolName == "UCB" || schoolName == "ucb" || schoolName == "University of California, Berkeley") {
        res.render('universityInfo', berkeley);
    } else {
        sendPage(projectFolerName + 'public/html/error.html', res);
        console.log("send error page");
    }
};

module.exports.get_overview = function(req, res) {
    sendPage(projectFolerName + 'public/html/overview.html', res);
};

function sendPage(filename, res) {
    var html = '';
    var readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });
    //readInterface is async
    readInterface.on('line', function(line) {
        html += line + '\n';
    }).on('close', function() {
        res.send(html);
    });
}

function sendPageOld(fileName, result) {
    var html = '';
    lineReader.eachLine(fileName, function(line, last) {
        html += line + '\n';
        if (last) {
            result.send(html);
            return false;
        } else {
            return true;
        }
    });
}
