// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Skins extends cc.Component {

    @property(cc.Sprite)
    skinImage: cc.Sprite;
    

    start () {

    }

    changeSkin(){
        var self = this;
        cc.resources.load("texture/redbird-midflap", cc.SpriteFrame, function (err, spriteFrame: cc.SpriteFrame) {
            self.skinImage.spriteFrame = spriteFrame;
        });
    }
}
