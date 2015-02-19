/// <reference path="../prefab/tile.ts" />

module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {
   private buster;
   private labelFont = { font: "16px \"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif", fill: "#ffffff", align: "center" };
   private scoreDisplay;
   private levelDisplay;
   private board;
   hungerBar;
   happinessBar;
   hungerLoop;
   happinessLoop;
   score: number = 0;
   level: number = 1;

    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.buster = this.add.sprite(660, 0, 'buster');

      this.board = new Prefab.Board(this.game, this);

      this.add.text(660, 300, "Hunger", this.labelFont);
      this.hungerBar = new Prefab.Bar(this.game, 660, 335);
      this.add.text(660, 360, "Happiness", this.labelFont);
      this.happinessBar = new Prefab.Bar(this.game, 660, 395);

      this.levelDisplay = this.add.text(660, 420, "Level: " + this.level, this.labelFont);
      this.scoreDisplay = this.add.text(660, 440, "Score: " + this.score, this.labelFont);

      this.input.onDown.add(this.board.clickTile, this.board);

      this.hungerLoop = this.time.events.loop(250, this.hungerBar.increment, this.hungerBar);
      this.happinessLoop = this.time.events.loop(500, this.happinessBar.increment, this.happinessBar);
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
  }
}
