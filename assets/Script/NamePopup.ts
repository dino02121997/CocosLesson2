// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StorageUser from "./StorageUser";



const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    userName: cc.EditBox = null;

 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.userName.string = StorageUser.getInstance().userData?.name
    }
    
    onChangeUserName(){
        if(!this.userName.string) return;
        console.log(this.userName.string)
        
        StorageUser.getInstance().setNewName(this.userName.string);
        this.node.active = false;
    }
    // update (dt) {}
}
