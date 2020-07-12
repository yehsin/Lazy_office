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
export default class computer extends cc.Component {

    @property({ type: cc.AudioClip })
    click_sound: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    type_sound: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    horror_sound: cc.AudioClip = null;

    @property(cc.Node)
    GMR : cc.Node = null;

    @property(cc.Node)
    workingBtn:cc.Node = null;

    @property(cc.Node)
    watchingBtn:cc.Node = null;

    @property(cc.Node)
    closeBtn:cc.Node = null;

    @property(cc.Node)
    working:cc.Node = null;

    @property(cc.Node)
    watching:cc.Node = null;
    

    isPlaying:boolean = false;

    isWorking:boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.workingBtn.on('click',()=>{
            cc.audioEngine.playEffect(this.click_sound,false);
            cc.log('working! open word!');
            cc.audioEngine.play(this.type_sound, true,  0.5);
            this.isPlaying = false;
            this.isWorking = true;
            this.working.opacity = 255;
            this.watching.opacity = 0;
            this.closeBtn.opacity = 255;
            this.GMR.getComponent('maingame_mgr').stateChange(this.isPlaying,this.isWorking);
        });      
        this.watchingBtn.on('click',()=>{
            cc.audioEngine.playEffect(this.click_sound,false);
            cc.log('watching video');
            cc.audioEngine.play(this.horror_sound, true,  0.5);
            this.isPlaying = true;
            this.isWorking = false;
            this.working.opacity = 0;
            this.watching.opacity = 255;
            this.closeBtn.opacity = 255;
            this.GMR.getComponent('maingame_mgr').stateChange(this.isPlaying,this.isWorking);

        });

        this.closeBtn.on('click',()=>{
            cc.log('Do nothing');
            cc.audioEngine.stopAll();
            this.isPlaying = false;
            this.isWorking = false;
            this.working.opacity = 0;
            this.watching.opacity = 0;
            this.closeBtn.opacity = 0;
            this.GMR.getComponent('maingame_mgr').stateChange(this.isPlaying,this.isWorking);

        });

    }

    start () {

    }

    getPlayingState() {
        //cc.log("state:",this.isPlaying);
        return this.isPlaying;
    }

    getWorkingState() {
        //cc.log("state:",this.isPlaying);
        return this.isWorking;
    }

    // update (dt) {}
}
