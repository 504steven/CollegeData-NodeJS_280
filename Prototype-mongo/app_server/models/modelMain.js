var readline = require('readline');
var fs = require('fs');
var isWin = process.platform === 'win32';
var projectFolerName = isWin ? 'Prototype-mongo/' : '';

// var mongo = require("mongodb");
var monk = require("monk");
var db = monk("localhost:27017/goofyDB");
// module.exports

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

module.exports.readDataFromFile = function () {
    var filename = projectFolerName + "university.data";
    var readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });

    //readInterface is async
    var u_data;
    readInterface.on('line', function(line) {
        line = line.trim();
        var s = line.indexOf("(def_");
        var e = line.indexOf("))");
        var strArr = line.split(" ");

        if(e >= 0) {
            // console.log(u_data.toString());
            db.get("university_data").insert( u_data, function (err, docs) {
                if(err) { console.log("read data from file ERROR: " + err)}
            });
        }else if(s >= 0) {
            u_data = new UniversityData();
            u_data.name = strArr[strArr.length-1].toLowerCase();
        }else {
            switch(strArr[0]) {
                case "(state":
                    u_data.state = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(male:female":
                    // console.log(strArr.toString());
                    // var ratioDataArr = strArr[1].split(":", 2);
                    // console.log(ratioDataArr.toString());
                    u_data.male_female_ratio = strArr[1].substring(6, strArr[1].length-1);
                    break;
                case "(sat":
                    if(strArr[1] === "verbal") { u_data.sat_verbal = strArr[2].slice(0, strArr[2].length-1);  }
                    if(strArr[1] === "math") {  u_data.sat_math = strArr[2].slice(0, strArr[2].length-1);   }
                    break;
                case "(expenses":
                    u_data.expenses = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(percent_financial_aid":
                    u_data.percent_financial_aid = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(no_applicants":
                    u_data.no_applicants = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(percent_admittance":
                    u_data.percent_admittance = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(percent_enrolled":
                    u_data.percent_enrolled = strArr[1].slice(0, strArr[1].length-1);
                    break;
                case "(academics":
                    u_data.academics_scale = strArr[2].slice(0, strArr[2].length-1);
                    break;
                case "(social":
                    u_data.social_scale = strArr[2].slice(0, strArr[2].length-1);
                    break;
                case "(quality_of_life":
                    u_data.quality_of_life_scale = strArr[2].slice(0, strArr[2].length-1);
                    break;
                default:
            }
        }
    });
}