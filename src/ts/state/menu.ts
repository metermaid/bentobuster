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
   //   this.music.loop = true;
//      this.music.play();

      this.title = this.add.text(10, 10, 'BENTO BUSTER',
        { font: 'bold 72px Roboto, Helvetica', fill: 'white'});

      this.input.onDown.addOnce(() =>
      {
        this.game.state.start('main');
      });
    }
  }
}
