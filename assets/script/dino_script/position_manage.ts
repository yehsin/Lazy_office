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
    catusNode : cc.Node = null;

    @property(cc.Node)
    catus2Node : cc.Node = null;

    @property(cc.Node)
    birdNode : cc.Node = null;

    private speedup: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.schedule(function(){
            this.speedup +=1;
        }, 3);
    }

    update (dt) {
        this.catusNode.x -= (8+this.speedup);
        this.catus2Node.x -= (8+this.speedup);
        this.birdNode.x -= (8+this.speedup);
        if (this.birdNode.x <-660){
            this.birdNode.x = Math.random()*10000 + 3200;
        }
        if (this.catusNode.x < -500){
            cc.log(Math.random()*1000);
            this.catusNode.x = Math.random()*100 + 500;
        }
        if (this.catus2Node.x < -500){
            cc.log(Math.random()*1000);
            this.catus2Node.x = Math.random()*10000 + 1200;
        }

        if (Math.abs(this.catusNode.x - this.catus2Node.x) < 300){
            this.catus2Node.x += 400;
        }
        if (Math.abs(this.catusNode.x - this.birdNode.x) < 300){
            this.birdNode.x += 400;
        }
        if (Math.abs(this.catus2Node.x - this.birdNode.x) < 300){
            this.birdNode.x += 400;
        }
    }
}
