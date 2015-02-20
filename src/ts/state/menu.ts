module RitaConsumesTheUniverse.State
{
  export class Menu extends Phaser.State
  {
    title: Phaser.Text;
    background;
    instructions;
    header;
    buster;
    music;

    create()
    {
      this.stage.backgroundColor = 0x000000;
      this.background = this.add.tileSprite(0,0, 900, 500, 'background');


      this.music = this.add.audio('menumusic');
      this.music.loop = true;
      this.music.play();

      this.header = this.add.graphics(100, 100);
      this.header.boundsPadding = 0;
      this.header.beginFill(0x000000, 1).drawRect(0, 0, 500, 220);

      this.title = this.add.text(105, 95, 'Bento Buster.',
        { font: 'bold 72px Helvetica', fill: 'white'});

      this.instructions = this.add.text(110, 170, "Buster loves sushi. Click sushi to feed him. Items with more pieces make him less hungry, and items closer to red in the rainbow make him happier. Don\'t let him get too hungry or unhappy.", { font: 'bold 24px Helvetica', fill: 'white'});
      this.instructions.wordWrap = true;
      this.instructions.wordWrapWidth = 480;
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
