// $( window ).resize(fireAll);

// function fireAll() {
// 	barLineChart();
// 	spanChart();
// 	slopeGraph(slope_opts.slope_one);
// 	slopeGraph(slope_opts.slope_two);
// 	slopeGraph(slope_opts.slope_three);	
// 	slopeGraph(slope_opts.slope_four);
// 	slopeGraph(slope_opts.slope_five);
// 	slopeGraph(slope_opts.slope_six);
// 	slopeGraph(slope_opts.slope_seven);
// 	slopeGraph(slope_opts.slope_eigth);
// }

// pageload fire
;(function(){
	console.log("D3 document is ready!");	

	/////////////////
	//// options ////
	/////////////////
	
	// specify range - if range not specified, extent of data set
	// remove var, gove global access
	cmargin = {
		bar:{
			top:20,left:40,right:80,bottom:60
		},
		slope:{
			top:50,left:40,right:40,bottom:100
		},
		span:{
			top:40,left:40,right:60,bottom:110
		},
		line:{
			top:40,left:40,right:80,bottom:60
		}			
	};

	slope_opts = {
		slope_one: {
			domLoc:".gcirc-by-cov.block-1",
			dataCov:"Casualty Insurance Renewal Rate",
			region:"us"
		},
		slope_two: {
			domLoc:".gcirc-by-cov.block-2",
			dataCov:"Property Insurance Renewal Rate",
			region:"us"
		},
		slope_three: {
			domLoc:".gcirc-by-cov.block-3",
			dataCov: "Financial and Professional Liability Insurance Renewal Rate",
			region:"us"
		},
		slope_four: {
			domLoc:".gcirc-by-cov.block-4",
			dataCov:"Casualty Insurance Renewal Rate",
			region:"us"
		},
		slope_five: {
			domLoc:".gcirc-by-cov.block-5",
			dataCov:"Casualty Insurance Renewal Rate",
			region:"uk"
		},
		slope_six: {
			domLoc:".gcirc-by-cov.block-6",
			dataCov: "Casualty Insurance Renewal Rate",
			region:"eu"
		},
		slope_seven: {
			domLoc:".gcirc-by-cov.block-7",
			dataCov:"Casualty Insurance Renewal Rate",
			region:"lac"
		},
		slope_eigth: {
			domLoc:".gcirc-by-cov.block-8",
			dataCov: "Casualty Insurance Renewal Rate",
			region:"apac"
		}
	};

	///////////////
	//// initi ////
	///////////////

	barLineChart(cmargin);
	spanChart(cmargin);
	slopeGraph(slope_opts.slope_one, cmargin);
	slopeGraph(slope_opts.slope_two, cmargin);
	slopeGraph(slope_opts.slope_three, cmargin);	
	slopeGraph(slope_opts.slope_four, cmargin);
	slopeGraph(slope_opts.slope_five, cmargin);
	slopeGraph(slope_opts.slope_six, cmargin);
	slopeGraph(slope_opts.slope_seven, cmargin);
	slopeGraph(slope_opts.slope_eigth, cmargin);
	barLineDualGraph();



})()


