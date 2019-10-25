var readline = require('readline');
var fs = require('fs');
var mongo = require("mongodb");
var monk = require("monk");
var main = require('../controllers/main');
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype-mongo/' : '';
var db = monk("18.224.102.19:27017/goofyDB");
var university_data_collection = "university_data";

module.exports.addUniversityData = function(req, res) {
    var u_data = new UniversityData();
    u_data.name = req.param('name');
    u_data.state = req.param('state');
    u_data.percent_admittance = req.param('percent_admittance');
    u_data.percent_enrolled = req.param('percent_enrolled');
    u_data.no_applicants = req.param('no_applicants');
    u_data.sat_verbal = req.param('sat_verbal');
    u_data.sat_math = req.param('sat_math');
    u_data.expenses = req.param('expenses');
    u_data.percent_financial_aid = req.param('percent_financial_aid');
    u_data.male_female_ratio = req.param('male_female_ratio');
    u_data.academics_scale = req.param('academics_scale');
    u_data.social_scale = req.param('social_scale');
    u_data.quality_of_life_scale = req.param('quality_of_life_scale');
    db.get(university_data_collection).insert(u_data, function(err) {
        if (err) {
            console.log("insert data for " + u_data.name + ", ERROR: " + err);
            res.send("add fail");
        } else {
            res.send("add success");
        }
    });
};

module.exports.deleteUniversityData = function(req, res) {
    var schoolName = req.param('schoolName');
    db.get(university_data_collection).remove({"name": schoolName}, function(err) {
        if (err) {
            console.log("remove data for " + schoolName + ", ERROR: " + err);
            res.send("delete fail");
        } else {
            res.send("delete success");
        }
    });
};

module.exports.updateUniversityData = function(req, res) {
    var u_data = new UniversityData();
    u_data.name = req.param('name');
    u_data.state = req.param('state');
    u_data.percent_admittance = req.param('percent_admittance');
    u_data.percent_enrolled = req.param('percent_enrolled');
    u_data.no_applicants = req.param('no_applicants');
    u_data.sat_verbal = req.param('sat_verbal');
    u_data.sat_math = req.param('sat_math');
    u_data.expenses = req.param('expenses');
    u_data.percent_financial_aid = req.param('percent_financial_aid');
    u_data.male_female_ratio = req.param('male_female_ratio');
    u_data.academics_scale = req.param('academics_scale');
    u_data.social_scale = req.param('social_scale');
    u_data.quality_of_life_scale = req.param('quality_of_life_scale');
    db.get(university_data_collection).update({"name": u_data.name}, {$set: u_data}, function (err) {
        if (err) {
            console.log("update data for " + u_data.name + ", ERROR: " + err);
            res.send("update fail");
        } else {
            res.send("update success");
        }
    });
};

module.exports.displayUniversityData = function(req, res) {
    var schoolName = req.param('schoolName');
    console.log(schoolName);
    db.get(university_data_collection).find({"name": schoolName}, function(err, docs) {
        if (err) {
            console.log("finding data for " + schoolName + ", ERROR: " + err);
            res.send("display fail");
        } else {
            if (docs.length > 0) {
                console.log(" found data: " + docs[0].name);
                var data = {
                    name: docs[0].name,
                    params: docs[0]
                };
                res.render('displayUniversityInfo', data);
                console.log("here");
            } else {
                console.log(schoolName + " is not found");
                res.send("No data found!");
            }

        }
    });
};

module.exports.findUniversityData = function(req, res) {
    var schoolName = req.param('schoolName');
    console.log(schoolName);
    db.get(university_data_collection).find({"name": schoolName}, function(err, docs) {
        if (err) {
            console.log("finding data for " + schoolName + ", ERROR: " + err);
            main.sendPage(projectFolerName + 'public/html/error.html', res);
        } else {
            if (docs.length > 0) {
                console.log(" found data: " + docs[0].name);
                var data = {
                    name: docs[0].name,
                    params: docs[0]
                };
                res.render('searchUniversityInfo', data);
            } else {
                console.log(schoolName + " is not found");
                main.sendPage(projectFolerName + 'public/html/error.html', res);
            }

        }
    });
};

module.exports.readDataFromFile = function() {
    console.log("load university dataset to db");
    db.get(university_data_collection).drop();
    var filename = projectFolerName + "public/dataset/university.data";
    var readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });
    //readInterface is async
    var u_data;
    var count = 0;
    db.get(university_data_collection).createIndex({name: 1}, {unique: true});
    readInterface.on('line', function (line) {
        line = line.trim();
        var s = line.indexOf("(def_");
        var e = line.indexOf("))");
        var strArr = line.split(" ");

        if (e >= 0) {
            console.log(++count);
            db.get(university_data_collection).insert(u_data, function (err, docs) {
                if (err) {
                    console.log("read data from file ERROR: " + err)
                }
            });
        } else if (s >= 0) {
            u_data = new UniversityData();
            u_data.name = strArr[strArr.length - 1].toLowerCase();
        } else {
            switch (strArr[0]) {
                case "(state":
                    u_data.state = strArr[1].slice(0, strArr[1].length - 1).toLowerCase();
                    break;
                case "(male:female":
                    // console.log(strArr.toString());
                    // var ratioDataArr = strArr[1].split(":", 2);
                    // console.log(ratioDataArr.toString());
                    u_data.male_female_ratio = strArr[1].substring(6, strArr[1].length - 1);
                    break;
                case "(sat":
                    if (strArr[1] === "verbal") {
                        u_data.sat_verbal = strArr[2].slice(0, strArr[2].length - 1);
                    }
                    if (strArr[1] === "math") {
                        u_data.sat_math = strArr[2].slice(0, strArr[2].length - 1);
                    }
                    break;
                case "(expenses":
                    u_data.expenses = strArr[1].slice(0, strArr[1].length - 1).toLowerCase();
                    break;
                case "(percent_financial_aid":
                    u_data.percent_financial_aid = strArr[1].slice(0, strArr[1].length - 1);
                    break;
                case "(no_applicants":
                    u_data.no_applicants = strArr[1].slice(0, strArr[1].length - 1).toLowerCase();
                    break;
                case "(percent_admittance":
                    u_data.percent_admittance = strArr[1].slice(0, strArr[1].length - 1);
                    break;
                case "(percent_enrolled":
                    u_data.percent_enrolled = strArr[1].slice(0, strArr[1].length - 1);
                    break;
                case "(academics":
                    u_data.academics_scale = strArr[2].slice(0, strArr[2].length - 1);
                    break;
                case "(social":
                    u_data.social_scale = strArr[2].slice(0, strArr[2].length - 1);
                    break;
                case "(quality_of_life":
                    u_data.quality_of_life_scale = strArr[2].slice(0, strArr[2].length - 1);
                    break;
                default:
            }
        }
    });
};

function UniversityData() {
    var name;   //def-instance
    var state;
    var percent_admittance;
    var percent_enrolled;
    var no_applicants;
    var sat_verbal;
    var sat_math;
    var expenses;    // per semester
    var percent_financial_aid;
    var male_female_ratio;
    var academics_scale;   // 1-5
    var social_scale; //1-5
    var quality_of_life_scale; //1-5
}
