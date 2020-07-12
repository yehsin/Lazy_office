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

    @property(cc.Label)
    label: cc.Label = null;

    @property({type:cc.AudioClip})
    bgm : cc.AudioClip = null;

    @property(cc.Node)
    radio : cc.Node = null;

    @property(cc.Node)
    coffee: cc.Node = null;

    @property(cc.Node)
    play: cc.Node = null;


    private palybgm = true;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /*
        this.radio.on('click',()=>{
            if(this.palybgm){
                cc.audioEngine.pauseMusic();
                this.palybgm = false;
            }
            else if(!this.palybgm){
                cc.audioEngine.resumeMusic();
                this.palybgm = true;
            }
        })
        */

        /*

        this.coffee.on('click',()=>{
            cc.director.loadScene('game2');
        })
        */

        /*this.coffee.on('mousemove',()=>{
            let action = cc.scaleBy(2,2);
            this.coffee.runAction(action);
        })*/
/*
        this.play.on('click',()=>{
            cc.director.loadScene('game1');
        })
        */
    }

    start () {
        //cc.audioEngine.playMusic(this.bgm,true);
    }

    animation(){
        
    }



    // update (dt) {}
}
