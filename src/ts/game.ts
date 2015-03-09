/// <reference path="bower-components/phaser-official/build/phaser.d.ts"/>

/// <reference path='state/boot.ts'/>
/// <reference path='state/preloader.ts'/>
/// <reference path='state/menu.ts'/>
/// <reference path='state/main.ts'/>

module RitaConsumesTheUniverse
{
  export class Game extends Phaser.Game
  {
    constructor()
    {
      super(900, 500, Phaser.AUTO, 'game-content');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}

window.onload = () =>
{
  var game = new RitaConsumesTheUniverse.Game();
}
