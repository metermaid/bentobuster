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
      this.load.spritesheet('buster', 'assets/images/buster.png', 225,300,2);

      this.load.image('Sashimi', 'assets/images/thumbnails/sashimi.png');
      this.load.image('Tempura', 'assets/images/thumbnails/tempura.png');
      this.load.image('Gyoza', 'assets/images/thumbnails/gyoza.png');
      this.load.image('Nigiri', 'assets/images/thumbnails/nigiri.png');
      this.load.image('Rolls', 'assets/images/thumbnails/rolls.png');
      this.load.image('Miso', 'assets/images/thumbnails/miso.png');

      this.load.audio('menumusic', ['assets/sounds/menu.mp3', 'assets/sounds/menu.ogg']);
      this.load.audio('one', ['assets/sounds/one.mp3', 'assets/sounds/one.ogg']);
      this.load.audio('two', ['assets/sounds/two.mp3', 'assets/sounds/two.ogg']);
      this.load.audio('three', ['assets/sounds/three.mp3', 'assets/sounds/three.ogg']);
      this.load.audio('four', ['assets/sounds/four.mp3', 'assets/sounds/four.ogg']);
      this.load.audio('five', ['assets/sounds/five.mp3', 'assets/sounds/five.ogg']);
      this.load.audio('six', ['assets/sounds/six.mp3', 'assets/sounds/six.ogg']);

      // Load remaining assets here
    }

    create()
    {
      this.game.state.start('menu');
    }
  }
}
