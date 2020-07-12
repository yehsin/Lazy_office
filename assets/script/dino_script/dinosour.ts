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

    @property({type:cc.AudioClip})
    bgm : cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:
    private kDown: boolean = false;

    private cDown: boolean = false;

    private onGround: boolean = false;

    private anim = null;

    private animateState = null;

    private dinoskin: boolean = false; 

    private dinoLife: boolean = true;

    changrDinoSkin(isAdvance:boolean){
        cc.log("set dino:",isAdvance);
        this.dinoskin = isAdvance;
    }

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
    }

    onKeyDown(event) {
        //cc.log("Key Down: " + event.keyCode);
        if(event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        }
        //cc.log("Cey Down: " + event.keyCode);
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.k){
            this.kDown = false;
        }
    }

    private playerMovement(dt) {
        if(!this.dinoskin){
            if(this.kDown && this.onGround){
                this.jump();
                this.anim.play('dinosour_jump');
            }
        }
        else{
            if(this.kDown && this.onGround){
                this.jump();
                this.anim.play('dinosour_sp_jump');
            }
        }
        //if(this.kDown && this.onGround){
        //    this.jump();
        //    this.anim.play('dinosour_jump');
        //}
    }    

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 130000), true);

        // Method II: Change velocity of rigidbody
        // this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
    }

    private playerAnimation(){
        //if(this.onGround == false){
            //this.anim.play("dinosour_jump");
            //this.anim.stop("dinosour");
        //}
        //else{
            //this.anim.stop("dinosour_jump");
            //this.anim.play("dinosour");
            //this.animateState = this.anim.play('dinosour');
        //}
    }


    start () {
        cc.audioEngine.stopMusic();
        cc.audioEngine.playEffect(this.bgm,false);
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
    }

    update (dt) {
        this.playerMovement(dt);
        this.playerAnimation();
        if(this.dinoLife == false){
            cc.audioEngine.stopAll();
        }
    }
    onBeginContact(contact, self, other) {
        if(other.node.name == "bound") {
            //cc.log("hits the ground");
            this.onGround = true;
            if(!this.dinoskin){
                this.anim.play('dinosour');
                this.anim.stop('dinosour_jump');
            }
            else if(this.dinoskin){
                this.anim.play('dinosour_sp');
                this.anim.stop('dinosour_sp_jump');
            }
            //this.anim.play('dinosour');
            //this.anim.stop('dinosour_jump');
        }
        else if(other.node.name == "catus" || other.node.name == "catus2"){
            this.dinoLife = false;
            //cc.director.loadScene("working");
            cc.audioEngine.stopAllEffects();
        }
        else if(other.node.name == "bird"){
            this.dinoLife = false;
            //cc.director.loadScene("working");
            cc.audioEngine.stopAllEffects();
        }
    }
}
