module RitaConsumesTheUniverse.Prefab
{
  export class Bar extends Phaser.Graphics
  {
    x: number;
    y: number;
    barWidth: number;
    current: number = 100.0;
    _last: number = 100.0;
    max: number = 100.0;

    constructor(game: Phaser.Game, x: number, y: number, width: number = 225, current: number = 100)
    {
      super(game, x, y);
      this.barWidth = width;
      this.current = current;
      this.drawBar();
      game.add.existing(this);
    }

    update()
    {
          this.clear();
          this.drawBar();
    }

    increment(amount: number = -1) {
      if (0 < this.current + amount && this.current + amount < 100)
        this.current += amount;
    }

    drawBar()
    {
      var x = (this.current / this.max) * 100;
      var colour = Phaser.Color.getColor((x > 50 ? 1-2*(x-50)/100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2*x/100.0) * 255, 0);
      var black = Phaser.Color.getColor(0,0,0);

      this.beginFill(black);
      this.lineStyle(20, black, 1);
      this.moveTo(0,0);
      this.lineTo(this.barWidth, 0);
      this.endFill();

      this.beginFill(colour);
      this.lineStyle(20, colour, 1);
      this.moveTo(0,0);
      this.lineTo(this.barWidth * this.current / this.max, 0);
      this.endFill();
    }
  }
}