var readline = require('readline');
var fs = require('fs');
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype-mongo/' : '';
var registeredUsers = [{username: "admin", password: "123"}];
var modelMain = require("../models/modelMain");

module.exports.get_register = function(req, res) {
    sendPage(projectFolerName + 'public/html/loginAndRegister.html', res);
};

module.exports.get_contact = function(req, res) {
    sendPage(projectFolerName + 'public/html/contact.html', res);
};

module.exports.get_admin = function(req, res) {
    sendPage(projectFolerName + 'public/html/admin.html', res);
};

module.exports.check_admin = function(req, res, next) {
    if (req.session.user) {
        if (req.session.user.username == "admin") {
            next();
        } else {
            res.send("Only admin can access this page");
        }
    } else {
        res.send("must log in first");
    }
};

module.exports.get_homePage = function(req, res) {
    sendPage(projectFolerName + 'public/html/home.html', res);
};

module.exports.get_dashboard = function(req, res) {
    sendPage(projectFolerName + 'public/html/dashboard.html', res);
};

module.exports.post_register = function(req, res) {
    console.log('register called');
    if (!req.body.username || !req.body.password) {
        res.send("Missing Username or Password for Registration!");
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
            res.redirect('/home');
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
        res.redirect('/home');
    }
};

module.exports.get_logout = function(req, res) {
    if (req.session.user) {
        req.session.destroy(function() {
            console.log('session refreshed');
        });
    }
    res.redirect('/');
};

module.exports.check_logged_In = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send("must log in first");
    }
};

module.exports.post_collegeInfo = function(req, res) {
    console.log("finding college");
    modelMain.findUniversityData(req, res);
};

module.exports.get_overview_cs = function(req, res) {
    sendPage(projectFolerName + 'public/html/overviewCS.html', res);
};

module.exports.get_overview_business = function(req, res) {
    sendPage(projectFolerName + 'public/html/overviewBusiness.html', res);
};

module.exports.get_overview_medicine = function(req, res) {
    sendPage(projectFolerName + 'public/html/overviewMedicine.html', res);
};

module.exports.post_add = function(req, res) {
    modelMain.addUniversityData(req, res);
};

module.exports.post_delete = function(req, res) {
    modelMain.deleteUniversityData(req, res);
};

module.exports.post_update = function(req, res) {
    modelMain.updateUniversityData(req, res);
};

module.exports.post_display = function(req, res) {
    modelMain.displayUniversityData(req, res);
};

module.exports.post_populate = function(req, res) {
    modelMain.populateUniversityData(req, res);
};

module.exports.get_news = function(req, res) {
    sendPage(projectFolerName + 'public/html/news.html', res);
};

module.exports.sendPage = sendPage;

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
