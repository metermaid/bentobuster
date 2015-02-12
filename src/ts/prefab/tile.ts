module RitaConsumesTheUniverse.Prefab
{
  export enum Food {Sashimi, Tempura, Gyoza, Nigiri, Rolls, Miso}

  export class Tile extends Phaser.Sprite
  {
    x;
    y;
    food:Food;
    static tileSize = 60;

    constructor(game: Phaser.Game, x: number, y: number, food: string)
    {
      super(game, x*Tile.tileSize, y*Tile.tileSize, food, 0);

      game.add.existing(this);
    }

    update()
    {
    }

    tweenDown(y: number)
    {
      var tileTween = this.game.add.tween(this);
      tileTween.to({
        y: y*Tile.tileSize
      },800,Phaser.Easing.Cubic.Out,true);
    }

    static randomTile(scope?: string)
    {
      return Food[Math.floor(Math.random() * (Object.keys(Food).length)/2)]; // added twice
    }

    static findRoworColumn(input:number)
    {
      return Math.floor(input/this.tileSize);
    }
  }
}