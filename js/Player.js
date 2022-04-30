class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.score = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      score:this.score
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  static getPlayersInfo() {
    var playerRef = database.ref("players");
    playerRef.on("value",data=>{
      allPlayers = data.val();
    })
  }

  update(){
    var playerRef = 'players/player'+this.index;
    database.ref(playerRef).update({
      positionX:this.positionX,positionY:this.positionY,score:this.score
    })
  }

  getDistance(){
    var playerRef = database.ref('players/player'+this.index);
    playerRef.on('value',data=>{
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    })
  }

  ballUpdate(){
    var ballref = database.ref("ballPosition");
    ballref.update({
      x:this.positionX, y:this.positionY
    })
  }
}
