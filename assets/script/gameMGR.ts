const { ccclass, property } = cc._decorator;

@ccclass
export default class gameMGR extends cc.Component {

  @property(cc.Node)
  basicofficeNode : cc.Node = null;

  @property(cc.Node)
  advanceofficeNode : cc.Node = null;

  @property({ type: cc.AudioClip })
  click_playgame_sound: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  click_bottle_sound: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  click_radio_sound: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  click_restart_sound: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  bgm_success: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  bgm_music: cc.AudioClip = null;

  @property({ type: cc.AudioClip })
  bgm_amb: cc.AudioClip = null;

  //@property(cc.Node)
  //radioBtn : cc.Node = null;

  @property(cc.Node)
  playBtn : cc.Node = null;

  //@property(cc.Node)
  //bottleBtn : cc.Node = null;

  @property(cc.Node)
  restartBtn : cc.Node = null;

  @property(cc.Node)
  exitBtn : cc.Node = null;

  @property(cc.Node)
  resultText : cc.Node = null;

  private bgm_state: string = "music";


  @property(cc.Node)
  timeNode: cc.Node = null;

  @property(cc.Node)
  scoreNode: cc.Node = null;

  @property(cc.Node)
  finalscoreNode: cc.Node = null;

  @property(cc.Node)
  resultNode: cc.Node = null;

  private score: number;

  private totalScore:number;

  private gameTime: number = -1; // remaining time

  private isTimeover: boolean = false; // time out or not

  private isFinish: boolean = false; 

  private textContent:string = "CONGRADULATION";

  private user_ID;

  private playerStatus;

  private Hscore;

  private officeLevel:string = "BASIC";

  restart(){
    cc.audioEngine.playEffect(this.click_restart_sound,false);
    cc.log("restart");
    //this.start_step();
    cc.director.loadScene("working");
  }

  exit(){
    cc.audioEngine.playEffect(this.click_restart_sound,false);
    cc.log("exit");
    cc.director.loadScene("userInfo");
  }

  private finishgame(){// SUCCESS!

    //cc.audioEngine.pauseAll();
    //cc.audioEngine.playMusic(this.bgm_success,true); //TODO: cannot play 

    cc.log("SUCCESS!");

    this.score = this.score + 300;

    //this.score = 600; //TODO:for debug

    this.totalScore = this.totalScore + this.score;

    this.finalscoreNode.getComponent(cc.Label).string = String(this.score);
    this.resultNode.opacity = 255;
    this.restartBtn.getComponent(cc.Button).interactable = true;
    this.exitBtn.getComponent(cc.Button).interactable = true;

    

    if(this.score > this.Hscore){ //new record

      this.textContent = "NEW RECORD";
      

    }
    else{
      if(this.score < 500){
        this.textContent = "SUCCESS";

      }
      else if( this.score >=500 && this.score < 1000){
        this.textContent = "NICE JOB";
      }
      else{
        this.textContent = "EXCELLENT!";
      }

    }

    

    this.resultText.getComponent(cc.Label).string = this.textContent;

    this.isFinish = true;
    //this.radioBtn.getComponent(cc.Button).interactable = false;
    this.playBtn.getComponent(cc.Button).interactable = false;
    //this.bottleBtn.getComponent(cc.Button).interactable = false;

    if(this.officeLevel == "BASIC"){
      this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
      this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;

    
    }
    else {
      
      this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
      this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
  
      
      
    }
    

    cc.audioEngine.pauseAll();


    this.writeUserData();

    
    

  }

  radio_change(){ // bgm status change

    if(this.bgm_state == "music"){
      cc.audioEngine.pauseMusic();
      //cc.audioEngine.playMusic(this.bgm_amb,true);
      this.bgm_state = "amb";
    }
    else{
      cc.audioEngine.pauseMusic();
      //cc.audioEngine.playMusic(this.bgm_music,true);
      this.bgm_state = "music"
    }

  }


  private Timer() {
    if(this.gameTime == -1) this.gameTime = 40;
    cc.log("start timer:",this.gameTime);

    this.schedule(function () {
      this.gameTime -= 1;

      if (this.gameTime <= 0 && this.isTimeover == false) {
        this.isTimeover = true;
        this.finishgame();
        this.gameTime = 0;
        // jump to another scene or show result directly
      }
      cc.log(this.gameTime);
      if(this.gameTime<0) this.gameTime = 0;
      this.timeNode.getComponent(cc.Label).string = String(this.gameTime);
    }, 1);
  }

  private loadUserData() {
    var userEmail = firebase.auth().currentUser.email;
    let split_name = userEmail.split('@');
    this.user_ID = split_name[0];
    //this.user_ID = firebase.auth().currentUser.uid;

    var scene = cc.director.getScene().name;

    cc.log("read user" , this.user_ID , " data");
    

    var scorenode = this.scoreNode;

    var ScoreNum = 0;

    var userRef = firebase.database().ref("/user/" + this.user_ID);
    userRef.once("value", (snapshot) => {
      cc.log(
        'total score:',snapshot.val().totalScore,
        '\nscore',snapshot.val().Score, //score
        '\nminigamescore',snapshot.val().minigameScore,
        '\nstatus',snapshot.val().status,
        '\ntime',snapshot.val().time
      );


      if(snapshot.val().status == "start"){ // NEW GAME
        cc.log("new game");
        this.gameTime = 180;
        this.score = 0;
        ScoreNum = 0;


      } 
      else if(snapshot.val().status == "endgame"){
           cc.log("end of mini game");
          this.gameTime = snapshot.val().time;
          var score_main : number = +snapshot.val().Score;
          var score_mini : number = +snapshot.val().minigameScore;
          ScoreNum = score_main + score_mini;
          this.score = ScoreNum;
        

      } 

      scorenode.getComponent(cc.Label).string = ScoreNum.toString();

      this.Hscore = snapshot.val().HScore; //load highest score
      this.totalScore = snapshot.val().totalScore; //load total score until now
      this.officeLevel =  snapshot.val().office; //load office
      cc.log("remaining time:",this.gameTime);
      cc.log("score:",this.score);
      cc.log("HScore:", this.Hscore);

      
    });
  }

  private writeUserData(){

    var userRef = firebase.database().ref("/user/" + this.user_ID);

    userRef.once("value", (snapshot) => {

      this.Hscore = snapshot.val().HScore;
      
    });

    if(this.isFinish == false) //
    {

      var updateInfo_1 = {
        'Score':this.score,
        'status':'endgame',
        'time':this.gameTime,
        'minigameScore': '0'
      };

      userRef.update(updateInfo_1);

    }
    else{
      if(this.totalScore > 1000 && this.officeLevel == 'BASIC'){
        this.officeLevel = "ADVANCE";
      }
      if(this.score > this.Hscore){ //new record
        var updateInfo_2 = {
          office:this.officeLevel,
          totalScore:this.totalScore,
          HScore: this.score,
          Score: '0',
          status: 'start',
          time: '180',
        };
        userRef.update(updateInfo_2);

      }
      else{
        var updateInfo_3 = {
          office:this.officeLevel,
          totalScore:this.totalScore,
          Score: "0",
          status: "start",
          time: "180",
        };
        userRef.update(updateInfo_3);

      }
      


    }


  }

  ToDinosaur(){ // play game at work by btn
    this.playerStatus = "playGame";
    cc.audioEngine.playEffect(this.click_playgame_sound, false);
    this.writeUserData(); //TODO:firebase bug
    cc.audioEngine.pauseAll();
    cc.log("jump to Dino");
    cc.director.loadScene('dino_game');
    
  }

  ToPacman(){ // go to toilet by btn
    this.playerStatus = "goToilet";
    cc.audioEngine.playEffect(this.click_bottle_sound, false);
    this.writeUserData(); //TODO:firebase bug
    cc.audioEngine.pauseAll();
    cc.log("jump to pacman");
    cc.director.loadScene('Pacman');

  }

  
  onLoad() {
  
    //this.loadUserData();//TODO:firebase bug 
    //office setting
    cc.log("initial load:working");
    //this.officeLevel = "BASIC";
    
  }
  

  

  private start_step(){

    this.isFinish = false;
    this.isTimeover = false;
    this.resultNode.opacity = 0;

    //this.radioBtn.getComponent(cc.Button).interactable = true;
    //this.playBtn.getComponent(cc.Button).interactable = true;
    //this.bottleBtn.getComponent(cc.Button).interactable = true;

    this.restartBtn.getComponent(cc.Button).interactable = false;
    this.exitBtn.getComponent(cc.Button).interactable = false;

    if(this.bgm_state == "music"){
      //cc.audioEngine.playMusic(this.bgm_music,true);
    }
    else{
      //cc.audioEngine.playMusic(this.bgm_amb,true);
    }

    this.Timer();
    
  }

  start() {
    
    
    cc.log("Start Game!");
    cc.audioEngine.pauseAll();
    this.loadUserData();
    this.start_step();
    this.setting();
    

  }

  setting(){
    if(this.officeLevel == 'BASIC'){
      cc.log("basic office setting...");
      this.basicofficeNode.opacity = 255;
      this.advanceofficeNode.opacity = 0;
      this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
      this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
      this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = true;
      this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
      cc.log(this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable);
    }
    else{
      cc.log("advance office setting...");
      this.basicofficeNode.opacity = 0;
      this.advanceofficeNode.opacity = 255;
      this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
      this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
      this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = true;
      this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;



    }
  }

  update (dt) {
    ///* TODO:time
    if(this.gameTime < 33){ // time < 33 -> cannot go to toilet
      this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
      this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
    }
    else{
      if(this.officeLevel=="BASIC"){
        this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;

      }
      else{
        this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;

      }
    }
    //*/
  }
}
