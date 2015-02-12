module RitaConsumesTheUniverse.State
{
  export class Preload extends Phaser.State
  {
    private preloadBar: Phaser.Sprite;

    preload()
    {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('background', 'assets/images/background.png');
      this.load.image('buster', 'assets/images/buster.png');
      this.load.image('buster2', 'assets/images/bustereating.png');
      this.load.image('me', 'assets/images/me.png');

      this.load.image('sashimi', 'assets/images/sashimi.png');
      this.load.image('tempura', 'assets/images/tempura.png');
      this.load.image('gyoza', 'assets/images/gyoza.png');
      this.load.image('nigiri', 'assets/images/nigiri.png');
      this.load.image('rolls', 'assets/images/rolls.png');
      this.load.image('miso', 'assets/images/miso.png');

      this.load.audio('menumusic', ['assets/sounds/menu.mp3', 'assets/sounds/menu.ogg']);

      // Load remaining assets here
    }

    create()
    {
      this.game.state.start('menu');
    }
  }
}
