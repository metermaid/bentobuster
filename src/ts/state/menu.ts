module RitaConsumesTheUniverse.State
{
  export class Menu extends Phaser.State
  {
    title: Phaser.Text;
    background;
    buster;
    music;

    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.background = this.add.tileSprite(0,0, 850, 480, 'background');


      this.music = this.add.audio('menumusic');
      this.music.loop = true;
      this.music.play();

      this.title = this.add.text(10, 10, 'Bento Buster.',
        { font: 'bold 100px Roboto, Helvetica', fill: 'white'});

      this.add.text(10, 100, "Buster loves sushi. Click sushi to feed him.\nItems with more pieces make him less hungry,\nand items closer to red in the rainbow make him happier.\nDon\'t let him get hungry or unhappy.", { font: 'bold 24px Helvetica', fill: 'white'});

      this.input.onDown.addOnce(() =>
      {
        this.game.state.start('main');
      });
    }
    shutdown()
    {
      this.music.destroy();
    }
  }
}
