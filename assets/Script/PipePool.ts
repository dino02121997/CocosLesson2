// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class PipePool extends cc.Component {

    @property(cc.Prefab)
    public prefabPipe: cc.Prefab = null;

    @property(cc.Node)
    public pipePoolHome: cc.Node = null;
    
    public pool = new cc.NodePool();
    public createPipe;

    initPool () {
        let initCount = 3;
        for (let i = 0; i < initCount; i++) {
            this.createPipe = cc.instantiate(this.prefabPipe);
            if(i == 0)
                this.pipePoolHome.addChild(this.createPipe);
            else 
                this.pool.put(this.createPipe);
        }
    }

    addPool() {
        if(this.pool.size() > 0 ){
            this.createPipe = this.pool.get();
        }
        else{
            this.createPipe = cc.instantiate(this.prefabPipe);
        }
        this.pipePoolHome.addChild(this.createPipe);

    }

    resetPool() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
