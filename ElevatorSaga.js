{
    init: function(elevators, floors) {
        function goToMiddleFloor(e, floorCount){
            e.goToFloor(Math.floor(floorCount / 2));
        }
        function handleIdle(e, floorCount){
            return function(){
                // goToMiddleFloor(e, floorCount);
            };
        }
        function handleButtonPress(e){
            return function(floorNum){
                e.goToFloor(floorNum);
            };
        }
        
        function handleUpOrDownPress(currentFloor) {
            return function(){
                // check to see if elevators are already going to that floor
                for(var eNum = 0; eNum < elevators.length; eNum++){
                    var currentEle = elevators[eNum];
                    for(var i = 0; i < currentEle.destinationQueue.length; i++) {
                        if (currentEle.destinationQueue[i] == currentFloor.floorNum()) return; // the elevator is already going to this floor
                    }
                }
                // elevators aren't already going to that floor
                var minQueueLen = 100000;
                var minQueueIdx = -1;
                for(var eNum = 0; eNum < elevators.length; eNum++){
                    var currentEle = elevators[eNum];
                    if (currentEle.destinationQueue.length < minQueueLen){
                        minQueueLen = currentEle.destinationQueue.length;
                        minQueueIdx = eNum;
                    }
                }
                elevators[minQueueIdx].goToFloor(currentFloor.floorNum());
            };
        }
        
        for (var eNum = 0; eNum < elevators.length; eNum++){
            elevators[eNum].on("idle", handleIdle(elevators[eNum], floors.length));
            elevators[eNum].on("floor_button_pressed", handleButtonPress(elevators[eNum]));
        }
        for (var fNum = 0; fNum < floors.length; fNum++){
            var currentFloor = floors[fNum];
            currentFloor.on("up_button_pressed", handleUpOrDownPress(currentFloor));
            currentFloor.on("down_button_pressed", handleUpOrDownPress(currentFloor));
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
