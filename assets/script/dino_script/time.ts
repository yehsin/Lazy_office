// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    timeNode: cc.Node = null;

    private gameTime: number; // remaining time

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private Timer(){
        this.gameTime = 10;
        this.schedule(function(){
            this.gameTime -= 1;
            if(this.gameTime < 0) this.gameTime = 0;
            this.timeNode.getComponent(cc.Label).string = String(this.gameTime);
        }, 1);
    }

    start () {
        this.Timer();
    }

    // update (dt) {}
}
