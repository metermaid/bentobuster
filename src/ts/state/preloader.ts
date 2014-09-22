module RitaConsumesTheUniverse.State
{
  export class Preload extends Phaser.State
  {
    private preloadBar: Phaser.Sprite;

    preload()
    {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('tos', 'assets/images/tos.jpg');
      this.load.image('player', 'assets/images/test-sheet.png');

      // Load remaining assets here
    }

    create()
    {
      this.game.state.start('menu');
    }
  }
}
