import fa from "../../build/web-desktop/src/assets/script/firebase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class boss extends cc.Component {

    private anim_str:string = ""; // "sleep" "walk" "catch" "angry" "back"

    private animPlay : cc.Animation = null;

    private animState;

    private boss_state:string = "";

    private sleep_time:number = 3;

    private isCatch:boolean = false;

    private scene:string="";

    private user_ID:string = "";

    private isSend:boolean = false;

    private isStart:boolean =false;

    @property(cc.Node)
    computer: cc.Label = null;

    @property(cc.Node)
    QTE: cc.Label = null;

    @property(cc.Node)
    gameMgr: cc.Label = null;

    @property(cc.Node)
    lazygameMgr: cc.Label = null;

    @property({ type: cc.AudioClip })
    walking_sound: cc.AudioClip = null;

    private score:number = 0;
    private totalScore:number = 0;
    private HScore:number = 0;

    


    // LIFE-CYCLE CALLBACKS:

    onKeyDown(event){
        //cc.log("Key Down: " + event.keyCode);
        if (event.keyCode == cc.macro.KEY.q){
            cc.log("debug mode long");

            if(this.isStart ){
                if(this.animState.name=='sleep' )
                    this.animState.repeatCount = 7;
            }
            
            
        }
        else if(event.keyCode == cc.macro.KEY.e){
            cc.log("debug mode short");

            if(this.isStart ){
                if(this.animState.name=='sleep' )
                    this.animState.repeatCount = 1;
            }

        }
        
       
    }

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.isStart = false;
        
        this.anim_str = "";
        this.loadAnimStr();
        this.animPlay = this.getComponent(cc.Animation);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))+3;
    }

    loadAnimStr() {
        
        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", (snapshot) => {
          cc.log(
            'bossState',snapshot.val().bossState
          );

          /* //TODO:
          if(this.scene!='working'){
              this.score =snapshot.val().Score;
              this.totalScore= snapshot.val().totalScore;
              this.HScore = snapshot.val().HScore;

          }
          */
         
    
          this.anim_str = snapshot.val().bossState;
          if(snapshot.val().status=="endgame_restart"){
              cc.log("endgame_restart");
            if(this.anim_str=="sleep"){
                this.sleep_time = 1;
            }
        }
          cc.log("load boss state:",this.anim_str);
          //if(this.anim_str){
            this.animState = this.animPlay.play(this.anim_str);

            this.isStart = true;
          //}
          if(this.anim_str=='sleep'){
            this.animState.wrapMode = cc.WrapMode.Loop;
            this.animState.repeatCount = this.sleep_time; 
            cc.log(this.sleep_time);
            }
    
          
        });

        
      }
      GameOver(){
        //cc.audioEngine.pauseAll();
        //cc.audioEngine.playMusic(this.bgm_success,true); //TODO: cannot play 
    
        //cc.log("GameOver at dino scene");
    
        this.score = this.score - 300;

        cc.log("GameOver at dino scene",this.score);
    
    
        this.totalScore = this.totalScore + this.score;
        
    
        cc.audioEngine.pauseAll();
    
        //this.isDead = true;

        var userRef = firebase.database().ref("/user/" + this.user_ID);

        if(this.score > this.HScore){//new record
            userRef.update({
                Score:this.score,
                HScore:this.score,
                totalScore:this.totalScore,
                status:'start',
                bossState:'sleep',
                time:'180'

            })

        }
        else{
            userRef.update({
                Score:this.score,
                totalScore:this.totalScore,
                status:'start',
                bossState:'sleep',
                time:'180'

            })

        }

        
    
       
    
        cc.director.loadScene("GameOver");
        
    
      }

    start () {
        
        this.scene = cc.director.getScene().name;
        this.sleep_time = this.getRandomInt(3);

        this.loadAnimStr();
        
        //this.sleep_time = this.getRandomInt(3);
        //cc.log("boss start at",this.scene);
        //this.anim_str = "sleep";
        //this.setAnim(this.anim_str);
       // cc.log("start anim:",this.anim_str);
       /*
        this.animState =  this.animPlay.play(this.anim_str);
        if(this.anim_str=='sleep'){
            this.animState.wrapMode = cc.WrapMode.Loop;
            this.animState.repeatCount = this.sleep_time;   
        }

        //TODO: transition when angry?
        */
        
        

    }

    setAnim(anim_s:string){

        //cc.log('setAnim');

        if(anim_s == this.anim_str) return;
    
        else{
          this.anim_str = anim_s;
          //cc.log('not return');
        }
    
        //this.animPlay.play(this.anim_str);

        this.animState = this.animPlay.play(this.anim_str);
        //cc.log('play:',this.anim_str);

        
        if(this.anim_str == "sleep"){
            this.animState.wrapMode = cc.WrapMode.Loop;
            this.animState.repeatCount = this.sleep_time;
            cc.log(this.sleep_time);
        }
        else if(this.scene!='working'&&this.anim_str=='catch'){
            this.animState.wrapMode = cc.WrapMode.Loop;
        }
        else{
            this.animState.wrapMode = cc.WrapMode.Normal;
            this.animState.repeatCount = 1;

        }
        if(this.anim_str == 'walk'){
            //cc.audioEngine.playEffect(this.walking_sound,false);
        }
        
    
        
    
    
      }
   
    getAnimState(){
        return this.animState.name;
    }

    setAnimState(anim:string){
        cc.log(anim);
        this.setAnim(anim);
        
    }

    update (dt) {

        if(this.isStart==true){
            //cc.log(this.isCatch);
            if(this.animState && this.animState.isPlaying == false && this.animState.isPaused==false){
                //cc.log("stop")
                if(this.animState.name=="walk"){
                    this.isSend = false;
                   
                    this.sleep_time = this.getRandomInt(3);
                    //this.anim_str = "catch";
                    this.setAnim("catch");
                }
                else if(this.animState.name=="sleep"){
                    //this.anim_str = "walk";
                    this.setAnim("walk");
                }
                else if(this.animState.name=="catch"){
                    if(this.scene == 'working') this.setAnim("back");
                    //this.anim_str = "back";
                    
                   
                }
                else if(this.animState.name=="walk"){
                    //this.anim_str = "catch";
                    this.setAnim( "catch");
                }
                else if(this.animState.name == "angry"){
                    if(this.isCatch ==false){
                        this.isCatch = true;
                        cc.log("call gameover");
    
                        if(this.scene=='working'){
                            this.gameMgr.getComponent('maingame_mgr').GameOver();
                        }
                        else {
                            this.QTE.getComponent('QTE').changeQTEingState();
                            this.lazygameMgr.getComponent('lazy_game_gameMan').GameOver();
                        }
    
                    }
                    //call function at maingame_mgr
                }
                else if(this.animState.name == "back"){
                    //this.anim_str = "sleep";
                    this.isCatch = false;
                    this.setAnim("sleep");
                }
    
                //cc.log('try to play:',this.anim_str);
            }
            else if(this.animState.isPlaying == true && this.animState.name == "catch"){
                //cc.log("workstate:",this.computer.getComponent('computer').getPlayingState());
                if(this.scene=='working'){

                    if(this.computer.getComponent('computer').getPlayingState() == false && this.computer.getComponent('computer').getWorkingState()==false){ //
                        if(this.isCatch==false){
                            this.isCatch=true;
                            this.gameMgr.getComponent('maingame_mgr').updateScore(-100);
                        }
                        
                        //cc.log("nothing happen");
                    }
                    else if(this.computer.getComponent('computer').getPlayingState() == true && this.computer.getComponent('computer').getWorkingState()==false){
                        //cc.log("lazy!!");
                        //this.anim_str="angry";
                        this.setAnim("angry");
                        
        
                    }
    
                }
                else{//dino
                    
                    if(this.isSend==false){
                        this.isSend = true;
                        this.QTE.getComponent('QTE').catchDetect();
                    }
    
                }
                
    
            }

        }

        //cc.log(this.anim_str,this.animState.name,this.animState.isPlaying);
       // cc.log(this.animState.name,this.animState.isPlaying,this.animState.isPaused);

        



    }
}
