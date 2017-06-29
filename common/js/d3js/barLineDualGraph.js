function barLineDualGraph(cmargin) {
	
	var settings = {
		chartContainerClass: ".chart-container.crsc",
		selectedRegion : "misc",
		selectedCoverage : "Surplus",
		selectedCoverage2 : "Combined Ratio - US Total P/C Industry",
		chartType : "line", // options: bar, line
		tickCount : "8",
		leftYaxisLabel:"leftYaxisLabel",	
		rightYaxisLabel:"rightYaxisLabel",	
		bottomXaxisLabel:"bottomXaxisLabel",	
		breakout: "single" // options: single, multi
	};	

	var chartContainer = d3.select(settings.chartContainerClass).html('');	

	if (cmargin !== undefined) {
		var margin = {
			top:cmargin.bar.top,
			left:cmargin.bar.left,
			right:cmargin.bar.right,
			bottom:cmargin.bar.bottom
		};
	} else {
		var margin = {
			top:20,
			left:40,
			right:40,
			bottom:80
		};
	}

	var w = chartContainer.node().clientWidth - margin.left - margin.right,
			h = 500 - margin.top - margin.bottom;

	d3.queue()
		.defer(d3.csv, "common/data/gimi-update.csv")
		.await(ready);

	function ready(error, data, word) {
		if (error) throw "error: not loading data, bro";	
		
		data.forEach(function(d){
			// check data for characters and remove
			var char = "$";			
			if (d.value.indexOf(char) == 0) {
				d.value = d.value.replace(char,"");
			}
			d.value = parseFloat(d.value);				
			d.qYear = d.quarter + " " + d.year;
		});	
				
		// console.log(data);

		// region = misc
		var dbRegion = data.filter(function(d){
			return d.region === settings.selectedRegion;
		});
		
		var dbRegionAndCoverage = data.filter(function(d){
			return d.region === settings.selectedRegion && d.coverage === settings.selectedCoverage;
		});

		var dbRegionAndSurplus2 = data.filter(function(d){
			return d.region === settings.selectedRegion && d.coverage === settings.selectedCoverage2;
		});
		
		// region = misc
		var nestByCoverage = d3.nest()  	
		.key(function(d) { return d.coverage; })			
		.entries(dbRegion);		

	
		nestByCoverage = nestByCoverage.filter(function(d){
			return d.key === settings.selectedCoverage;
		});		

		////////////////////////////
		//// Line Scales & Axis ////
		////////////////////////////


		// http://bl.ocks.org/jfreyre/b1882159636cc9e1283a

		var threshold = d3.scaleThreshold()
			.domain([93,94,95,96,97,98,99,100,101,102])
			.range(["#1D6581","#0B80AC","#149ABA","#54C1DC","#8DD9EA","#D1DFD4","#EDDDBE","#FED48E","#FEB328","#DF9B17","#BC862B"]);



		var xscale = d3.scaleBand()
			.rangeRound([10,w])
			.domain(dbRegion.map(function(d) { return d.qYear; }))
			.paddingInner(0.15);

		var yscale = d3.scaleLinear()
			.domain([500, d3.max(dbRegionAndCoverage, function(d){ return d.value;})])
			.range([h,0]);					

		var xaxis = d3.axisBottom(xscale);

		var yaxis = d3.axisLeft()
			.scale(yscale)
			.ticks(settings.tickCount)
			.tickFormat(d3.format(""))
			.tickSize(-w);

		///////////////////////////
		//// Bar Scales & Axis ////
		///////////////////////////

		var yscale2 = d3.scaleLinear()
			.domain([0, 120])
			.range([h,0]);

		var yaxis2 = d3.axisRight()
			.scale(yscale2)
			.ticks(5)
			.tickFormat(d3.format(""))
			.tickSize(w);

		////////////////
		//// Append ////
		////////////////

		var divs = chartContainer.html("").selectAll(".cov-div")
			.data(nestByCoverage)
			.enter()
			.append("div.cov-div")
			.classed("comp-surplus",true);

		var covSvg = divs				
			.append("svg")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.append("g.wrap")
			.translate([margin.left,margin.top]);

		covSvg.append("g.x-axis")
			.call(xaxis)
			.attr("transform","translate(0," + (h+10) + ")");
		
		covSvg.append("g.y-axis")
			.call(yaxis);	

		covSvg.append("g.y-axis-two")
			.call(yaxis2);

		// position x axis ticks
		divs
			.selectAll(".x-axis .tick text").attr("dy",-5);

		d3.selectAll(".tick").each(function() {
			  if(+this.textContent == 1) {
			  	this.classList.add("zilch");
			  }
			});

		//////////////
		//// Bars ////
		//////////////
		
		var gRects = covSvg.selectAll(".g-comp-rect-surplus")
			.data(dbRegionAndSurplus2)
			.enter()
			.append("g.g-comp-rect-surplus");			

		gRects
			.append("rect.comp-rect-surplus")
			.attr("x",function(d){				
				return xscale(d.qYear);
			})
			.attr("y",function(d){
				return yscale2(d.value);
			})
			.style("fill",function(d){
				return threshold(d.value);
			})
			.attr("width",xscale.bandwidth())
			.attr("height",function(d){
				return h - yscale2(d.value);
			});

		///////////////
		//// Lines ////
		///////////////

		var lineGen2 = d3.line()
			// added integer to center dot with bar
				.x( function(d){ return xscale(d.qYear)+22; })
				.y( function(d){ return yscale(d.value); });

		covSvg.append("path.cov-path")
				.attr("d", function(d){
					return lineGen2(d.values);
				});

		covSvg
			.selectAll(".cov-dot")
			.data(dbRegionAndCoverage)
			.enter()		
			.append("circle.cov-dot")
			.attr("r",5)
			.attr("cx",function(d){
					// added integer to center dot with bar
				return xscale(d.qYear)+22;
			})
			.attr("cy",function(d){
				return yscale(d.value);
			});



		// gRects.append("text.bar-label")
  //     .attr("x", function(d) { return xscale(d.qYear) + xscale.bandwidth()/2; })
  //     .attr("y", function(d) { return yscale(d.value); })
  //     .attr("dy", function(d){
  //     	if(d.value > 0) {	      		
  //     		return "-10px";
  //     	} else {
  //     		return "20px";
  //     	}
  //     })
  //     .attr("text-anchor","middle")
  //     .text(function(d) { return d.value; });
	  
	}
}
