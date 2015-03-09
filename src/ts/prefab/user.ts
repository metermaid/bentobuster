module RitaConsumesTheUniverse.Prefab
{

  export class UserInfo
  {
    private labelFont = { font: "16px \"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif", fill: "#000000", align: "center" };
    private highScoreDisplay;
    private scoreDisplay;
    private levelDisplay;
    private hungerLabel;
    private happinessLabel;
    public hungerBar;
    public happinessBar;
    private score: number = 0;
    public level: number = 1;
    public hungerLoop;
    public happinessLoop;

    constructor(private game: RitaConsumesTheUniverse.Game, private state: RitaConsumesTheUniverse.State.Main, private offsetX: number, private offsetY: number)
    {
      this.game = game;
      this.hungerLabel = this.state.add.text(offsetX, offsetY, "Hunger", this.labelFont);
      this.hungerBar = new Prefab.Bar(this.game, offsetX, offsetY + 35);
      this.happinessLabel = this.state.add.text(offsetX, offsetY + 60, "Happiness", this.labelFont);
      this.happinessBar = new Prefab.Bar(this.game, offsetX, offsetY + 95);

      this.levelDisplay = this.state.add.text(offsetX, offsetY + 120, "Level: " + this.level, this.labelFont);
      this.scoreDisplay = this.state.add.text(offsetX, offsetY + 140, "Score: " + this.score, this.labelFont);
      this.highScoreDisplay = this.state.add.text(offsetX, offsetY + 160, "High Score: " + this.state.highScore, this.labelFont);

      this.hungerLoop = this.state.time.events.loop(250, this.hungerBar.increment, this.hungerBar);
      this.happinessLoop = this.state.time.events.loop(500, this.happinessBar.increment, this.happinessBar);
    }

    addScore(numClicked: number, typeData)
    {
      this.score += numClicked * typeData.happiness * 10;
      this.hungerBar.increment(numClicked * typeData.hunger);
      this.happinessBar.increment(numClicked * typeData.happiness);

      this.scoreDisplay.setText("Score: " + this.score + " (+" + (numClicked * typeData.happiness * 10) + ")");

      this.happinessLabel.setText("Happiness (+" + (numClicked * typeData.happiness) + ")");
      this.hungerLabel.setText("Hunger (+" + (numClicked * typeData.hunger) + ")");

      if (this.level < (this.score - (this.score % 5000))/5000)
      {
        this.level = (this.score - (this.score % 5000))/5000; 
        this.levelDisplay.setText("Level: " + this.level); 
        this.hungerLoop.delay = 175 / Math.log(this.level + 1); 
        this.happinessLoop.delay = 350 / Math.log(this.level + 1); 
      }
    }

    shutdown()
    {
      if (this.score > this.state.highScore)
        this.state.highScore = this.score;
    }
  }
}