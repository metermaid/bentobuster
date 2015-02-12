/// <reference path="../prefab/tile.ts" />

module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {
   private numTiles: number = 8;
   private tiles: Prefab.Tile[][];
   private bentoArea;
   private buster;
   private music;

    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.buster = this.add.sprite(500, 0, 'buster');
      this.bentoArea = this.add.graphics(0, 0);
      this.bentoArea.beginFill(0x7F1F1F, 1);
      this.bentoArea.boundsPadding = 0;
      this.bentoArea.drawRect(0, 0, 480, 480);

      this.music = [];
      this.music.push(this.add.audio('one'));
      this.music.push(this.add.audio('two'));
      this.music.push(this.add.audio('three'));
      this.music.push(this.add.audio('four'));
      this.music.push(this.add.audio('five'));
      this.music.push(this.add.audio('six'));

      this.tiles = [];

      for (var i=0;i<this.numTiles;i++)
      {
         this.tiles[i] = new Array(this.numTiles);
         for (var j=0;j<this.numTiles;j++)
         {
            var tile = new Prefab.Tile(this.game,j,i, Prefab.Tile.randomTile());

            this.tiles[i][j] = tile;
         }
      }
      this.input.onDown.add(this.clickTile, this);
    }

    clickTile()
    {
      this.buster.frame = 1;
      var numClicked = 1;
      var selectedRow = Prefab.Tile.findRoworColumn(this.input.worldY);
      var selectedColumn = Prefab.Tile.findRoworColumn(this.input.worldX);
      var numClicked = 1 + this.floodFill(selectedRow, selectedColumn, this.tiles[selectedRow][selectedColumn].key);
      this.fallDown();
      this.newTiles();
      //this.buster.frame = 0;

      if (numClicked <= 5)
        this.music[numClicked-1].play();
      else
        this.music[5].play();
    }

    floodFill(row:number,col:number,key:string)
    {
      var num = 0;
      if ((row >= 0 && row < this.numTiles) &&
          (col >= 0 && col < this.numTiles))
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
      for (var i = this.numTiles - 1; i >= 0; i--)
         for (var j = 0; j < this.numTiles; j++)
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
      for (var i = 0; i < this.numTiles; i++)
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
      for (var i = row+1; i< this.numTiles; i++)
      {
         if (this.tiles[i][col]==null)
            holes++;
      }
      return holes;
    }
  }
}
