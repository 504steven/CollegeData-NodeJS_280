var readline = require('readline');
var fs = require('fs');
var mongo = require("mongodb");
var monk = require("monk");
var main = require('../controllers/cntrlMain');
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype-mongo/' : '';
var db = monk("18.224.102.19:27017/goofyDB");
var university_data_collection = "university_data";
var university_data_summary_collection = "university_data_summary";

module.exports.addUniversityData = function (req, res) {
    var schoolName = req.param('name').toLowerCase();
    db.get(university_data_collection).find({"name": schoolName}, function (err, docs) {
        if (err) {
            console.log("finding data for " + schoolName + ", ERROR: " + err);
            res.send("delete fail");
        } else {
            if (docs.length > 0) {
                console.log(schoolName + " is found");
                res.send("data already exists!");
            } else {
                var u_data = new UniversityData();
                u_data.name = req.param('name').toLowerCase();
                u_data.state = req.param('state').toLowerCase();
                u_data.location = req.param('location').toLowerCase();
                u_data.control = req.param('control').toLowerCase();
                u_data.percent_admittance = req.param('percent_admittance').toLowerCase();
                u_data.percent_enrolled = req.param('percent_enrolled').toLowerCase();
                u_data.no_applicants = req.param('no_applicants').toLowerCase();
                u_data.sat_verbal = req.param('sat_verbal').toLowerCase();
                u_data.sat_math = req.param('sat_math').toLowerCase();
                u_data.expenses = req.param('expenses').toLowerCase();
                u_data.percent_financial_aid = req.param('percent_financial_aid').toLowerCase();
                u_data.male_female_ratio = req.param('male_female_ratio').toLowerCase();
                u_data.academics_scale = req.param('academics_scale').toLowerCase();
                u_data.social_scale = req.param('social_scale').toLowerCase();
                u_data.quality_of_life_scale = req.param('quality_of_life_scale').toLowerCase();
                db.get(university_data_collection).insert(u_data, function (err) {
                    if (err) {
                        console.log("insert data for " + u_data.name + ", ERROR: " + err);
                        res.send("add fail");
                    } else {
                        res.send("add success");
                    }
                });
            }
        }
    });
};

module.exports.deleteUniversityData = function (req, res) {
    var schoolName = req.param('name').toLowerCase();
    db.get(university_data_collection).find({"name": schoolName}, function (err, docs) {
        if (err) {
            console.log("finding data for " + schoolName + ", ERROR: " + err);
            res.send("delete fail");
        } else {
            if (docs.length > 0) {
                db.get(university_data_collection).remove({"name": schoolName}, function (err) {
                    if (err) {
                        console.log("remove data for " + schoolName + ", ERROR: " + err);
                        res.send("delete fail");
                    } else {
                        res.send("delete success");
                    }
                });
            } else {
                console.log(schoolName + " is not found");
                res.send("No data found!");
            }
        }
    });
};

module.exports.updateUniversityData = function (req, res) {
    var schoolName = req.param('name').toLowerCase();
    db.get(university_data_collection).find({"name": schoolName}, function (err, docs) {
        if (err) {
            console.log("finding data for " + schoolName + ", ERROR: " + err);
            res.send("update fail");
        } else {
            if (docs.length > 0) {
                var u_data = new UniversityData();
                u_data.name = req.param('name').toLowerCase();
                if (req.param('state') !== 'No change') {
                    u_data.state = req.param('state').toLowerCase();
                } else {
                    u_data.state = docs[0].state;
                }
                if (req.param('location') !== 'No change') {
                    u_data.location = req.param('location').toLowerCase();
                } else {
                    u_data.location = docs[0].location;
                }
                if (req.param('control') !== 'No change') {
                    u_data.control = req.param('control').toLowerCase();
                } else {
                    u_data.control = docs[0].control;
                }
                if (req.param('percent_admittance') !== 'No change') {
                    u_data.percent_admittance = req.param('percent_admittance').toLowerCase();
                } else {
                    u_data.percent_admittance = docs[0].percent_admittance;
                }
                if (req.param('percent_enrolled') !== 'No change') {
                    u_data.percent_enrolled = req.param('percent_enrolled').toLowerCase();
                } else {
                    u_data.percent_enrolled = docs[0].percent_enrolled;
                }
                if (req.param('no_applicants') !== 'No change') {
                    u_data.no_applicants = req.param('no_applicants').toLowerCase();
                } else {
                    u_data.no_applicants = docs[0].no_applicants;
                }
                if (req.param('sat_verbal') !== 'No change') {
                    u_data.sat_verbal = req.param('sat_verbal').toLowerCase();
                } else {
                    u_data.sat_verbal = docs[0].sat_verbal;
                }
                if (req.param('sat_math') !== 'No change') {
                    u_data.sat_math = req.param('sat_math').toLowerCase();
                } else {
                    u_data.sat_math = docs[0].sat_math;
                }
                if (req.param('expenses') !== 'No change') {
                    u_data.expenses = req.param('expenses').toLowerCase();
                } else {
                    u_data.expenses = docs[0].expenses;
                }
                if (req.param('percent_financial_aid') !== 'No change') {
                    u_data.percent_financial_aid = req.param('percent_financial_aid').toLowerCase();
                } else {
                    u_data.percent_financial_aid = docs[0].percent_financial_aid;
                }
                if (req.param('male_female_ratio') !== 'No change') {
                    u_data.male_female_ratio = req.param('male_female_ratio').toLowerCase();
                } else {
                    u_data.male_female_ratio = docs[0].male_female_ratio;
                }
                if (req.param('academics_scale') !== 'No change') {
                    u_data.academics_scale = req.param('academics_scale').toLowerCase();
                } else {
                    u_data.academics_scale = docs[0].academics_scale;
                }
                if (req.param('social_scale') !== 'No change') {
                    u_data.social_scale = req.param('social_scale').toLowerCase();
                } else {
                    u_data.social_scale = docs[0].social_scale;
                }
                if (req.param('quality_of_life_scale') !== 'No change') {
                    u_data.quality_of_life_scale = req.param('quality_of_life_scale').toLowerCase();
                } else {
                    u_data.quality_of_life_scale = docs[0].quality_of_life_scale;
                }
                db.get(university_data_collection).update({"name": u_data.name}, {$set: u_data}, function (err) {
                    if (err) {
                        console.log("update data for " + u_data.name + ", ERROR: " + err);
                        res.send("update fail");
                    } else {
                        res.send("update success");
                    }
                });
            } else {
                console.log(schoolName + " is not found");
                res.send("No data found!");
            }
        }
    });
};

module.exports.displayUniversityData = function (req, res) {
    var schoolName = req.param('name').toLowerCase();
    db.get(university_data_collection).find({"name": new RegExp(schoolName)}, function (err, docs) {
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
            } else {
                console.log(schoolName + " is not found");
                res.send("No data found!");
            }
        }
    });
};

module.exports.populateUniversityData = function (req, res) {
    readDataFromFile(req.param("fileName"));
    res.send("population complete");
};

module.exports.showAllUniv = function (req, res) {
    db.get(university_data_collection).find({}, {}, function (err, docs) {
        if (err) {
            res.send("display fail");
        } else {
            if (docs.length > 0) {
                res.render('showAllUnivName', {"schoollist": docs});
            } else {
                res.send("No data found!");
            }
        }
    });
};

module.exports.findUniversityData = function (req, res) {
    db.get(university_data_collection).find({}, function (err, docs) {
        if (err) {
            res.send("read database error");
        } else {
            var satMathSum = 0;
            var satVerbalSum = 0;
            var acceptanceSum = 0;
            var expenseSum = 0;
            var maleSum = 0;
            var femaleSum = 0;
            var satMathSize = 0;
            var satVerbalSize = 0;
            var acceptanceSize = 0;
            var expenseSize = 0;
            var maleSize = 0;
            var femaleSize = 0;

            for (var i = 0; i < docs.length; i++) {
                if (parseInt(docs[i].sat_math)) {
                    satMathSize++;
                    satMathSum += parseInt(docs[i].sat_math);
                }
                if (parseInt(docs[i].sat_verbal)) {
                    satVerbalSize++;
                    satVerbalSum += parseInt(docs[i].sat_verbal);
                }
                if (parseInt(docs[i].percent_admittance)) {
                    acceptanceSize++;
                    acceptanceSum += parseInt(docs[i].percent_admittance);
                }
                if (parseInt(docs[i].expenses)) {
                    expenseSize++;
                    expenseSum += parseInt(docs[i].expenses);
                }

                var ratio = docs[i].male_female_ratio;
                if (parseInt(ratio.substring(0, ratio.indexOf(':')))) {
                    var m = parseInt(ratio.substring(0, ratio.indexOf(':')));
                    maleSum += m;
                    maleSize++;
                }
                if (parseInt(ratio.substring(ratio.indexOf(':') + 1))) {
                    var f = parseInt(ratio.substring(ratio.indexOf(':') + 1));
                    femaleSum += f;
                    femaleSize++;
                }
            }

            var satMathAve = satMathSum / satMathSize;
            var satVerbalAve = satVerbalSum / satVerbalSize;
            var acceptanceAve = acceptanceSum / acceptanceSize;
            var expenseAve = expenseSum / expenseSize;
            var maleAve = maleSum / maleSize;
            var femaleAve = femaleSum / femaleSize;

            var schoolName = req.param('schoolName').toLowerCase();
            console.log(schoolName);
            db.get(university_data_collection).find({"name": new RegExp(schoolName)}, function (err, docs) {
                if (err) {
                    console.log("finding data for " + schoolName + ", ERROR: " + err);
                    main.sendPage(projectFolerName + 'public/html/error.html', res);
                } else {
                    if (docs.length > 0) {
                        console.log(" found data: " + docs[0].name);
                        var data = {
                            name: docs[0].name,
                            params: docs[0],
                            satMathAve: satMathAve,
                            satVerbalAve: satVerbalAve,
                            acceptanceAve: acceptanceAve,
                            expenseAve: expenseAve,
                            maleAve: maleAve,
                            femaleAve: femaleAve,
                        };
                        res.render('searchUniversityInfo', data);
                    } else {
                        console.log(schoolName + " is not found");
                        main.sendPage(projectFolerName + 'public/html/error.html', res);
                    }
                }
            });
        }
    });
};

module.exports.post_detailedUniversityData = function (req, res) {
    var schoolName = req.param('schoolName').toLowerCase();
    console.log(schoolName);
    db.get(university_data_collection).find({"name": new RegExp(schoolName)}, function (err, docs) {
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
                res.render('moreUniversityInfo', data);
            } else {
                console.log(schoolName + " is not found");
                main.sendPage(projectFolerName + 'public/html/error.html', res);
            }
        }
    });
};

module.exports.readDataFromFile = readDataFromFile;

function readDataFromFile() {
    var fName = "university.data";
    console.log("load university dataset to db");
    db.get(university_data_collection).drop();
    var filename = projectFolerName + "public/dataset/" + fName;
    var readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });
    //readInterface is async
    var u_data;
    var count = 0;
    db.get(university_data_collection).createIndex({name: 1}, {unique: true});
    db.get(university_data_collection).createIndex({state: 1});
    readInterface.on('line', function (line) {
        line = line.trim();
        var s = line.indexOf("(def_");
        var e = line.indexOf("))");
        var strArr = line.split(" ");

        if (e >= 0) {
            console.log(++count);
            // console.log(u_data.name);
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
                case "(location":
                    u_data.location = strArr[1].slice(0, strArr[1].length - 1).toLowerCase();
                    break;
                case "(control":
                    u_data.control = strArr[1].slice(0, strArr[1].length - 1).toLowerCase();
                    break;
                case "(male:female":
                    u_data.male_female_ratio = strArr[1].substring(6, strArr[1].length - 1);
                    break;
                case "(sat":
                    if (strArr[1] === "verbal") {
                        u_data.sat_verbal = getNum(strArr[2]);
                    }
                    if (strArr[1] === "math") {
                        u_data.sat_math = getNum(strArr[2]);
                    }
                    break;
                case "(expenses":
                    u_data.expenses = (getNum(strArr[1]) * 1000).toString();
                    break;
                case "(percent_financial_aid":
                    u_data.percent_financial_aid = strArr[1].slice(0, strArr[1].length - 1);
                    break;
                case "(no_applicants":
                    u_data.no_applicants = (getNum(strArr[1]) * 1000).toString();
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
}

module.exports.getSummarizeData = getSummarizeData;

function getSummarizeData(req, res) {
    db.get(university_data_summary_collection).find({}, function (err, docs) {
        if (err) {
            console.log("summarized data reading error :" + err);
        } else {
            res.json(docs[0]);
        }
    });
}

module.exports.get_universityInfo = getUniversityInfo;

function getUniversityInfo(req, res) {
    var schoolName = req.param('schoolName').toLowerCase();
    db.get('university_data').find({"name": new RegExp(schoolName)}, function (err, docs) {
        if (err) {
            console.log("university data searching error:" + err);
        } else {
            res.json(docs[0]);
        }
    });
}

module.exports.summarizeData = summarizeData;

function summarizeData() {
    var public_urban = [0, 0];  // ct, total
    var public_suburban = [0, 0];
    var public_smallCity = [0, 0];
    var public_smallTown = [0, 0];
    var private_urban = [0, 0];
    var private_suburban = [0, 0];
    var private_smallCity = [0, 0];
    var private_smallTown = [0, 0];

    db.get(university_data_collection).find({}, function (err, docs) {
        if (err) {
            console.log("summarize data, ERROR: " + err);
        } else {
            docs.forEach(function (doc) {
                if (doc.control == "state") {
                    switch (doc.location) {
                        case "urban" :
                            public_urban[0]++;
                            public_urban[1] += doc.expenses;
                            // console.log(public_urban[1]);
                            break;
                        case "suburban" :
                            public_suburban[0]++;
                            public_suburban[1] += doc.expenses;
                            break;
                        case "small_city" :
                            public_smallCity[0]++;
                            public_smallCity[1] += doc.expenses;
                            break;
                        case "small_town" :
                            public_smallTown[0]++;
                            public_smallTown[1] += doc.expenses;
                            break;
                        default:
                    }
                } else {
                    switch (doc.location) {
                        case "urban" :
                            private_urban[0]++;
                            private_urban[1] += doc.expenses;
                            break;
                        case "suburban" :
                            private_suburban[0]++;
                            private_suburban[1] += doc.expenses;
                            break;
                        case "small_city" :
                            private_smallCity[0]++;
                            private_smallCity[1] += doc.expenses;
                            break;
                        case "small_town" :
                            private_smallTown[0]++;
                            private_smallTown[1] += doc.expenses;
                            break;
                        default:
                    }
                }
            });
        }
        insertSummariedData();
    });

    function insertSummariedData() {
        var public_urban_ave = public_urban[1] / public_urban[0];
        var public_suburban_ave = public_suburban[1] / public_suburban[0];
        var public_smallTown_ave = public_smallTown[1] / public_smallTown[0];
        var public_smallCity_ave = public_smallCity[1] / public_smallCity[0];

        var private_urban_ave = private_urban[1] / private_urban[0];
        var private_suburban_ave = private_suburban[1] / private_suburban[0];
        var private_smallTown_ave = private_smallTown[1] / private_smallTown[0];
        var private_smallCity_ave = private_smallCity[1] / private_smallCity[0];

        // console.log(public_urban_ave, public_urban[0], public_urban[1]);

        db.get(university_data_summary_collection).insert(
            {
                public_urban_count: public_urban[0], public_urban_ave: public_urban_ave,
                public_suburban_count: public_suburban[0], public_suburban_ave: public_suburban_ave,
                public_smallCity_count: public_smallCity[0], public_smallCity_ave: public_smallCity_ave,
                public_smallTown_count: public_smallTown[0], public_smallTown_ave: public_smallTown_ave,

                private_urban_count: private_urban[0], private_urban_ave: private_urban_ave,
                private_suburban_count: private_suburban[0], private_suburban_ave: private_suburban_ave,
                private_smallCity_count: private_smallCity[0], private_smallCity_ave: private_smallCity_ave,
                private_smallTown_count: private_smallTown[0], private_smallTown_ave: private_smallTown_ave
            },
            function (err) {
                if (err) console.log("summarized data insert error :" + err);
            });
    }
}

// module.exports.getNum = getNum;

function getNum(exp) {
    return exp.match(/\d+/)[0];
}

function UniversityData() {
    var name;   //def-instance
    var state;
    var control;
    var location;
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
