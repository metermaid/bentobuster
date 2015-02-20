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

  export class Tile extends Phaser.Group
  {
    food:Food;
    sprite:Phaser.Sprite;
    static tileSize = 80;

    constructor(game: Phaser.Game, x: number, y: number, offsetX: number, offsetY: number, food)
    {
      super(game);
      this.x = x*Tile.tileSize + offsetX;
      this.y = y*Tile.tileSize + offsetY;
      var bg = game.add.graphics(0, 0);
      bg.boundsPadding = 0;
      bg.beginFill(0x561515, 1);
      bg.drawRoundedRect(0, 0, 70, 70, 10);
      bg.endFill();
      var bg2 = game.add.graphics(5, 5);
      bg2.boundsPadding = 0;
      bg2.beginFill(0x7F1F1F, 1);
      bg2.drawRoundedRect(0, 0, 59, 59, 10);
      bg2.endFill();
      this.sprite = game.add.sprite(5, 5, food, 0);
      this.food = food;
      this.add(bg);
      this.add(bg2);
      this.add(this.sprite);
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