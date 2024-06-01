// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StorageUser from "./StorageUser";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    @property(cc.Node)
    skinPopup: cc.Node = null;

    @property(cc.Node)
    namePopup: cc.Node = null;
    
    start(): void {
        // find StorageUser
        const userName = StorageUser.getInstance().userData?.name;
        if(userName) return;
        this.toggleNamePopup();
    }
    
    toggleSkinPopup(){
        this.skinPopup.active = !this.skinPopup.active
    }

    toggleNamePopup(){
        this.namePopup.active =!this.namePopup.active
    }

    
}
