var numberOfSeries = 2,
    numberOfDataPoint = 11,
    data = [];

 for (var i = 0; i < numberOfSeries; ++i)
    data.push(d3.range(numberOfDataPoint).map(function (i) {
        return {x: i, y: randomData()};
    }));

function getChartType(chartType){
	console.log();
	switch(chartType){
		case 'basic_line':
			var chart = basic_line()
							.x(d3.scale.linear().domain([0, 10]))
        					.y(d3.scale.linear().domain([0, 10]));
        					data.forEach(function (series) {
							    chart.addSeries(series);
							});
							chart.render();
			break;
	}
}

function randomData() {
    return Math.random() * 9;
}

function update() {
    for (var i = 0; i < data.length; ++i) {
        var series = data[i];
        series.length = 0;
        for (var j = 0; j < numberOfDataPoint; ++j)
            series.push({x: j, y: randomData()});
    }

    chart.render();
}

