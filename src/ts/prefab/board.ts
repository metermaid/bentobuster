module RitaConsumesTheUniverse.Prefab
{

  export class Board extends Phaser.GameObjectFactory
  {
    private offsetX: number = 5;
    private offsetY: number = 10;
    private tilesX: number = 11;
    private tilesY: number = 8;
    private tiles: Prefab.Tile[][];
    private bentoArea;
    private music;

    constructor(game: Phaser.Game, public state: RitaConsumesTheUniverse.State.Main)
    {
      super(game);

      this.bentoArea = this.state.add.graphics(0, 0);
      this.bentoArea.beginFill(0x7F1F1F, 1);
      this.bentoArea.boundsPadding = 0;
      this.bentoArea.drawRect(0, 0, 670, 500);

      this.music = [];
      for (var i=1;i<=6;i++)
        this.music.push(this.state.add.audio('effect' + i));

      this.tiles = [];

      for (var i=0;i<this.tilesY;i++)
      {
         this.tiles[i] = new Array(this.tilesX);
         for (var j=0;j<this.tilesX;j++)
         {
            var tile = new Prefab.Tile(this.game, j, i, this.offsetX, this.offsetY, Prefab.Tile.randomTile(this.state.level));
            this.tiles[i][j] = tile;
         }
      }
    }

    clickTile()
    {
      var selectedRow = Prefab.Tile.findRoworColumn(this.game.input.worldY-this.offsetY);
      var selectedColumn = Prefab.Tile.findRoworColumn(this.game.input.worldX-this.offsetX);
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

        this.state.addScore(numClicked, typeData);
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
                  this.tiles[i][j].tweenDown(i+delta, this.offsetY);

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
           var tile = new Prefab.Tile(this.game, i, j-holes-1, this.offsetX, this.offsetY, Prefab.Tile.randomTile(this.state.level));

           this.tiles[j][i] = tile;    
           this.tiles[j][i].tweenDown(j, this.offsetY);
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
    destroy()
    {
      this.music.forEach(function(file) {
        file.destroy;
      });
      this.music.length = 0;

      for (var i=0;i<this.tilesY;i++)
      {
         for (var j=0;j<this.tilesX;j++)
         {
            this.tiles[i][j].destroy;
         }
         this.tiles[i].length = 0;
      }
      this.tiles.length = 0;
    }
  }
}