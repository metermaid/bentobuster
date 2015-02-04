module RitaConsumesTheUniverse.State
{
  export class Menu extends Phaser.State
  {
    title: Phaser.Text;
    me;

    create()
    {
      this.stage.backgroundColor = 0xE3EBF2;
      this.title = this.add.text(0, 0, 'BENTO BUSTER',
        { fontSize: '64pt', fill: 'white', stroke: "0xAAC5D8", strokeThickness: 5});
      this.me = this.add.sprite(0, 25, 'me');
      this.me.scale.x = 0.5;
      this.me.scale.y = 0.5;

      this.input.onDown.addOnce(() =>
      {
        this.game.state.start('main');
      });
    }
  }
}
