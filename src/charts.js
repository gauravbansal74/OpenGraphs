function basic_line(){

	var _chart = {};
	var _width = 600, _height = 300, 
	_margins = { top: 30, left:30, right:30, bottom:30 },
	_x, _y, 
	_data= [],
	_colors = d3.scale.category10(),
	_svg ,
	_bodyG,
	_line;

	_chart.render = function (){
		if(!_svg){
			_svg = d3.select("#chartbody").append("svg")
					.attr("height", _height)
					.attr("_width", _width);
			renderAxes(_svg);
		}
	};

	_chart.x = function (x) {
        if (!arguments.length) return _x;
        _x = x;
        return _chart;
    };

    _chart.y = function (y) {
        if (!arguments.length) return _y;
        _y = y;
        return _chart;
    };

	function renderAxes(svg){
		var axesG = svg.append("g")
					.attr("class","axes");
		renderXAxis(axesG);
		renderYAxis(axesG);
	};

	function renderXAxis(axesG){
		var xAxis = d3.svg.axis()
					.scale(_x.range([0, quadrantWidth()]))
					.orient("bottom");
		axesG.append("g")
			.attr("class", "x axis")
			.attr("transform", function(){
				return "translate("+xStart()+","+yStart()+")";
			})
			.call(xAxis);

		d3.selectAll("g.x g.tick")
			.append("line")
			.classed("grid-line", true)
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", -quadrantHeight());
	};


	function renderYAxis(axesG){
		var yAxis = d3.svg.axis()
					.scale(_y.range([quadrantHeight(), 0]))
					.orient("left");
		axesG.append("g")
			.attr("class","y axis")
			.attr("transform", function(){
				return "translate("+xStart()+","+yEnd()+")";
			})
			.call(yAxis);
	}

	function xStart() {
	    return _margins.left;
	}

	function yStart() {
	    return _height - _margins.bottom;
	}

	function xEnd() {
	    return _width - _margins.right;
	}

	function yEnd() {
	    return _margins.top;
	}

	function quadrantWidth() {
	    return _width - _margins.left - _margins.right;
	};

	function quadrantHeight() {
        return _height - _margins.top - _margins.bottom;
    }

	return _chart; 

};

