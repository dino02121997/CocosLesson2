// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Result extends cc.Component {

    @property(cc.Label)
    public scoreLabel: cc.Label = null;

    @property(cc.Label)
    public hightScore: cc.Label = null;

    @property(cc.Button)
    public resultEnd: cc.Button = null;

    maxScore: number = 0;
    currentScore:number;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    updateScore(num:number) {
        this.currentScore = num;
        this.scoreLabel.string = `Score ${this.currentScore}`
    }

    resetScore() {
        this.updateScore(0);

        this.hideResults(); 
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.hightScore.string = `Top Score ${this.maxScore}`;

        this.resultEnd.node.active = true;
        this.hightScore.node.active = true;
    }

    hideResults() {
        this.hightScore.node.active = false;
        this.resultEnd.node.active = false;
    }
}
