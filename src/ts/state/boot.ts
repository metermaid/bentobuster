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
    }
  }
}
