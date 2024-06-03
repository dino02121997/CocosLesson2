// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const { ccclass, property } = cc._decorator;

@ccclass
export default class PersistNode extends cc.Component {

    @property(cc.Label)
    loadingText: cc.Label = null;
    

    public scene1: cc.SceneAsset;
    onLoad() {
        cc.game.addPersistRootNode(this.node)
    }
    loadNextScene() {

        cc.log("loadNextScene1");
        cc.tween(this.node)
            .to(1, { position: new cc.Vec3(320, 480, 0) },{easing: 'cubicInOut'})
            .call((target:cc.Vec3) => { 
                this.node.position = target;
                this.loadScene();
            })
            .start();
    }
 
    loadScene() {
        const self = this;
        cc.assetManager.loadBundle('Game1AB', (err, bundle) => {
            console.log(bundle);
            bundle.preload('Scene/Game1', cc.SceneAsset, 
            (finish, total, item) => {
                cc.log('cccc')
                cc.log(finish, total, item);
                this.loadingText.string = `Loading...`;
            }, 
            (err, value) => { 
                bundle.loadScene('Scene/Game1', function (err, scene) {
                    console.log('scene',scene) // trong nafy
                    cc.tween(self.node)
                    .to(1, { position: new cc.Vec3(-320, 480, 0) }, { easing: 'cubicInOut'})
                    .call((target:cc.Vec3) => {
                        self.node.position = target;
                        cc.director.runScene(scene);
                    })
                    .start();
                    
                });
            })
            
        });

        // cc.director.preloadScene('Game1',
        //  (completedCount: number, totalCount: number, item: any) => {
        //     this.loadingText.string = `Loading...${completedCount}/${totalCount}`;
        //     console.log(completedCount, totalCount,item)
        //  }, 
        // () => {
        //     cc.director.loadScene('Game1',() => {
        //         cc.log("loadScene");
        //         cc.find('GameControl').getComponent(GameControl).onTouchStart();
        //     });
        // })
      
    }

}
