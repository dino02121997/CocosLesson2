// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;
const random = (min,max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
@ccclass
export default class Pipes extends cc.Component {

    @property(cc.Node)
    public topPipe: cc.Node = null;

    @property(cc.Node)
    public bottomPipe: cc.Node = null;

    public tempStartLocationUp: cc.Vec3 = new cc.Vec3(0,0,0);
    public tempStartLocationDown: cc.Vec3 = new cc.Vec3(0,0,0);
    public scene = cc.view.getFrameSize();

    public gameControl: GameControl; // speed off the pipes from GameControl
    public pipeSpeed: number = 0; // final speed of the pipes
    public tempSpeed: number = 0; // temporary speed of the pipes

    isPass: boolean;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameControl = cc.find('GameControl').getComponent(GameControl);
        this.pipeSpeed = this.gameControl.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    initPos() {
        this.tempStartLocationUp.x = this.topPipe.width + this.scene.width;
        this.tempStartLocationDown.x = this.bottomPipe.width + this.scene.width;

        let gap = random(90,100);
        let topHeight = random(0,450);
        let bottomHeight = topHeight - (gap * 10);

        // let bottomHeight = this.scene.height - topHeight - gap;

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = bottomHeight;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
    }

    update (dt) {
        this.tempSpeed = this.pipeSpeed * dt;

        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown = this.bottomPipe.position;


        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);

        // this.checkPass();

        if(this.isPass == false  && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.gameControl.passPipe();
        }
        if(this.topPipe.position.x < (0 - this.scene.width)){
            console.log('destroying')
            this.gameControl.createPipe();
            this.destroy();
        }


        
    }
    checkPass(){
        if(this.topPipe.position.x <= -this.topPipe.width){
            this.initPos();
        }
        if(this.bottomPipe.position.x <= -this.bottomPipe.width){
            this.initPos();
        }
        if(this.topPipe.position.x <= -this.topPipe.width && this.bottomPipe.position.x <= -this.bottomPipe.width){
            this.destroy();
        }
    }
}
