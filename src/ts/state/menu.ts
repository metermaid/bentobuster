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
      this.stage.backgroundColor = 0xE3EBF2;
      this.background = this.add.tileSprite(0,0, 600, 720, 'background');


      this.music = this.add.audio('menumusic');
      this.music.play();

      this.title = this.add.text(0, 0, 'BENTO BUSTER',
        { fontSize: '64pt', fill: 'white', stroke: "0xAAC5D8", strokeThickness: 5});
      this.buster = this.add.sprite(0, 25, 'buster');

      this.input.onDown.addOnce(() =>
      {
        this.game.state.start('main');
      });
    }
  }
}
