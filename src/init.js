function getChartType(chartType){
	console.log();
	switch(chartType){
		case 'basic_line':
			var chart = basic_line()
							.x(d3.scale.linear().domain([0, 10]))
        					.y(d3.scale.linear().domain([0, 10]));
			chart.render();
			break;
	}
}