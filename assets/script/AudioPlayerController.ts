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

    @property([cc.Button])
    audioButton: cc.Button[] = [];

    @property({type: cc.AudioClip})
    audioClips: cc.AudioClip[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    playAudioClip(){
        cc.audioEngine.resumeMusic();
    }

    pauseAudioClip(){
        cc.audioEngine.pauseMusic();
    }

    start () {
        for(var i=0;i<this.audioClips.length;i++){
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "AudioPlayerController";
            clickEventHandler.handler = "changeAudioClip";
            clickEventHandler.customEventData = "" + i;
            this.audioButton[i].clickEvents.push(clickEventHandler);
        }
    }

    changeAudioClip(event, customEventData){
        cc.audioEngine.playMusic(this.audioClips[customEventData],false);
    }


    // update (dt) {}
}
