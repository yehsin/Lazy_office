// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import fa from "../../build/web-desktop/src/assets/script/firebase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameover extends cc.Component {

    @property(cc.Node)
    restartBtn:cc.Node = null;

    @property(cc.Node)
    exitBtn:cc.Node = null;

    @property(cc.Node)
    scoreNode:cc.Node = null;

    @property({ type: cc.AudioClip })
    bgm_gameover: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    click: cc.AudioClip = null;

    private user_ID;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });

        this.restartBtn.on('click',()=>{
            cc.audioEngine.stopAll();
            cc.audioEngine.playEffect(this.click,false);
            cc.log('restart');
            cc.director.loadScene('userInfo');
        });

        this.exitBtn.on('click',()=>{
            /*
            cc.log('ecit');
            cc.director.loadScene('userInfo');
            
            */
           cc.audioEngine.stopAll();
           cc.audioEngine.playEffect(this.click,false);
           window.close();
        });

        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        cc.log("load user ",this.user_ID, "data");

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", (snapshot)=>{
            var score:number = snapshot.val().Score;
            this.scoreNode.getComponent(cc.Label).string = String(score);
        })
        

        

    }

    start () {
        cc.audioEngine.playEffect(this.bgm_gameover,false);

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.update({
            Score:'0'
        });

    }

    // update (dt) {}
}
