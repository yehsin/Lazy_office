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
    gameMgr: cc.Node = null;

    private upDown: boolean = false;

    private downDown: boolean = false;

    private leftDown: boolean = false;

    private rightDown: boolean = false;

    private playerSpeedX: number = 0;

    private playerSpeedY: number = 0;

    private isDead: boolean = false;

    private pacman_animation: cc.Animation = null;

    @property({type:cc.AudioClip})
    deathEffect: cc.AudioClip = null;

    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)

        this.pacman_animation = this.node.getComponent(cc.Animation);
        this.pacman_animation.play("packman");
    }

    start () {

    }

    onKeyDown(event){
        //cc.log("Key Down: " + event.keyCode);
        if (event.keyCode == cc.macro.KEY.up){
            this.upDown = true;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.node.rotation = -90;
            this.node.scaleX = 1;
            
        }
        else if (event.keyCode == cc.macro.KEY.down){
            this.upDown = false;
            this.downDown = true;
            this.leftDown = false;
            this.rightDown = false;
            this.node.rotation = 90;
            this.node.scaleX = 1;
        }
        else if (event.keyCode == cc.macro.KEY.left){
            this.upDown = false;
            this.downDown = false;
            this.leftDown = true;
            this.rightDown = false;
            this.node.rotation = 0;
            this.node.scaleX = -1;
        }
        else if (event.keyCode == cc.macro.KEY.right){
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = true;
            this.node.rotation = 0;
            this.node.scaleX = 1;
        }
    }
    
    onKeyUp(event){
        if (event.keyCode == cc.macro.KEY.up){
            this.upDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.down){
            this.downDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.left){
            this.leftDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.right){
            this.rightDown = false;
        }
    }

    private Dead(){
        if (this.isDead)
            return true;
        else
            return false;
    }

    private playerMovent(dt){
        this.playerSpeedX = 0;
        this.playerSpeedY = 0;

        if (this.upDown){
            this.playerSpeedY = 100;
            this.playerSpeedX = 0;
        }
        else if (this.downDown){
            this.playerSpeedY = -100;
            this.playerSpeedX = 0;
        }
        else if (this.leftDown){
            this.playerSpeedY = 0;
            this.playerSpeedX = -100;
        }
        else if (this.rightDown){
            this.playerSpeedY = 0;
            this.playerSpeedX = 100;
        }

        this.node.x += this.playerSpeedX * dt;
        this.node.y += this.playerSpeedY * dt;
    }

    update (dt) {
        this.playerMovent(dt);
        if (this.isDead){
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.playerSpeedX = 0;
            this.playerSpeedY = 0;
            
        }
        if (this.node.x >= 920){
            //cc.log("Success");
            this.gameMgr.getComponent("gameMgr").levelcomplete();
            this.isDead = true;
            this.node.destroy();
        }

        if (this.gameMgr.getComponent("gameMgr").notime()){
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.playerSpeedX = 0;
            this.playerSpeedY = 0;
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        }
    }

    onBeginContact(contact, self, other){
        if (other.node.group == "pill"){
            this.gameMgr.getComponent("gameMgr").updateScore(10)
        }
        //check this.isDead ==false X
        if (other.node.group == "redGhost" || other.node.group == "orangeGhost" || other.node.group == "pinkGhost" || other.node.group == "blueGhost"){
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
            this.isDead = true;

            cc.audioEngine.stopAll();
            //cc.audioEngine.playEffect(this.deathEffect, false);
            this.pacman_animation.play("dead");
            this.schedule(function(){
                this.gameMgr.getComponent("gameMgr").gameOver();
            },1,1,0.6)
            
            
            //cc.director.pause();
            
        }
    }
}