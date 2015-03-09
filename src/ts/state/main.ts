/// <reference path="../prefab/tile.ts" />
/// <reference path="../prefab/board.ts" />
/// <reference path="../prefab/bar.ts" />
/// <reference path="../prefab/user.ts" />

module RitaConsumesTheUniverse.State
{
  export class Main extends Phaser.State
  {
   private board;
   private info;
   private buster;
   public highScore: number = 0;

    create()
    {
      this.stage.backgroundColor = 0xFAE2AE;
      this.buster = this.add.sprite(660, 0, 'buster');

      this.info = new Prefab.UserInfo(this.game, this, 660, 300);
      this.board = new Prefab.Board(this.game, this);

      this.input.onUp.add(this.board.clearTiles, this.board);
    }

    update()
    {
      if (this.info.hungerBar.current <= 0 || this.info.happinessBar.current <= 0)
        this.game.state.start('menu', true);

      this.board.matchTiles();
    }

    level()
    {
      return this.info.level;
    }

    addScore(numClicked: number, typeData)
    {
      this.buster.frame = 1;
      this.time.events.add(1000, () => { this.buster.frame = 0; }, this);

      this.info.addScore(numClicked, typeData);
    }

    shutdown()
    {
      if (this.info.score > this.highScore)
        this.highScore = this.info.score;
    }
  }
}
