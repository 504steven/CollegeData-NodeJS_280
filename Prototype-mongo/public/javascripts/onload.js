$(initAll);

var imageNum = 1;
var drawPosition = 0;
var l2r = true;

function initAll() {
    // set theme
    // $(":header").addClass("ui-widget-header");

    // ajax html template
    $("#footerDiv").load("/html/footer.html");

    // dropdown menu init
    dropDownMenu();

    // rolling image animation init
    window.setInterval("changeImg()", 1200);

    // canvas init and canvas animation init
    // drawSmilingFace();
     window.setInterval(drawWelcome, 50);

    // build resizable and draggable searching form
    $("#searchForm").resizable();
    $("#searchForm").draggable();

    // build draggable and droppable object
    // $("#draggableObject1").draggable();
    // $("#draggableObject2").draggable();
    // $("#droppbleObject").droppable();
    // $("#droppbleObject").bind("drop", highlightTarget);
    // $("#droppbleObject").bind("dropout", resetTarget);

    // build sortable tab
    $("#sortableLoginTab").sortable();
    $("#sortableUniversityList").sortable();

    // build ajax tab
    $("#loginTab").tabs();
    $("#adminTab").tabs();

    // build dialog widget
    $("#dialog").dialog();
    $("#dialog").dialog("close");

    //google chart for dashboard
    drawChart1();
    drawChart3();
    drawChart4();
    google.charts.load('current', {packages: ['corechart','bar']});
    google.charts.setOnLoadCallback(drawChart2);
}

function dropDownMenu() {
    var allLinks = document.getElementsByTagName("a");
    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].className == "menuLink") {
            allLinks[i].onmouseover = toggleMenu;
            allLinks[i].onclick = clickHandler;
        }
    }
}

function clickHandler(event) {
    event.preventDefault();
}

function toggleMenu() {
    var startMenu = this.href.lastIndexOf("/") + 1;
    var stopMenu = this.href.lastIndexOf(".");
    var thisMenuName = this.href.substring(startMenu, stopMenu);
    var menuParent = document.getElementById(thisMenuName).parentNode;
    var thisMenuStyle = document.getElementById(thisMenuName).style;

    thisMenuStyle.display = "block";

    menuParent.onmouseout = function() {
        thisMenuStyle.display = "none";
    };

    menuParent.onmouseover = function() {
        thisMenuStyle.display = "block";
    };
}

function changeImg() {
    imageNum++;
    if (imageNum > 3) {
        imageNum = 1;
    }
    var img = document.getElementById("rollingImage");
    img.src = "/img/" + imageNum + ".jpg";
}

function drawWelcome() {
    if (!document.getElementById('canvasWelcome')) {
        return;
    }
    var canvas = document.getElementById("canvasWelcome");
    var c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.font = "25px Verdana";
    var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    c.fillStyle = gradient;
    if (drawPosition > canvas.width/2) {
        l2r = false;
    }else if(drawPosition == 0) {
        l2r = true;
    }
    if(l2r) {
        drawPosition++;
    }else {
        drawPosition--;
    }

    c.fillText('Welcome User!', drawPosition, 25);
}

function drawSmilingFace() {
    if (!document.getElementById('canvasSmilingFace')) {
        return;
    }
    var canvas = document.getElementById('canvasSmilingFace');
    var con = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 12;
    var eyeRadius = 2;
    var eyeXOffset = 4;
    var eyeYOffset = 3;

    // draw face circle
    con.beginPath();
    con.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    con.fillStyle = 'yellow';
    con.fill();
    con.lineWidth = 1;
    con.strokeStyle = 'black';
    con.stroke();

    var eyeY = centerY - eyeYOffset;
    // draw left eye
    con.beginPath();
    var eyeX1 = centerX - eyeXOffset;
    con.arc(eyeX1, eyeY, eyeRadius, 0, Math.PI, true);
    con.stroke();
    // draw right eye
    con.beginPath();
    var eyeX2 = centerX + eyeXOffset;
    con.arc(eyeX2, eyeY, eyeRadius, 0, Math.PI, true);
    con.stroke();
    // draw the mouth
    con.beginPath();
    con.arc(centerX, centerY * 1.15, 5.5, 0.1 * Math.PI, 0.9 * Math.PI, false);
    con.stroke();
}

function inputValidate() {
    var schoolName = document.getElementById("schoolName").value;
    var error = "";
    if (schoolName == "") {
        error = "Missing University Name\n";
        alert(error);
        return false;
    }
    // has to be letter or space
    var schoolNameRE = /^[a-zA-Z\s_&]+$/;
    if (!schoolName.match(schoolNameRE)) {
        error = "Invalid University Name\n";
        alert(error);
        return false;
    }
    return true;
}

function openDialog() {
    $("#dialog").dialog("open");
}

function closeDialog() {
    $("#dialog").dialog("close");
}

function highlightTarget(event, ui) {
    $("#droppbleObject").addClass("ui-state-highlight").html("Selected").append(ui.draggable.text());
}

function resetTarget(event, ui) {
    $("#droppbleObject").removeClass("ui-state-highlight").html("Select Gender");
}

function drawChart1() {
    var url = "http://localhost:3000/aveExpense";
    var doc = [];
    $.get(url, function (data, status) {
        if (status != 'success') {
            console.log("get summarized data failed :" + status);
        } else {
            console.log("get summarized data :" + status);
            doc = data;
            google.charts.load('current', {'packages': ['bar']});
            // $.get() is async, must setOnLoadCallback here, or the doc[] can be empty.
            google.charts.setOnLoadCallback(function () {
                var data = google.visualization.arrayToDataTable([
                    ['Location', 'Public', 'Private'],
                    ['urban', doc.public_urban_ave, doc.private_urban_ave],
                    ['suburban', doc.public_suburban_ave, doc.private_suburban_ave],
                    ['small town', doc.public_smallTown_ave, doc.private_smallTown_ave],
                    ['small city', doc.public_smallCity_ave, doc.private_smallCity_ave]
                ]);
                var options = {
                    chart: {
                        title: 'Average Expense($) for 164 College/University',
                        subtitle: 'Expense is majored affected by ownership, not locations.',
                    },
                    bars: 'vertical',
                    vAxis: {format: 'decimal'},
                    height: 280,
                    width: 580,
                    // colors: ['#d95f02', '#7570b3'],
                    colors: ['#88B972', '#2B4520'],
                    backgroundColor: {
                        fill: '#EEEEEE',
                        fillOpacity: 0.7
                    }
                };
                var chart = new google.charts.Bar(document.getElementById('chart1'));
                chart.draw(data, google.charts.Bar.convertOptions(options));
            });
        }
    });
}

function drawChart2() {
    // Define the chart to be drawn.
    var data = google.visualization.arrayToDataTable([
        ['university', 'Acceptance Rate %', {role: 'style'}],
        ['Stanford', 4.8, '#2B4520'],
        ['Harvard', 5.4, '#2B4520'],
        ['Yale', 6.3, '#2B4520'],
        ['Princeton', 6.5, '#2B4520'],
        ['Columbia', 6.8, '#2B4520'],
        // ['MIT', 7.9],
        //  ['public university'],
        ['UC Berkeley', 16.9, '#88B972'],
        ['UCLA', 18, '#88B972'],
        ['Georgia Tech', 25.8, '#88B972'],
        ['UNC', 26.9, '#88B972'],
        ['Michigan', 28.6, '#88B972'],
        //   ['UVA', 29.9],
        //  ['UCSD', 35.7]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            format: 'percent',
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        title: 'Universities with Lowest Acceptance Rate %',
        chartArea: {width: '50%', height: '70%'},
        // colors: ['#88B972', '#2B4520'],
        //  displayAnnotations: true,
        annotations: {
            textStyle: {fontSize: 11},
        },
        hAxis: {
            // title: 'Acceptance Rate',
            minValue: 0,
            // format: 'percent'
            gridlines: {
                count: 0
            },
            textPosition: 'none'
        },
        vAxis: {
            title: 'Public v.s. Private',
        },
        height: 280,
        width: 580,
        backgroundColor: {
            fill: '#EEEEEE',
            fillOpacity: 0.7
        },
        bar: {groupWidth: "65%"},
        legend: {position: 'none'},
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.BarChart(document.getElementById('chart2'));
    chart.draw(view, options);
}

function drawChart3() {
    var doc = [];
    var schoolNames = ['IllinoisTech', 'GeorgiaTech', 'MIT', 'harvard', 'Carnegie_Mellon', 'stanford', 'UC_berkeley', 'Yale', 'BENNINGTON', 'LESLEY'];
    for (var i = 0; i < schoolNames.length; i++) {
        $.ajax({
            async: false,
            type: 'GET',
            url: "http://localhost:3000/universityInfo?schoolName=" + schoolNames[i],
            success: function (data, status) {
                if (status != 'success') {
                    console.log("get university data failed :" + status);
                } else {
                    console.log("get university data :" + status);
                    doc[i] = {name: data.name, ratio: data.male_female_ratio};
                }
            }
        });
    }
    var input = [['Name', 'Male', 'Female', {role: 'annotation'}]];
    for (var i = 0; i < doc.length; i++) {
        var m = parseInt(doc[i].ratio.substring(0, doc[i].ratio.indexOf(':')));
        var f = parseInt(doc[i].ratio.substring(doc[i].ratio.indexOf(':') + 1));
        var mp = m / (m + f) * 100;
        var fp = f / (m + f) * 100;
        input.push([doc[i].name, mp, fp, '']);
    }
    google.charts.load('current', {'packages': ['bar']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable(input);
        var options = {
            chart: {
                title: 'University Male/Female Ratio'
            },
            annotations: {
                textStyle: {fontSize: 11},
            },
            hAxis: {
                title: 'Gender Ratio (%)',
                gridlines: {
                    count: 3
                },
            },
            vAxis: {
                title: 'University',
            },
            height: 300,
            width: 580,
            legend: { position: 'top', maxLines: 3 },
            bar: {groupWidth: "60%"},
            bars: 'horizontal',
            colors: ['#2B4520'],
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            },
            isStacked: true
        };
        var chart = new google.charts.Bar(document.getElementById('chart3'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    });
}

function drawChart4() {
    var doc = [];
    var schoolNames = ['IllinoisTech', 'GeorgiaTech', 'MIT', 'harvard', 'Carnegie_Mellon', 'stanford', 'UC_berkeley', 'Yale', 'BENNINGTON', 'LESLEY'];
    for (var i = 0; i < schoolNames.length; i++) {
        $.ajax({
            async: false,
            type: 'GET',
            url: "http://localhost:3000/universityInfo?schoolName=" + schoolNames[i],
            success: function (data, status) {
                if (status != 'success') {
                    console.log("get university data failed :" + status);
                } else {
                    console.log("get university data :" + status);
                    doc[i] = {name: data.name, ratio: data.male_female_ratio};
                }
            }
        });
    }
    var input = [['Name', 'Male', 'Female', {role: 'annotation'}]];
    for (var i = 0; i < doc.length; i++) {
        var m = parseInt(doc[i].ratio.substring(0, doc[i].ratio.indexOf(':')));
        var f = parseInt(doc[i].ratio.substring(doc[i].ratio.indexOf(':') + 1));
        input.push([doc[i].name, m, f, '']);
    }
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function () {
        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Work',     11],
            ['Eat',      2],
            ['Commute',  2],
            ['Watch TV', 2],
            ['Sleep',    7]
        ]);
        var options = {
            title: 'My Daily Activities',
            height: 300,
            width: 580,
            backgroundColor: {
                fill: '#EEEEEE',
                fillOpacity: 0.7
            }
        };
        var chart = new google.visualization.PieChart(document.getElementById('chart4'));
        chart.draw(data, options);
    });
}
