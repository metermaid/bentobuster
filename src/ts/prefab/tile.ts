module RitaConsumesTheUniverse.Prefab
{
  export enum FoodEnum {Sashimi, Tempura, Gyoza, Nigiri, Rolls, Miso}
  export class Food {
    static data = [{hunger:2,happiness:5},
                      {hunger:3,happiness:3},
                      {hunger:2,happiness:4},
                      {hunger:3,happiness:3},
                      {hunger:4,happiness:2},
                      {hunger:1,happiness:1}];
  }

  export class Tile extends Phaser.Sprite
  {
    food:Food;
    static tileSize = 60;

    constructor(game: Phaser.Game, x: number, y: number, offsetX: number, offsetY: number, food)
    {
      super(game, x*Tile.tileSize + offsetX, y*Tile.tileSize + offsetY, food, 0);
      this.food = food;
      game.add.existing(this);
    }

    update()
    {
    }

    tweenDown(y: number, offsetY: number)
    {
      var tileTween = this.game.add.tween(this);
      tileTween.to({
        y: y*Tile.tileSize+offsetY
      },800,Phaser.Easing.Cubic.Out,true);
    }

    static randomTile(level: number)
    {
      if (level == 1)
        return FoodEnum[Math.floor(Math.random() * 3)];
      else if (level < 3)
        return FoodEnum[Math.floor(Math.random() * 4)];
      else if (level < 5)
        return FoodEnum[Math.floor(Math.random() * 5)];
      else
        return FoodEnum[Math.floor(Math.random() * 6)]; // added twice
    }

    static findRoworColumn(input:number)
    {
      return Math.floor(input/this.tileSize);
    }
  }
}