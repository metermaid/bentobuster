module RitaConsumesTheUniverse.State
{
  export class Preload extends Phaser.State
  {
    private preloadBar: Phaser.Sprite;

    preload()
    {

      this.add.text(350, 100, 'Loading...',
        { font: 'bold 72px Helvetica', fill: 'white'});
      this.preloadBar = this.add.sprite(350, 200, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('background', 'assets/images/background.png');
      this.load.spritesheet('buster', 'assets/images/buster.png', 225,300,2);

      this.load.spritesheet('tiles', 'assets/images/tiles.png',80,80,12);

      this.load.audio('menumusic', ['assets/sounds/menu.mp3', 'assets/sounds/menu.ogg']);
      this.load.audio('effect1', ['assets/sounds/one.mp3', 'assets/sounds/one.ogg']);
      this.load.audio('effect2', ['assets/sounds/two.mp3', 'assets/sounds/two.ogg']);
      this.load.audio('effect3', ['assets/sounds/three.mp3', 'assets/sounds/three.ogg']);
      this.load.audio('effect4', ['assets/sounds/four.mp3', 'assets/sounds/four.ogg']);
      this.load.audio('effect5', ['assets/sounds/five.mp3', 'assets/sounds/five.ogg']);
      this.load.audio('effect6', ['assets/sounds/six.mp3', 'assets/sounds/six.ogg']);

      // Load remaining assets here
    }

    create()
    {
      this.game.state.start('menu');
    }
  }
}
