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
    needle: cc.Node = null;

    @property([cc.Node])
    QTE : cc.Node[] = [];

    @property(cc.Node)
    time : cc.Node = null;
    
    @property(cc.Node)
    dino : cc.Node = null;

    @property({type:cc.AudioClip})
    QTE_clip: cc.AudioClip = null;

    @property(cc.Node)
    gameMan : cc.Node = null;

    @property(cc.Node)
    boss: cc.Node = null;

    @property(cc.Node)
    boss_man:cc.Node = null;


    private tragger = false;

    private current_QTE = null;

    private Begin = 0;

    private random_x: number;

    private random_y: number;

    private Time : number;

    private QTEing : boolean = false;

    private NoMoreQTE :boolean = false;

    private user_ID;

    private QTE_count : boolean =false;

    private anim;

    private bossState = 'sleep';

    //private score:number = 0;
    // LIFE-CYCLE CALLBACKS:

    changeQTEingState(){
        this.QTEing = false;
    }

    private loadUsrdata(){
        var userEmail = firebase.auth().currentUser.email;
        let split_name = userEmail.split('@');
        this.user_ID = split_name[0];
    }


    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.loadUsrdata();
        //this.anim = this.boss.getComponent(cc.Animation);
        //this.anim.play();
    }

    onKeyDown(event){
        if(event.keyCode == cc.macro.KEY.space){
            this.tragger = true;
            //cc.log('space');
        }
    }

    onKeyUp(event){
        if(event.keyCode == cc.macro.KEY.space){
            this.tragger = false;
        }
    }

   private needle_turnAround(){
        
            this.Begin = Date.now();
            let action = cc.rotateBy(4,360);
            this.needle.runAction(action);
            cc.log('why?');
            window.setTimeout(()=>{
                if(this.QTEing){
                    this.QTEend();
                    this.boss_man.getComponent('boss').setAnimState('angry');
                    this.bossState = 'angry';
                    cc.log('timeout~');

                    /*
                    var userRef = firebase.database().ref("/user/" + this.user_ID); //改變boss 為 angry
                    userRef.update({
                        'bossState': 'angry'
                    })
                    */

                }
                
                cc.log('disappear');
            },4500);
            

    }

    private traggQTE(){
        if(this.tragger){
            let end = Date.now();
            cc.log(this.Begin);
            cc.log(end);
            let angel = this.needle.rotation%360;
            cc.log("angel:",angel);
            let during = (end - this.Begin)/1000;
            cc.log(during);
            if(this.current_QTE == 0){
                

                if(angel < 30 || during > 105) {
                    //this.dino.getComponent('dinosour').dinoLife = false;
                   // cc.director.pause();
                    this.NoMoreQTE = true;
                    //this.gameMan.getComponent('lazy_game_gameMan').score  = -300;
                    this.QTEend();
                    this.boss_man.getComponent('boss').setAnimState('angry');
                    this.bossState = 'angry';
                    cc.log('fail0');
                }
                else {
                    this.QTEing = false;
                    if(angel > 77 && angel < 86){
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 400;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        //cc.director.loadScene('working');
                        
                        
                    }
                    else {
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 200;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        
                    }
                    //77 86
                    //cc.log('0');
                    //cc.log('yes');
                    //cc.director.pause();
                }
                
            } //偵測旋轉角度與時間點穩不穩合
            else if(this.current_QTE == 1){
                //let during = (end - this.Begin)/1000;

                if(angel < 268 || angel > 305) {
                    //this.dino.getComponent('dinosour').dinoLife = false;
                    //cc.director.pause();
                    this.NoMoreQTE = true;
                    //this.gameMan.getComponent('lazy_game_gameMan').score  = -300;
                    this.QTEend();
                    this.boss_man.getComponent('boss').setAnimState('angry');
                    this.bossState = 'angry';
                    cc.log('fail1');
                }
                else {
                    this.QTEing = false;
                    if(angel > 272 && angel < 282){
                        //分數 double
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 400;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        
                        
                    }
                    //272 282
                    else {
                        //get score
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 200;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        
                    }
                    //cc.log('1');
                    //cc.log('yes');
                    //cc.director.pause();
                }
                
            }
            else if(this.current_QTE == 2){
                //let during = (end - this.Begin)/1000;

                if(angel < 330) {
                    //this.dino.getComponent('dinosour').dinoLife = false;
                    //cc.director.pause();
                    this.NoMoreQTE = true;
                    //this.gameMan.getComponent('lazy_game_gameMan').score  = -300;
                    this.QTEend();
                    this.boss_man.getComponent('boss').setAnimState('angry');
                    this.bossState = 'angry';
                    cc.log('fail2');
                }
                else {
                    this.QTEing = false;
                    if(angel > 330 && angel > 341){
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 400;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        //this.QTE_count++;
                        
                    }
                    //330 341
                    else {
                        //score
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 200;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        //this.QTE_count++;
                        
                    }
                    //cc.log('2');
                    //cc.log('yes');
                    //cc.director.pause();
                }
               
            }
            else if(this.current_QTE == 3){
                //let during = (end - this.Begin)/1000;

                if(angel < 69 || angel > 130) {
                    //this.dino.getComponent('dinosour').dino_Life = false;
                    //cc.director.pause();
                    this.NoMoreQTE = true;
                    //this.gameMan.getComponent('lazy_game_gameMan').score  = -300;
                    this.QTEend();
                    this.boss_man.getComponent('boss').setAnimState('angry');
                    this.bossState = 'angry';
                    cc.log('fail3');
                }
                else {
                    this.QTEing = false;
                    if(angel > 77 && angel < 85){
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 400;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        //this.QTE_count++;
                        
                    }
                    //77 85 
                    else {
                        //score
                        this.boss_man.getComponent('boss').setAnimState('back');
                        this.NoMoreQTE = true;
                        this.gameMan.getComponent('lazy_game_gameMan').score += 200;
                        this.QTEend();
                        cc.log('success QTE');

                        this.gameMan.getComponent('lazy_game_gameMan').successGame();
                        //this.QTE_count++;
                        
                    }
                    //cc.log('3');
                    //cc.log('yes');
                    //cc.director.pause();
                }
            }


        }
    }

    private QTEend(){
        //this.QTEing = false;
        this.QTE[this.current_QTE].opacity = 0;
        this.needle.opacity = 0;
        //this.boss.opacity = 0;
        this.QTE_count = true;
    }
    

    private occur(){
        //this.QTE_count++;
        this.QTEing = true;
        this.QTE[this.current_QTE].x = this.random_x;
        this.QTE[this.current_QTE].y = this.random_y;
        this.needle.x = this.random_x-15;
        this.needle.y = this.random_y;


        this.QTE[this.current_QTE].opacity = 255;
        //this.boss.opacity = 255;
        this.needle.opacity = 255;
        //cc.log("fff");
        this.needle_turnAround();

        

        
    }

    private random_choose(){
        this.Time = Math.random()*3 + 2;
        cc.log(this.Time);
        this.current_QTE = Math.floor(Math.random()*4);
        this.random_x = Math.floor(Math.random()*600)+200;
        this.random_y = Math.floor(Math.random()*350)+200;
    }

    start () {
        //this.random_choose();
        /*this.schedule(()=>{
            if(!this.NoMoreQTE && this.QTE_count<=3){
                 cc.audioEngine.playMusic(this.QTE_clip,false);
                window.setTimeout(()=>{
                    this.random_choose();
                    this.occur();
                },500)
            }
        },6);
        cc.log(this.Time);*/
    }

    catchDetect(){
        cc.log('boss is catching!');
        this.bossState = 'catch';
    }

    


    update (dt) {
        /*
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", (snapshot)=>{
            this.bossState = snapshot.val().bossState;
        })
        */

        if(this.bossState == 'catch' && !this.QTEing){ //偵測boss 狀態
            this.random_choose();
            this.occur();
        }
        if(this.QTEing) this.traggQTE();
    }
}
