module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {

   private tileSize: number;
   private numTiles: number;
   private tileTypes: string[];
   private tiles: Phaser.Sprite[][];
    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.tileSize = 64;
      this.numTiles = 8;
      this.tiles = [];
      this.tileTypes = ['cherry','hay','rock','spaghetti','steak'];

      for (var i=0;i<this.numTiles;i++)
      {
         this.tiles[i] = new Array(this.numTiles);
         for (var j=0;j<this.numTiles;j++)
         {
            var tile = this.add.sprite(j*this.tileSize,i*this.tileSize, this.randomTile());
            this.tiles[i][j] = tile;
         }
      }
      this.input.onDown.add(this.clickTile, this);
    }
    clickTile()
    {
      var selectedRow = this.findRoworColumn(this.input.worldY);
      var selectedColumn = this.findRoworColumn(this.input.worldX);
      this.floodFill(selectedRow, selectedColumn, this.tiles[selectedRow][selectedColumn].key);
      this.fallDown();
      this.newTiles();
    }
    floodFill(row:number,col:number,key:string)
    {
      if ((row >= 0 && row < this.numTiles) &&
          (col >= 0 && col < this.numTiles))
      {
         if (this.tiles[row][col] != null && this.tiles[row][col].key == key)
         {
            this.tiles[row][col].destroy();
            this.tiles[row][col]=null;
            this.floodFill(row+1, col, key);
            this.floodFill(row-1, col, key);
            this.floodFill(row, col+1, key);
            this.floodFill(row, col-1, key);
         }
      }
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
                  var tileTween = this.add.tween(this.tiles[i][j]);
                  tileTween.to({y: (i+delta)*this.tileSize},800,Phaser.Easing.Cubic.Out,true);
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
               var tileXPos = i*this.tileSize;
               var tileYPos = (j-holes-1)*this.tileSize;
               var tile = this.add.sprite(tileXPos,tileYPos,this.randomTile());
               this.tiles[j][i] = tile;      
               var tileTween = this.add.tween(this.tiles[j][i]);
               tileTween.to({
                  y: j*this.tileSize
               },800,Phaser.Easing.Cubic.Out,true);
         }
      }
    }
    randomTile()
    {
      return this.tileTypes[Math.floor(Math.random()*this.tileTypes.length)];
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
    findRoworColumn(input:number)
    {
      return Math.floor(input/this.tileSize);
    }
  }
}
