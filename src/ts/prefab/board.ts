module RitaConsumesTheUniverse.Prefab
{

  export class Board extends Phaser.GameObjectFactory
  {
    private offsetX: number = 0;
    private offsetY: number = 0;
    private tilesX: number = 8;
    private tilesY: number = 6;
    private tiles: Prefab.Tile[][];
    private bentoArea;
    private music;
    private activeTile;
    private allowInput: boolean = false;

    constructor(game: Phaser.Game, public state: RitaConsumesTheUniverse.State.Main)
    {
      super(game);

      this.bentoArea = this.state.add.graphics(0, 0);
      this.bentoArea.beginFill(0x000000, 1);
      this.bentoArea.boundsPadding = 0;
      this.bentoArea.drawRect(0, 0, 640, 500);

      this.music = [];
      for (var i=1;i<=6;i++)
        this.music.push(this.state.add.audio('effect' + i));

      this.tiles = [];

      for (var i=0;i<this.tilesY;i++)
      {
         this.tiles[i] = new Array(this.tilesX);
         for (var j=0;j<this.tilesX;j++)
         {
            var tile = new Prefab.Tile(this.game, j, i, this.offsetX, this.offsetY, Prefab.Tile.randomTile(this.state.level()));
            this.tiles[i][j] = tile;
            tile.events.onInputDown.add(this.selectTile, this);
         }
      }
    }

    selectTile(tile, pointer)
    {
      if (!this.activeTile)
        this.activeTile = tile;
    }

    adjacentTiles(tile1,tile2)
    {
      if (Math.abs(tile1.x - tile2.x) <= Prefab.Tile.tileSize && Math.abs(tile1.x - tile2.x) <= Prefab.Tile.tileSize)
        return true;
      else
        return false;
    }

    matchTiles()
    {
      if (this.activeTile)
      {
        this.tiles.forEach ( (row,rownum) =>
        {
          row.forEach ( (tile,col) =>
          {
            if(tile.input.pointerOver(this.game.input.activePointer.id) && tile.food == this.activeTile.food && this.adjacentTiles(tile, this.activeTile))
            {
              tile.selectTile();
              this.activeTile = tile;
            }
          });
        });
      }
    }

    clearTiles()
    {
      var numClicked = 0;
      this.tiles.forEach ( (row) =>
      {
        row.forEach ( (tile,col) =>
        {
          if (tile.clicked)
          {
            tile.destroy();
            row[col]=null;
            numClicked++;
          }
        });
      });

      this.fallDown();
      this.newTiles();

      if (numClicked <= 5)
        this.music[numClicked-1].play();
      else
        this.music[5].play();

      this.state.addScore(numClicked, Prefab.Food.data[Prefab.FoodEnum[<number>this.activeTile.food]]);
      this.activeTile = null;
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
           var tile = new Prefab.Tile(this.game, i, j-holes-1, this.offsetX, this.offsetY, Prefab.Tile.randomTile(this.state.level()));

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
      this.music.forEach((file) =>
      {
        file.destroy();
      });
      this.music.length = 0;

      for (var i=0;i<this.tilesY;i++)
      {
         for (var j=0;j<this.tilesX;j++)
         {
            this.tiles[i][j].destroy();
         }
         this.tiles[i].length = 0;
      }
      this.tiles.length = 0;

      this.bentoArea.destroy();
    }
  }
}