module RitaConsumesTheUniverse.State
{
  export class Boot extends Phaser.State
  {
    preload()
    {
      this.load.image('preload-bar', 'assets/images/preloader.gif');
    }

    create()
    {
      this.game.stage.backgroundColor = 0xFFFFFF;

      // Assign global settings here

      this.game.state.start('preload');

      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;

      this.game.scale.minWidth = 240;
      this.game.scale.minHeight = 240;

      this.game.scale.refresh();
    }
  }
}
