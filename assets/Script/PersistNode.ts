// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameControl from "./GameControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersistNode extends cc.Component {

    @property(cc.Label)
    loadingText: cc.Label = null;
    

    // LIFE-CYCLE CALLBACKS:
    public game: GameControl;
    onLoad() {
        cc.game.addPersistRootNode(this.node)
    }
    loadNextScene() {

        cc.log("loadNextScene2");

        cc.tween(this.node)
            .to(1, { position: new cc.Vec3(320, 480, 0) },{easing: 'cubicInOut'})
            .call(() => {this.loadScene();})
            .to(1, { position: new cc.Vec3(-320, 480, 0) }, { easing: 'cubicInOut'})
            .start();
    }
 
    loadScene() {
        cc.director.preloadScene('Game1',
         (completedCount: number, totalCount: number, item: any) => {
            this.loadingText.string = `Loading...${completedCount}/${totalCount}`;
            console.log(completedCount, totalCount,item)
         }, 
        () => {
            cc.director.loadScene('Game1',() => {
                cc.log("loadScene");
                cc.find('GameControl').getComponent(GameControl).onTouchStart();
            });
        })
      
    }

}
