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
    Time: cc.Node = null;

    @property(cc.Node)
    Score: cc.Node = null;

    @property(cc.Node)
    resultbg: (cc.Node) = null;

    @property(cc.Node)
    scoretitle: (cc.Node) = null;

    @property(cc.Node)
    showScore: (cc.Node) = null;

    @property(cc.Node)
    dinoLife: (cc.Node) = null;
    
    @property(cc.Node)
    restart: (cc.Node) = null;

    @property(cc.Node)
    result_Man: (cc.Node) = null;

    @property(cc.Node)
    QTE: cc.Node = null;

    @property(cc.Node)
    Boss : cc.Node = null;

    @property(cc.Node)
    Dino:cc.Node=null;
    
    private score : number;
    private gametime : number;
    private isTimeover : boolean = false;
    private user_ID;
    private show = false;
    private mainScore:number = 0;
    private totalScore:number = 0;
    private HScore:number = 0;

    

    private loadUserData() {
        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var ScoreNum = 0;

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", (snapshot)=>{
            this.gametime = snapshot.val().time;
            this.score = 0;
            this.mainScore = snapshot.val().Score;
            this.totalScore = snapshot.val().totalScore;
            this.HScore = snapshot.val().HScore;
            cc.log('office:',snapshot.val().office);
            if(snapshot.val().office=='BASIC'){
                this.Dino.getComponent('dinosour').changrDinoSkin(false);
            }
            else{
                this.Dino.getComponent('dinosour').changrDinoSkin(true);

            }
        })
    
    }

    private runUserdata(){
        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", (snapshot)=>{
            this.gametime = snapshot.val().time;
            this.score = Number(snapshot.val().minigameScore);
        })
    }

    private Timer(){
        this.schedule(()=>{
            this.gametime -= 1;
            if(this.score>=0) this.score += 10;
            if(this.gametime <= 0 && this.isTimeover == false){
                this.isTimeover = true;
            }

            
        },1)

        if(this.gametime <0) this.gametime = 0;
        
    }

    private writrdata(state:string){ //"success"

        var userRef = firebase.database().ref("/user/" + this.user_ID);
        if(state == "restart"){
            var anim = this.Boss.getComponent('boss').getAnimState();
            cc.log("restart with anim:",anim,'\nscore:',this.Score.getComponent(cc.Label).string);
            userRef.update({
                time: this.gametime,
                minigameScore: this.Score.getComponent(cc.Label).string,
                status: 'endgame_restart',
                bossState:anim,
            })

        }
        else if(state == "success"){
            var anim = this.Boss.getComponent('boss').getAnimState();
            cc.log("success with anim:",anim,'\nscore:',this.Score.getComponent(cc.Label).string);

            userRef.update({
                time: this.gametime,
                minigameScore: this.Score.getComponent(cc.Label).string,
                status: 'endgame_dino',
                bossState:anim,
            })
        }

        
    }

    private show_result(){
        this.result_Man.opacity = 255;
        this.resultbg.opacity = 150;
        this.scoretitle.opacity = 255;
        this.showScore.opacity = 255;
        this.restart.opacity = 255;
        //this.back.opacity = 255;

        this.showScore.getComponent(cc.Label).string = String(this.score);

        this.restart.getComponent(cc.Button).interactable = true;
        //this.back.getComponent(cc.Button).interactable = true;
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadUserData();
        
        this.gametime = Number(this.Time.getComponent(cc.Label).string);
        

        this.restart.getComponent(cc.Button).interactable = false;
        //this.back.getComponent(cc.Button).interactable = false;
        this.restart.on('click',()=>{
            cc.log('click');
            var anim = this.Boss.getComponent('boss').getAnimState();

            if(cc.director.getScene().name == 'dino_game' && anim!='angry'){
                cc.log('click');
                //this.dinoLife.getComponent("dinosour").dinoLife = true;
                //cc.director.resume();
                this.writrdata('restart');
                cc.director.loadScene('dino_game');
            }
            else{
                //this.dinoLife.getComponent("dinosour").dinoLife = true;
                cc.log('pack');
                //cc.director.resume();
                cc.director.loadScene('PAC_MAN');
            }
        });
        /*this.back.on('click',()=>{
            this.writrdata();
            cc.director.loadScene('working');
        });*/
            
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
                Score:this.score
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

      successGame(){
          cc.log('mgr success');
          this.writrdata('success');
          cc.director.loadScene('working');
      }

    start () {
        this.runUserdata();
        this.Timer();
    }

    update (dt) {
        this.Time.getComponent(cc.Label).string = String(this.gametime);
        if(!this.show) this.Score.getComponent(cc.Label).string = String(this.score);
        if(this.dinoLife.getComponent("dinosour").dinoLife == false){
            //cc.director.pause();
            
            if(!this.show) this.show_result();
            this.show = true;
            
        }
//success
/* TODO:change

        if(this.QTE.getComponent('QTE').QTE_count ==true  ){ //&& this.Boss.getComponent('boss').animState.name == 'back'
            this.writrdata('success');
            this.dinoLife.getComponent("dinosour").dinoLife == false;
            cc.director.loadScene('working');
        }
        */
        //cc.log(this.restart.getComponent(cc.Button).interactable);
    }
}
