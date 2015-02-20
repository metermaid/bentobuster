/// <reference path="../prefab/tile.ts" />

module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {
   private buster;
   private labelFont = { font: "16px \"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif", fill: "#000000", align: "center" };
   private scoreDisplay;
   private levelDisplay;
   private board;
   private hungerLabel;
   private happinessLabel;
   private hungerBar;
   private happinessBar;
   private hungerLoop;
   private happinessLoop;
   private score: number = 0;
   level: number = 1;

    create()
    {
      this.stage.backgroundColor = 0xFAE2AE;
      this.buster = this.add.sprite(660, 0, 'buster');

      this.board = new Prefab.Board(this.game, this);

      this.hungerLabel = this.add.text(660, 300, "Hunger", this.labelFont);
      this.hungerBar = new Prefab.Bar(this.game, 660, 335);
      this.happinessLabel = this.add.text(660, 360, "Happiness", this.labelFont);
      this.happinessBar = new Prefab.Bar(this.game, 660, 395);

      this.levelDisplay = this.add.text(660, 420, "Level: " + this.level, this.labelFont);
      this.scoreDisplay = this.add.text(660, 440, "Score: " + this.score, this.labelFont);

      this.input.onDown.add(this.board.clickTile, this.board);

      this.hungerLoop = this.time.events.loop(250, this.hungerBar.increment, this.hungerBar);
      this.happinessLoop = this.time.events.loop(500, this.happinessBar.increment, this.happinessBar);
    }

    update()
    {
      if (this.hungerBar.current <= 0 || this.happinessBar.current <= 0)
        this.game.state.start('menu', true);
    }

    addScore(numClicked: number, typeData)
    {
      this.buster.frame = 1;
      this.time.events.add(1000, () => { this.buster.frame = 0; }, this);
      this.score += numClicked * typeData.happiness * 10;
      this.hungerBar.increment(numClicked * typeData.hunger);
      this.happinessBar.increment(numClicked * typeData.happiness);

      this.scoreDisplay.setText("Score: " + this.score + " (+" + (numClicked * typeData.happiness * 10) + ")");

      this.happinessLabel.setText("Happiness (+" + (numClicked * typeData.happiness) + ")");
      this.hungerLabel.setText("Hunger (+" + (numClicked * typeData.hunger) + ")");

      if (this.level < (this.score - (this.score % 5000))/5000)
      {
        this.level = (this.score - (this.score % 5000))/5000; 
        this.levelDisplay.setText("Level: " + this.level); 
        this.hungerLoop.delay = 175 / Math.log(this.level + 1); 
        this.happinessLoop.delay = 350 / Math.log(this.level + 1); 
      }

    }

    shutdown()
    {
      this.board.destroy();
      this.level = 1;
      this.score = 0;
    }
  }
}
