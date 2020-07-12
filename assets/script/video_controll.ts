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

    @property(cc.VideoPlayer)
    video: cc.VideoPlayer = null;

    @property(cc.Node)
    button: cc.Node = null;

    @property(cc.Node)
    work: cc.Node = null;

    @property(cc.VideoPlayer)
    workVideo: cc.VideoPlayer = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.video.enabled = false;
        this.button.on('click',()=>{
            this.workVideo.enabled = false;
            this.video.enabled = true;
            this.video.play();
        })
        this.work.on('click',()=>{
            this.video.enabled = false;
            this.workVideo.enabled = true;
            this.workVideo.play();

        })
    }


    start () {

    }

    // update (dt) {}
}
