/// <reference path="../prefab/tile.ts" />

module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {
   private tilesX: number = 11;
   private tilesY: number = 8;
   private tiles: Prefab.Tile[][];
   private bentoArea;
   private buster;
   private music;
   private labelFont = { font: "16px \"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif", fill: "#ffffff", align: "center" };
   score: number = 0;
   private scoreDisplay;
   level: number = 1;
   private levelDisplay;
   hungerBar;
   happinessBar;
   hungerLoop;
   happinessLoop;

    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.buster = this.add.sprite(660, 0, 'buster');
      this.bentoArea = this.add.graphics(0, 0);
      this.bentoArea.beginFill(0x7F1F1F, 1);
      this.bentoArea.boundsPadding = 0;
      this.bentoArea.drawRect(0, 0, 660, 480);

      this.music = [];
      this.music.push(this.add.audio('one'));
      this.music.push(this.add.audio('two'));
      this.music.push(this.add.audio('three'));
      this.music.push(this.add.audio('four'));
      this.music.push(this.add.audio('five'));
      this.music.push(this.add.audio('six'));

      this.game.add.text(660, 300, "Hunger", this.labelFont);
      this.hungerBar = new Prefab.Bar(this.game, 660, 335);
      this.game.add.text(660, 360, "Happiness", this.labelFont);
      this.happinessBar = new Prefab.Bar(this.game, 660, 395);

      this.tiles = [];

      for (var i=0;i<this.tilesY;i++)
      {
         this.tiles[i] = new Array(this.tilesX);
         for (var j=0;j<this.tilesX;j++)
         {
            var tile = new Prefab.Tile(this.game,j,i, Prefab.Tile.randomTile());

            this.tiles[i][j] = tile;
         }
      }

      this.levelDisplay = this.game.add.text(660, 420, "Level: " + this.level, this.labelFont);
      this.scoreDisplay = this.game.add.text(660, 440, "Score: " + this.score, this.labelFont);
      this.input.onDown.add(this.clickTile, this);
      this.hungerLoop = this.game.time.events.loop(250, this.hungerBar.increment, this.hungerBar);
      this.happinessLoop = this.game.time.events.loop(500, this.happinessBar.increment, this.happinessBar);
    }

    update()
    {
      if (this.score > 5000)
      {
        this.level = (this.score - (this.score % 5000))/5000; 
        this.levelDisplay.setText("Level: " + this.level); 
        this.hungerLoop.delay = 250 / Math.log(this.level); 
        this.happinessLoop.delay = 500 / Math.log(this.level); 
      }
      this.scoreDisplay.setText("Score: " + this.score);   
    }

    clickTile()
    {
      var selectedRow = Prefab.Tile.findRoworColumn(this.input.worldY);
      var selectedColumn = Prefab.Tile.findRoworColumn(this.input.worldX);
      var clickedTile = this.tiles[selectedRow][selectedColumn];
      if (clickedTile)
      {
        var numClicked = 1;
        var typeData = Prefab.Food.data[Prefab.FoodEnum[<number>clickedTile.food]];
        var numClicked = 1 + this.floodFill(selectedRow, selectedColumn, clickedTile.key);
        this.fallDown();
        this.newTiles();

        if (numClicked <= 5)
          this.music[numClicked-1].play();
        else
          this.music[5].play();
        this.score += numClicked * typeData.happiness * 10;
        this.hungerBar.increment(numClicked * typeData.hunger);
        this.happinessBar.increment(numClicked * typeData.happiness);
      }
    }

    floodFill(row:number,col:number,key:string)
    {
      var num = 0;
      if ((row >= 0 && row < this.tilesY) &&
          (col >= 0 && col < this.tilesX))
      {
         if (this.tiles[row][col] != null && this.tiles[row][col].key == key)
         {  
            this.tiles[row][col].destroy();
            this.tiles[row][col]=null;
            num += 1 +
            this.floodFill(row+1, col, key) + 
            this.floodFill(row-1, col, key) + 
            this.floodFill(row, col+1, key) +
            this.floodFill(row, col-1, key);
         }
      }
      return num;
    }
    fallDown()
    {
      for (var i = this.tilesY - 1; i >= 0; i--)
         for (var j = 0; j < this.tilesX; j++)
         {
            if (this.tiles[i][j] != null)
            {
               var delta = this.findHoles(i,j);
               if (delta > 0) {
                  this.tiles[i][j].tweenDown(i+delta);

                  this.tiles[i+delta][j] = this.tiles[i][j];
                  this.tiles[i][j] = null;
               }
            }
         }
    }
    newTiles()
    {
      for (var i = 0; i < this.tilesX; i++)
      {
         var holes = this.findHoles(-1,i);
         for (var j = 0; j < holes; j++)
         {
           var tile = new Prefab.Tile(this.game,i,j-holes-1,Prefab.Tile.randomTile());

           this.tiles[j][i] = tile;    
           this.tiles[j][i].tweenDown(j);
         }
      }
    }
    findHoles(row:number, col:number)
    {
      var holes = 0;
      for (var i = row+1; i< this.tilesY; i++)
      {
         if (this.tiles[i][col]==null)
            holes++;
      }
      return holes;
    }
  }
}
