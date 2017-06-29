function slopeGraph(slopeOpts, cmargin) {

	var settings = {
		chartContainerClass: slopeOpts.domLoc,
		selectedRegion : slopeOpts.region,
		selectedCoverage : slopeOpts.dataCov,
		slopeStart: "q4 2016",
		slopeEnd: "q1 2017",
		chartType : "line",
		tickCount : "5",	
		breakout: "single"
	};

	var chartContainer = d3.select(settings.chartContainerClass);

	var margin = {
			top:cmargin.slope.top,
			left:cmargin.slope.left,
			right:cmargin.slope.right,
			bottom:cmargin.slope.bottom
		};

	var w = chartContainer.node().clientWidth - margin.left - margin.right,
		h = 400 - margin.top - margin.bottom;

	d3.queue()
		.defer(d3.csv, "common/data/gimi-update.csv")
		.await(ready);

	function ready(error, data) {
		if (error) throw "error: not loading data, bro";
			
			data.forEach(function(d){
				d.value = parseFloat(d.value);
				d.qYear = d.quarter + " " + d.year;
			});	
			
			// initial data point
			var dbRegion = data.filter(function(d){
				return d.region === settings.selectedRegion;
			});
			var dbRegionAndCoverage = data.filter(function(d){
				return d.region === settings.selectedRegion && d.coverage === settings.selectedCoverage;
			});		
			var dbSlopeRange = dbRegionAndCoverage.filter(function(d){		
				return (d.qYear === settings.slopeStart) || (d.qYear === settings.slopeEnd);
			});

			// powered by multiple keys		
		  var nestByCoverage = d3.nest()  	
				.key(function(d) { return d.coverage; })			
				.entries(dbRegion);		

			// for single chart, filter by key
			nestByCoverage = nestByCoverage.filter(function(d){
				return d.key === settings.selectedCoverage;
			});	

			var divs = chartContainer.html("").selectAll(".cov-div")
				.data(nestByCoverage)
				.enter()
				.append("div.cov-div");

			var svg = divs				
				.append("svg")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h + margin.top + margin.bottom)
				.append("g.wrap")			
				.translate([margin.left,margin.top]);

			// function to break string at space
			String.prototype.replaceAt = function(index, replacement) {
			  return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
			}
			// option one - without jetpack wordwrap
			svg				
				.append("text")
				.attr("class","c-title")
				.tspans(function(d) {
					var txt = (settings.selectedRegion).toUpperCase() + " " + d.key,
					    index = 0,
					    res = [];
					while ((index = txt.indexOf(' ', index + 1)) > 0) {
					    res.push(index);
					}
					var txtVal = txt.replaceAt(res[2],"\n");
		      return txtVal.split('\n');
		    },16)		    
		    .attr("x",(w+8)/2)
		    .attr("y",h+margin.bottom/2)
		    .style("text-anchor","middle");		  

				// option two - jetpack wordwrap - causes issues
				// svg
				// 	.append("text")
				// 	.tspans(function(d) {
				// 		var txt = (settings.selectedRegion).toUpperCase() + " " + d.key;		      
				//      return d3.wordwrap(txt, 26);
				//    },20)
				//    .attr("x",(w+8)/2)
				//    .attr("y",h+margin.bottom/2)
				//    .style("text-anchor","middle");		  			

			var xscale = d3.scalePoint()
				.domain(dbSlopeRange.map(function(d) { return d.qYear; }))
				.range([0,w]);
					
			var yscale = d3.scaleLinear()
					// .domain(d3.extent(dbRegionAndCoverage, function(d){return d.value;}))
					.domain([-6,4])					
					.nice()
					.range([h,0]);
			
			var xaxis = d3.axisBottom()	
				.tickSize(-h)
				.scale(xscale);
			
			var yaxis = d3.axisRight()
					.scale(yscale)
					.ticks(settings.tickCount)						
					.tickFormat(d3.format(""))
					.tickSize(w);	

			var lineGen2 = d3.line()
					.x( function(d){ return xscale(d.qYear); })
					.y( function(d){ return yscale(d.value); });

			svg.append("g.x-axis")
				.call(xaxis)
				.translate([0,h]);

			svg.append("g.y-axis")
				.call(yaxis);

			d3.selectAll(".tick").each(function() {
				  if(+this.textContent == 0) {
				  	this.classList.add("zilch");
				  }				  
				});
			
			svg.selectAll(".slope-graph-c .tick").each(function() {
				var expr = "2016";				
		    if(this.textContent.includes(expr)) {
		    	this.classList.add("txt-start");
		    }
			});

			svg.append("path.coverage-slope")
				.attr("d", lineGen2(dbSlopeRange));

			svg
				.selectAll(".g-dots-slope")
				.data(dbSlopeRange)
				.enter()
				.append("circle.g-dots-slope")
				.attr("r",4)
				.attr("cx",function(d){ 
					return xscale(d.qYear);
				})
				.attr("cy",function(d){ 
					return yscale(d.value);
				});

			// within ready function
			function updateLine(coverage) {
				// reset the data	
				newData.forEach(function(d){
					d.coverage = parseFloat(d.values[0][coverage]);
				});			
				
				covData = newData.filter(function(d){
					// && will always return false - use or
					return (d.key == "Q4 2016") || (d.key == "Q1 2017");
				});
				
				var yscale = d3.scaleLinear()
					.domain([-5,5])				
					.nice()
					.range([h,0]);

				yaxis.scale(yscale);
				svg.select(".y-axis")
					.transition().duration(600)
					.call(yaxis);

				var updateDots = svg.selectAll(".g-dots-slope")
					.data(covData);
				
				var updateLine = svg.selectAll(".coverage-slope")
					.data(covData);

				var lineGen2 = d3.line()
					// .curve(d3.curveCardinal)
					.x( function(d){ return xscale(d.key); })
					.y( function(d){ return yscale(d.coverage); });

				updateDots
					.exit()
					.transition()				
					.remove();

				updateLine
					.exit()
					.transition()				
					.remove();
				
				updateDots
					.transition().duration(600)
					.attr("cx",function(d){ 
						return xscale(d.key);
					})
					.attr("cy",function(d){ 
						return yscale(d.coverage);
					});

				updateLine
					.transition().duration(600)
					.attr("d", lineGen2(covData));
			
				updateDots
					.enter()
					.append("circle.g-dots")
					.attr("cx",function(d){ 
						return xscale(d.key);
					})
					.attr("cy",function(d){ 
						return yscale(d.coverage);
					})
					.transition()
					.style("fill","green");

			}
			// update end
		}	
}
