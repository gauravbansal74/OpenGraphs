var _margins = { top: 30, left:30, right:30, bottom:30 },
_width = 600, _height = 300;

function basic_line(){
	var _chart = {};
	var	_x, _y, 
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
			defineBodyClip(_svg);
		}
		renderBody(_svg);
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

	function defineBodyClip(svg){
		var padding =5;
		svg.append("defs")
			.append("clipPath")
			.attr("id", "body-clip")
			.append("rect")
			.attr("x", 0-padding)
			.attr("y", 0)
			.attr("width", quadrantWidth()+2*padding)
			.attr("height", quadrantHeight());
	}

	function renderBody(svg){
		if(!_bodyG){
			_bodyG = svg.append("g")
						.attr("class", "body")
						.attr("transform", "translate("+xStart() + ", "+yEnd()+")")
						.attr("clip-path", "url(#body-clip)");
		}

		renderLines();
		renderDots(); 
	}

	function renderLines(){
		_line = d3.svg.line()
						.x(function(d){ return _x(d.x);})
						.y(function(d){ return _y(d.y)})
		_bodyG.selectAll("path.line")
					.data(data)
					.enter()
					.append("path")
					.style("stroke", function(d, i){
						return _colors(i);
					})
					.attr("class", "line");
		_bodyG.selectAll("path.line")
					.data(data)
					.transition()
					.attr("d", function(d){ return _line(d);})
	}


	function renderDots() {
        _data.forEach(function (list, i) {
            _bodyG.selectAll("circle._" + i) //<-4E
                        .data(list)
                    .enter()
                    .append("circle")
                    .attr("class", "dot _" + i);

            _bodyG.selectAll("circle._" + i)
                    .data(list)                    
                    .style("stroke", function (d) { 
                        return _colors(i); //<-4F
                    })
                    .transition() //<-4G
                    .attr("cx", function (d) { return _x(d.x); })
                    .attr("cy", function (d) { return _y(d.y); })
                    .attr("r", 4.5);
        });
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

    _chart.addSeries = function (series) { // <-1D
        _data.push(series);
        return _chart;
    };

	return _chart; 

};

