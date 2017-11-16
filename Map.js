class Map {
	constructor(messageComm,player) {
		this.messageComm = messageComm;
		this.player = player;
		this.mapJson = require("./datafiles/newMap.json");
		this.unitName = "Map";
		this.testPosition = function(x,y,z){
			if (this.mapJson[x][y][z]) {return true} else {return false};
		};
		this.describe = function(x,y,x) {
			var mapField = this.mapJson[x][y][z];
			if(!mapField) return false;
			var returnMessage = mapField.description;
			var items = "";
			var verb = "is"
			if (mapField.items) {
				for (var i=0;i<items.length;++i) {
					if (i === 1) verb = "are";
					items += mapField.items[i].name+"\n";
				}
			}
			if (items.length>0) returnMessage+="\n"+items+verb+" lying here";
			returnMessage+="\npossible exits:\n"+mapField.exits;
			return returnMessage;	
		}
		this.getItemsByName = function(name,x,y,z) {
			var mapField = this.mapJson[x][y][z];
			if (!mapField || !mapField.items) return false;
		}
	}
}
module.exports = Map;