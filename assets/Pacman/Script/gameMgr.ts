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

    @property({ type: cc.AudioClip })
    click_restart_sound: cc.AudioClip = null;

    @property(cc.Node)
    private gameoverNode:cc.Node = null;

    @property(cc.Node)
    private levelsuccessNode:cc.Node = null;

    @property(cc.Node)
    private timeoutNode:cc.Node = null;

    @property(cc.Node)
    private finalscoreNode:cc.Node = null;

    @property(cc.Node)
    private showScore: cc.Node = null;

    @property(cc.Node)
    private restartBtn: cc.Node = null;

    @property(cc.Node)
    private exitBtn: cc.Node = null;

    private score: number = 0;

    private mainScore :number = 0;

    private Hscore:number = 0;

    private totalScore:number = 0;

    @property(cc.Node)
    private showTime: cc.Node = null;

    private timer: number = 30;

    private user_ID:string = '321';

    private gametime;

    private isAlive:boolean = true;

    private isComplete:boolean = false;

    private isFind:boolean = false;

    private noTime: boolean = false;
    // LIFE-CYCLE CALLBACKS:

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    eatingEffect: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    winningBgm: cc.AudioClip = null;


    onLoad () {
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
        this.levelsuccessNode.opacity = 0;
        this.gameoverNode.opacity = 0;
        //his.timeoutNode.opacity = 0;
        //this.restartBtn.getComponent(cc.Button).interactable = false;
        //this.exitBtn.getComponent(cc.Button).interactable = false;
        //this.gameoverNode.getChildByName('RestartBtn').getComponent(cc.Button).interactable = false;
        //this.gameoverNode.getChildByName('ExitBtn').getComponent(cc.Button).interactable = false;
    }

    start () {
        this.loadUserData();
        cc.audioEngine.play(this.bgm, false, 0.8);
        this.schedule(function(){
            cc.audioEngine.play(this.eatingEffect, true, 0.5);
        },0 , 1, 4.3);
        this.timerDown();
    }

    private timerDown(){
        this.schedule(function(){
            this.timer -= 1;
            this.showTime.getComponent(cc.Label).string = String(this.timer);
        }, 1)
    }

   
    
    private updateScore(num){
        this.score += num;
        this.showScore.getComponent(cc.Label).string = String(this.score);
    }

    private loadUserData() {
        
        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        cc.log("load user ",this.user_ID, "data");
        //this.user_ID = firebase.auth().currentUser.uid;
        //var scene = cc.director.getScene().name;

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", (snapshot)=>{
            this.Hscore = snapshot.val().status;
            this.totalScore = snapshot.val().totalScore;
            this.mainScore = snapshot.val().Score;
            this.gametime = snapshot.val().time;
        })

        //timer
        if(this.gametime < 30){
            this.timer = this.gametime;
        }
    
    }

    private writedata(state:string){
        cc.log("write data to database",this.user_ID,state);
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        if(state=="timeout"){
            userRef.update({
                time: this.gametime - 30,
                minigameScore: '0',
                status:'endgame_pac'
            })

        }else if(state=="gameover"){
            this.totalScore = this.mainScore + this.totalScore;
            
            if(this.Hscore < this.mainScore){ //new record
                userRef.update({
                    Score:this.mainScore,
                    time: "120",
                    HScore: this.mainScore,
                    totalScore:this.totalScore,
                    status:'start'
                })


            }
            else{
                userRef.update({
                    Score:this.mainScore,
                    time: "120",
                    totalScore:this.totalScore,
                    status:'start'
                })

            }
            cc.log("write data when gameover")

        }else if(state=="success"){
            userRef.update({
                time: this.gametime - 30,
                minigameScore: this.score,
                status:'endgame_pac'
            })

        }
        
        
    }

    restart(){
        cc.log('restart!');
        //cc.audioEngine.playEffect(this.click_restart_sound,false);
        cc.director.loadScene('working');
    }
    exit(){
        cc.log('exit!');
        //cc.audioEngine.playEffect(this.click_restart_sound,false);
        cc.director.loadScene('userInfo');

    }

    private gameOver(){
        cc.log("GameOver")
        //cc.director.pause();
        cc.audioEngine.pauseAll();
        this.isAlive = false;
        this.mainScore = this.mainScore + this.score - 300; //score calculate

        this.writedata("gameover");
        cc.director.loadScene('GameOver')
        

    }

    backTowork(){
        cc.director.loadScene('working');
    }

    private timeout(){
        cc.log("timeout");
        this.isAlive = true;
        this.writedata("timeout");
        //this.timeoutNode.opacity = 255;
        cc.audioEngine.stopAll();
        this.scheduleOnce(this.backTowork,3);
        //cc.director.loadScene('working');
        //TODO: schedule
        //this.gameoverNode.opacity = 0;
        //cc.director.loadScene("pantry");

    }

    levelcomplete(){
        cc.log("success");
        this.writedata("success");
        this.levelsuccessNode.opacity = 255;
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.winningBgm, false);
        this.scheduleOnce(this.backTowork,3);

        //return true;

    }

    private notime(){
        if (this.noTime)
            return true;
        else
            return false;
    }

    update (dt) {
        if (this.timer <= 0){
            this.timer = 1;
            this.noTime = true;
            if(this.isComplete==false){
                this.isComplete = true;
                this.timeout();
            }
            
        }
//TODO: delete this
        
            
        }


}
