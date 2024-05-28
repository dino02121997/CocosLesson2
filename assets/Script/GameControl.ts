// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Bird from "./Bird";
import Ground from "./Ground";
import PipePool from "./PipePool";
import Results from "./Results";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameControl extends cc.Component {
  
    @property({
        type: Ground,
        tooltip: 'This is ground'
    })
    public ground: Ground = null;

    @property({
        type: Results,
        tooltip: 'This is results'
    })
    public result: Results;

    @property(Bird)
    public bird: Bird;

    @property(PipePool)
    public pipeQueue: PipePool;

    @property({
        type: cc.Integer
    })
    public speed: number = 300;

    @property({
        type: cc.Integer
    })
    pipeSpeed:number = 200;

   isOver: boolean;
    
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.initListener();
        this.result.resetScore();
        this.isOver = true;
        cc.director.pause();
    }

    initListener() {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart() {
        if(this.isOver) {
            this.resetGame();
            this.bird.resetBird();
            this.startGame();
        }
        else{
            this.bird.fly();
        }
    }

    // onKeyDown(event: cc.Event.EventKeyboard) {
    //     switch (event.keyCode) {
    //         case cc.macro.KEY.a:
    //             this.gameOver();
    //             break;
    //         case cc.macro.KEY.space:
    //             this.startGame();
    //             break;
    //         case cc.macro.KEY.p:
    //             this.result.addScore();
    //             break;
    //         case cc.macro.KEY.q:
    //             this.resetGame();
    //             this.bird.resetBird();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    startGame() {
        this.result.hideResults();
        cc.director.resume();
    }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        cc.director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.pipeQueue.resetPool();
        this.isOver = false;
        this.startGame();
     
    }

    passPipe(){
        this.result.addScore();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    birdStruck() {
        this.gameOver();
    }
    // update (dt) {}
}
