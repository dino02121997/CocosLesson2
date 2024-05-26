// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameControl from "./GameControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bird extends cc.Component {

    @property(cc.Float)
    public jumpHeight: number = 3.5;

    @property(cc.Float)
    public jumpDuration: number = 3.5;
 
    public birdAnimation: cc.Animation;
    public birdLocation: cc.Vec3;
    public hitSomething: boolean;
    // LIFE-CYCLE CALLBACKS:

    public game: GameControl

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.resetBird();
        this.birdAnimation = this.getComponent(cc.Animation);
        this.game = cc.find('GameControl').getComponent(GameControl);
    }



    resetBird(){
        this.birdLocation = new cc.Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.hitSomething = false;
    }

    fly(){
        this.birdAnimation.stop();
        const targetPosition = new cc.Vec3(this.node.position.x, this.node.position.y + this.jumpHeight,0)
        cc.tween(this.node).to(this.jumpDuration,
                                        { position : targetPosition},
                                        {  
                                            easing: 'smooth',
                                            onUpdated: (target: cc.Vec3,ratio: number) =>
                                            {
                                                this.node.position = target;
                                                cc.log('setPosition')
                                            }
                                        }).start();
        this.birdAnimation.play();
    }

    

    onCollisionEnter(other, self){
        console.log("collisionEnter")
        this.hitSomething = true;
        this.game.birdStruck();
    }
    // update (dt) {}
}
