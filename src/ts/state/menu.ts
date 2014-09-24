module RitaConsumesTheUniverse.State
{
  export class Menu extends Phaser.State
  {
    background: Phaser.Sprite;

    create()
    {
      this.stage.backgroundColor = 0xff0000;
      this.background = this.add.sprite(0, 0, 'cherry');
      this.input.onDown.addOnce(() =>
      {
        this.game.state.start('main');
      });
    }
  }
}
