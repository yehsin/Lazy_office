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

let username = '';
let password = '';

@ccclass
export default class login extends cc.Component {

    @property(cc.Node)
    input: cc.Node = null;

    @property(cc.Node)
    enter: cc.Node = null;

    @property(cc.Node)
    switch: cc.Node = null;


    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    user: cc.Node = null;
    
    @property(cc.Node)
    Logup: cc.Node = null;

    @property(cc.Label)
    inup_set:cc.Label = null;

    private logup: boolean = false;
    private isuser = false;
    private ispass = false;

    onLoad(){
        this.switch.on('click',()=>{
            if(this.logup==false){ //login
                this.logup = true;
                this.switch.getChildByName('switch_login').opacity = 0;
                this.switch.getChildByName('switch_signup').opacity = 255;

            }
            else{
                this.logup = false;
                this.switch.getChildByName('switch_signup').opacity = 0;
                this.switch.getChildByName('switch_login').opacity = 255;
                

            }
            cc.log('switch',this.logup);
        });
        this.enter.on('click',()=>{
            this.login_data();
            cc.log('aaa');
        });
        this.Logup.on('click',()=>{
            //cc.log('change');
            //var type = this.Logup.getComponent(cc.Label).string;
            var type = this.inup_set.string;
            cc.log(type,'change');
            if(type == "sign up"){
                this.logup = false;
                //this.Logup.getChildByName('Label').getComponent(cc.Label).string = 'login';
                this.inup_set.string = 'log in';
            }
            else{
                this.logup = true;
                //this.Logup.getChildByName('Label').getComponent(cc.Label).string = 'logup';
                this.inup_set.string = 'sign up';

            }
            
        })
    }

    login_data(){
        if(!this.isuser){
            if(this.input.getComponent(cc.EditBox).string != ''){
                username = this.input.getComponent(cc.EditBox).string;
                this.input.getComponent(cc.EditBox).string = '';

                this.icon.opacity = 255;
                this.user.opacity = 255;
                this.user.getComponent(cc.Label).string = username;
                this.isuser = true;
            }
            
        }

        else if(!this.ispass){
            if(this.input.getComponent(cc.EditBox).string != ''){
                password = this.input.getComponent(cc.EditBox).string;
            }
            if(!this.logup){
                firebase.auth().signInWithEmailAndPassword(username,password).then(()=>{
                    cc.log('displayname:',firebase.auth().currentUser.email);
                    cc.director.loadScene('userInfo'); //check
                }).catch((error)=>{
                    alert(error);
                    this.isuser = false;
                    this.ispass = false;
                    this.icon.opacity = 0;
                    this.user.opacity = 0;

                })
            }
            else { // logup
                firebase.auth().createUserWithEmailAndPassword(username,password).then(()=>{
                    let User = username.split('@');
                    let userEmail = User[0];
                    firebase.auth().currentUser.displayname = userEmail;
                    cc.log('displayname:',firebase.auth().currentUser.displayname);
                    //currentuser.displayname
                    firebase.database().ref('/user/' + userEmail).set({
                        time: '180',
                        status: 'start',
                        minigameScore: '0',
                        Score: '0',
                        HScore: '0',// check
                        totalScore:'0',
                        office: 'BASIC' //check
                    });
                    cc.director.loadScene('userInfo'); //check
                }).catch((error)=>{
                    alert(error);
                    this.isuser = false;
                    this.ispass = false;
                    this.icon.opacity = 0;
                    this.user.opacity = 0;

                })
    
                
            }

        }

        
    }
}
