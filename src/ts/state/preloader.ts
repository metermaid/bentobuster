module RitaConsumesTheUniverse.State
{
  export class Preload extends Phaser.State
  {
    private preloadBar: Phaser.Sprite;

    preload()
    {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('cherry', 'assets/images/cherry.png');
      this.load.image('hay', 'assets/images/baleofhay.png');
      this.load.image('rock', 'assets/images/rock.png');
      this.load.image('spaghetti', 'assets/images/spaghetti.png');
      this.load.image('steak', 'assets/images/steak.png');
      this.load.image('me', 'assets/images/me.png');

      // Load remaining assets here
    }

    create()
    {
      this.game.state.start('menu');
    }
  }
}
