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
export default class userInfo extends cc.Component {


    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Node)
    userNameNode: cc.Node = null;

    @property(cc.Node)
    officeNode: cc.Node = null;

    @property(cc.Node)
    HscoreNode: cc.Node = null;

    @property({ type: cc.AudioClip })
    bgm_music: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    click_start_sound: cc.AudioClip = null;

    private userName:string;
    private officeLevel:string;
    private Hscore:string;
    private user_ID:string;

    private loadUserData() {

      var userEmail = firebase.auth().currentUser.email;
      let split_name = userEmail.split('@');
      this.user_ID = split_name[0];
        
    
        var scene = cc.director.getScene().name;
    
        cc.log(scene," | read user " , this.user_ID , " data");

        var usernamenode = this.userNameNode; 
        var officenode = this.officeNode;
        var Hscorenode = this.HscoreNode;
    
    
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", (snapshot) => {
          cc.log(
            snapshot.val().HScore, // Highest score
            snapshot.val().office,
          );
          
          this.Hscore = snapshot.val().HScore;
          this.officeLevel = snapshot.val().office;
    
          officenode.getComponent(cc.Label).string = this.officeLevel.toString();
          Hscorenode.getComponent(cc.Label).string = this.Hscore.toString();
          usernamenode.getComponent(cc.Label).string = this.user_ID.toString();
    
          cc.log("level:",this.officeLevel);
          cc.log("Hscore:",this.Hscore);
    
          
        });

        userRef.update({
          Score: '0',
          status: 'start',
          time: '180',
          bossState:'sleep'
        })
      }



    private gameStart(){
        cc.audioEngine.playEffect(this.click_start_sound,false);
        cc.audioEngine.pauseAll();
        cc.log("startBtn clicked");
        cc.director.loadScene("working");
    }



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("working", function () {
          cc.log("Next scene preloaded");
      });
        
        this.loadUserData();
        this.startBtn.on('click',()=>{
          cc.log('start btn click');
          cc.audioEngine.playEffect(this.click_start_sound,false);
          //cc.audioEngine.pauseAll();
          cc.director.loadScene("working");

      });
    }

    start () {

        cc.audioEngine.play(this.bgm_music,true,0.3);

    }

    // update (dt) {}
}
