$(document).ready(function(){ 			
	if($("#resetLogIn, #resetTempPswd").length > 0) {
//		if(window.Worker) {
//			var worker = new Worker('common/js/components/timerworker.js');
//			
//			var WorkerTimer = {
//			
//			    id: 0,
//			    callbacks: {},
//			
//			    setInterval: function(cb, interval, context) {
//			        this.id++;
//			        var id = this.id;
//			        this.callbacks[id] = { fn: cb, context: context };
//			        worker.postMessage({ command: 'interval:start', interval: interval, id: id });
//			        return id;
//			    },
//			
//			    onMessage: function(e) {
//			
//			        switch (e.data.message) {
//			            case 'interval:tick':
//			                var callback = this.callbacks[e.data.id];
//			                if (callback && callback.fn) callback.fn.apply(callback.context);
//			                break;
//			            case 'interval:cleared':
//			                delete this.callbacks[e.data.id];
//			                break;
//			        }
//			
//			    },
//			
//			    clearInterval: function(id) {
//			        worker.postMessage({ command: 'interval:clear', id: id });
//			    }
//			
//			};
//			
//			worker.onmessage = WorkerTimer.onMessage.bind(WorkerTimer);
//	
//			var time_length = 59;
//			WorkerTimer.setInterval(function() {
//			    if (time_length >= 0) {
//					var minutes = ((time_length / 60) / 100).toFixed(2).slice(2,4);
//					var seconds = ((time_length % 60) / 100).toFixed(2).slice(2,4);
//					$("#progressBar").width(Math.abs(((time_length / 60) * 100 - 100)) + "%");
//					$("#countdown").text((minutes + ":" + seconds));
//				    time_length--;
//			    } else {
//			    	WorkerTimer.clearInterval(1);
//			    	enable();
//			    }
//			}, 1000);
//		} else {
			var Example2 = new (function() {
			    var $countdown,    
			        incrementTime = 70,
			        currentTime = 12000,
			        currentWidth = 0,
			        widthIncrement = 700 / currentTime,
			        updateTimer = function() {
			            $countdown.html(formatTime(currentTime));
			            if (currentTime == 0) {
			               Example2.Timer.stop();
			               timerComplete();
			               return;
			            }
			            currentTime -= incrementTime / 10;
			            currentWidth += widthIncrement;
			            $("#progressBar").width(currentWidth.toString() + "%");
			            if (currentTime < 0) currentTime = 0;
			        },
			        timerComplete = function() {
						//$("#urlID").removeAttr("disabled");
			        	document.getElementById("urlID").className="enable";
						document.getElementById("urlID").onclick=null;
			            //alert('You can login with your new password now !');
						
			        },
			        init = function() {
			            $countdown = $('#countdown');
			            Example2.Timer = $.timer(updateTimer, incrementTime, true);
			            $form = $('#example2form');
			            $form.bind('submit', function() {
			                Example2.resetCountdown();
			                return false;
			            });
			        };
			    this.resetCountdown = function() {
			        var newTime = parseInt($form.find('input[type=text]').val()) * 100;
			        if (newTime > 0) {currentTime = newTime;}
			        this.Timer.stop().once();
			    };
			    $(init);
			});
		//}
			// Common functions
			function pad(number, length) {
			    var str = '' + number;
			    while (str.length < length) {str = '0' + str;}
			    return str;
			}
			function formatTime(time) {
			    var min = parseInt(time / 6000),
			        sec = parseInt(time / 100) - (min * 60),
			        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
			    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
			}
			//this function will enable the google link
		    function enable()
		    {
		    document.getElementById("urlID").className="enable";
		    document.getElementById("urlID").onclick=null;
		    }
	
	
		    function disable()
		    {
		    document.getElementById("urlID").onclick=ignoreClick;
		    document.getElementById("urlID").className="disabled";
		    }
	
		    //This is just cancels the event that called it
		    function ignoreClick()
		    {
		    return false;
		    }
	}
});