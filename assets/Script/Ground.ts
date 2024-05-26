// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ground extends cc.Component {

    @property({
        type: cc.Node,
        tooltip: "Ground 1 is here"
    })
    public ground1: cc.Node;

    @property({
        type: cc.Node,
        tooltip: "Ground 2 is here"
    })
    public ground2: cc.Node;

    @property({
        type: cc.Node,
        tooltip: "Ground 3 is here"
    })
    public ground3: cc.Node;

    public gameControl : GameControl;

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1 = new cc.Vec3;
    public tempStartLocation2 = new cc.Vec3;
    public tempStartLocation3 = new cc.Vec3;



    public gameSpeed:number;

    

    onLoad () {
        this.startUp()
        this.gameControl = cc.director.getScene().getComponentInChildren('GameControl').getComponent(GameControl);
    }

    startUp () {
        this.groundWidth1 = this.ground1.width;
        this.groundWidth2 = this.ground2.width;
        this.groundWidth3 = this.ground3.width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    start () {

    }

    update (dt) {
        this.gameSpeed = this.gameControl.speed;

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        // get the speed and subtract
        this.tempStartLocation1.x -= this.gameSpeed * dt;
        this.tempStartLocation2.x -= this.gameSpeed * dt;
        this.tempStartLocation3.x -= this.gameSpeed * dt;

        const scene = cc.director.getScene();
        const canvas = scene.getComponentInChildren(cc.Canvas);

        if(this.tempStartLocation1.x <= (0 - this.groundWidth1)){
            this.tempStartLocation1.x = canvas.node.width;
        }
        if(this.tempStartLocation2.x <= (0 - this.groundWidth2)){
            this.tempStartLocation2.x = canvas.node.width;
        }
        if(this.tempStartLocation3.x <= (0 - this.groundWidth3)){
            this.tempStartLocation3.x = canvas.node.width;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
        // check if the ground is off the screen
    }
}
