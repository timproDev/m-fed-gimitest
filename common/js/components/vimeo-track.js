;(function($){
    
    var vimTrack = function(_el) {
        
        $(_el).each(function(){            
            Froogaloop(this).addEvent('ready', ready);            
        });

        function ready(playerID){
            console.log(playerID + ' is ready');
            Froogaloop(playerID).addEvent('play', onPlay );
            Froogaloop(playerID).addEvent('playProgress', playProg );
            Froogaloop(playerID).addEvent('finish', vidDone );
            Froogaloop(playerID).addEvent('pause', vidPause );
        }

        function onPlay(PlayerID) {
            console.log(PlayerID + " has started");
        }

        function playProg(data, playerID){
            console.log(playerID + " is at " + Math.round(data.percent * 100) + "%");
        }

        function vidDone(playerID){
            console.log("The video" + playerID + " has finished");
        }
        function vidPause(playerID){
            console.log("The video" + playerID + " has paused");
        }
    }
    
    vimTrack('iframe');
    
})(jQuery);
