var readline = require('readline');
var fs = require('fs');
var mongo = require("mongodb");
var monk = require("monk");
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype-mongo/' : '';
var db = monk("18.224.102.19:27017/goofyDB");
var university_data_collection = "university_data";

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

module.exports.addUniversityData = addUniversityData;

function addUniversityData(req, res) {
    var u_data = getUniversityData(req);
    db.get(university_data_collection).insert(u_data, function (err) {
        if (err) {
            console.log("insert data for " + u_data.name + ", ERROR: " + err);
        } else {
            console.log("added data : " + u_data.name);
            sendPage(projectFolerName + 'public/html/home.html', res);
        }
    });
}

module.exports.updateUniversityData = updateUniversityData;

function updateUniversityData(req, res) {
    var u_data = getUniversityData(req);
    db.get(university_data_collection).update({"name": u_data.name}, {$set: u_data}, function (err) {
        if (err) {
            console.log("update data for " + u_data.name + ", ERROR: " + err);
        } else {
            console.log("updated data : " + u_data.name);
            sendPage(projectFolerName + 'public/html/home.html', res);
        }
    });
}

module.exports.findUniversityData = findUniversityData;

function findUniversityData(req, res) {
    var u_name = req.body.universityName;
    console.log(u_name);
    db.get(university_data_collection).find({"name": u_name}, function(err, docs) {
        if (err) {
            console.log("finding data for " + u_name + ", ERROR: " + err);
        } else {
            if(docs.length > 0) {
                console.log(" found data: " + docs[0].name);
                var data = {
                    name: docs[0].name,
                    params: docs[0]
                };
                res.render('universityInfo', data);
            }else {
                console.log( u_name + " is not found");
                sendPage(projectFolerName + 'public/html/error.html', res);
            }

        }
    });
}

module.exports.deleteUniversityData = deleteUniversityData;

function deleteUniversityData(req, res) {
    var u_name = req.body.name;
    db.get(university_data_collection).remove({"name": u_name}, function (err) {
        if (err) {
            console.log("remove data for " + u_name + ", ERROR: " + err);
        } else {
            console.log("deleted data : " + u_name);
            sendPage(projectFolerName + 'public/html/home.html', res);
        }
    });
}

function getUniversityData(req) {
    var u_data = new UniversityData();
    // u_data._id = req.body._id;
    u_data.name = req.body.name;
    u_data.state = req.body.state;
    u_data.percent_admittance = req.body.percent_admittance;
    u_data.percent_enrolled = req.body.percent_enrolled;
    u_data.no_applicants = req.body.no_applicants;
    u_data.sat_verbal = req.body.sat_verbal;
    u_data.sat_math = req.body.sat_math;
    u_data.expenses = req.body.expenses;
    u_data.percent_financial_aid = req.body.percent_financial_aid;
    u_data.male_female_ratio = req.body.male_female_ratio;
    u_data.academics_scale = req.body.academics_scale;
    u_data.social_scale = req.body.social_scale;
    u_data.quality_of_life_scale = req.body.quality_of_life_scale;
    return u_data;
}

module.exports.readDataFromFile = function() {
    console.log("load university dataset to db");
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

module.exports.test = function() {
    var req = {};
    req.body = {};
    // req.body._id;
    req.body.universityName = "dumy";
    // req.body.universityState = "ssss";
    // req.body.universityAdmit = "admit";
    // req.body.universityEnroll = "enrollrate";
    // req.body.universityApp = "applicants";
    // req.body.universitySatVerbal = "verb";
    // req.body.universitySatMath = "math";
    //
    // req.body.universityExpense = "expense";
    // req.body.universityFinancialAid = "aid";
    // req.body.universityRatio = "ratio";
    // req.body.universityAcademics = "academics";
    // req.body.universitySocial = "socail";
    // req.body.universityQuality = "quality";
    console.log("run test:")
    // addUniversityData(req, null);
    // updateUniversityData(req, null);
    // findUniversityData(req, null);
    deleteUniversityData(req, null);
};
