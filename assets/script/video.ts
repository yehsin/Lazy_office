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

    @property({type:cc.AudioClip})
    scream_sound: cc.AudioClip = null;

    @property(cc.Node)
    private gameMgr: cc.Node = null;

    private video_animation: cc.Animation = null;

    private timer: number = 26;

    private playing: boolean = false;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.video_animation = this.node.getComponent(cc.Animation);
        //this.video_animation.play("video");
    }

    private timerDown(){
        this.schedule(function(){
            this.timer -= 1;
        }, 1)
    }

    start () {
        this.timerDown();
    }

    

    update (dt) {
        //cc.log(this.timer);

        if (this.timer <=3){
            //cc.audioEngine.playEffect(this.scream_sound, false);
            if (this.timer <= 0){
                cc.log("Finish Video");
                this.timer = 23;
                this.gameMgr.getComponent("maingame_mgr").updateScore(1000);
            }
        }
        

        if (this.node.opacity == 0){
            this.video_animation.stop();
            this.playing = false;
            this.timer = 23;
        }

        if (this.node.opacity == 255 && this.playing == false){
            cc.log("Video Playing");
            this.playing = true;
            this.timer = 23;

            this.video_animation.play("video");
            
            
        }
    }

}
