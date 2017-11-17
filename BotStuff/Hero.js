class Hero {
	constructor(heroData,player,messageComm) {
		this.map = require("./datafiles/newMap.json");
		this.messageComm = messageComm;
		this.state = "new";
		this.createHero = function() {
			this.position = {x:0,y:0,z:0};
			this.messageComm.respond(this.unitName,this.player,"Name your hero!");
			this.state = "naming";
		}
		this.rename = function(newName) {
			this.name = newName;
			this.messageComm.respond(this.unitName,this.player,"Your hero has been named: "+newName);
			switch (this.state) {
				case "naming" :
					this.state = "playing";
					return this.state;
					break;
			}
		}
		this.player = player;
		this.unitName = "Hero";
		if (heroData) {
			this.name = heroData.name;
			//here we'll load The Rest™
			this.state="playing";
		} else {
			this.createHero();
		}
		this.describe = function() {
				var mapField = this.map[this.position.x][this.position.y][this.position.z] 
				this.messageComm.respond(this.unitName,this.player,mapField.description);
				try {
					var items = "";
					for (var i=0;true;++i) {
						if (!mapField.items[i]) break;
						items += mapField.items[i].name+"\n";
					}
					this.messageComm.respond(this.unitName,this.player,items+"are lying here");
				} catch (err) {
					console.log("nothing to see here")
				}
				console.log(mapField);
		}
		this.walk = function(x,y,z) {
			try {
				this.map[this.position.x+x][this.position.y+y][this.position.z+z]
				this.position.x+=x;
				this.position.y+=y;
				this.position.z+=z;
				this.describe();
			} catch (err) {
				this.messageComm.respond(this.unitName,this.player,"You cannot go there!");
			}
		}
		this.messageComm.on(this.unitName,(author,message)=>{
			console.log("Hero message received");
		})
		
		
	}
}
module.exports = Hero;