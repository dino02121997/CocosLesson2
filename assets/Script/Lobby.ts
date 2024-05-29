// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    @property(cc.Node)
    skinPopup: cc.Node = null;
    
    toggleSkinPopup(){
        console.log( this.skinPopup)
        this.skinPopup.active = !this.skinPopup.active
       //this.skinPopup.getComponent(cc.Canvas).enabled = this.skinPopup.getComponent(cc.Canvas).enabled;
    }
}
