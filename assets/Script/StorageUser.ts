// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

interface UserData {
    name: string;
    score: number
}
@ccclass
export default class StorageUser extends cc.Component {
   

    userData : UserData = {
        name: null,
        score: 0
    };

    static instance: StorageUser;

    static getInstance(): StorageUser {
        if (!StorageUser.instance) {
          let node = new cc.Node("StorageUser");
          StorageUser.instance = node.addComponent(StorageUser);
          cc.game.addPersistRootNode(StorageUser.instance.node);
        }
        return StorageUser.instance;
      }
    
    onLoad () {
        this.userData = JSON.parse(cc.sys.localStorage.getItem('userData')) ?? this.userData; 
    }

    setNewScore(score:number) {
        this.userData.score = score;
        cc.sys.localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    setNewName(name:string) {
        console.log('a',name);
        this.userData.name = name;
        console.log('b',this.userData.name);
        cc.sys.localStorage.setItem('userData', JSON.stringify(this.userData));
    }
}
