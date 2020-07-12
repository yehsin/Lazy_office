"use strict";
cc._RF.push(module, 'a4808rQ5jpD6qXFTyrL6nHx', 'dinosour');
// script/dino_script/dinosour.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgm = null;
        // LIFE-CYCLE CALLBACKS:
        _this.kDown = false;
        _this.cDown = false;
        _this.onGround = false;
        _this.anim = null;
        _this.animateState = null;
        _this.dinoskin = false;
        _this.dinoLife = true;
        return _this;
    }
    NewClass.prototype.changrDinoSkin = function (isAdvance) {
        cc.log("set dino:", isAdvance);
        this.dinoskin = isAdvance;
    };
    NewClass.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
    };
    NewClass.prototype.onKeyDown = function (event) {
        //cc.log("Key Down: " + event.keyCode);
        if (event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        }
        //cc.log("Cey Down: " + event.keyCode);
    };
    NewClass.prototype.onKeyUp = function (event) {
        if (event.keyCode == cc.macro.KEY.k) {
            this.kDown = false;
        }
    };
    NewClass.prototype.playerMovement = function (dt) {
        if (!this.dinoskin) {
            if (this.kDown && this.onGround) {
                this.jump();
                this.anim.play('dinosour_jump');
            }
        }
        else {
            if (this.kDown && this.onGround) {
                this.jump();
                this.anim.play('dinosour_sp_jump');
            }
        }
        //if(this.kDown && this.onGround){
        //    this.jump();
        //    this.anim.play('dinosour_jump');
        //}
    };
    NewClass.prototype.jump = function () {
        this.onGround = false;
        // Method I: Apply Force to rigidbody
        this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 130000), true);
        // Method II: Change velocity of rigidbody
        // this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
    };
    NewClass.prototype.playerAnimation = function () {
        //if(this.onGround == false){
        //this.anim.play("dinosour_jump");
        //this.anim.stop("dinosour");
        //}
        //else{
        //this.anim.stop("dinosour_jump");
        //this.anim.play("dinosour");
        //this.animateState = this.anim.play('dinosour');
        //}
    };
    NewClass.prototype.start = function () {
        cc.audioEngine.stopMusic();
        cc.audioEngine.playEffect(this.bgm, false);
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
    };
    NewClass.prototype.update = function (dt) {
        this.playerMovement(dt);
        this.playerAnimation();
        if (this.dinoLife == false) {
            cc.audioEngine.stopAll();
        }
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.name == "bound") {
            //cc.log("hits the ground");
            this.onGround = true;
            if (!this.dinoskin) {
                this.anim.play('dinosour');
                this.anim.stop('dinosour_jump');
            }
            else if (this.dinoskin) {
                this.anim.play('dinosour_sp');
                this.anim.stop('dinosour_sp_jump');
            }
            //this.anim.play('dinosour');
            //this.anim.stop('dinosour_jump');
        }
        else if (other.node.name == "catus" || other.node.name == "catus2") {
            this.dinoLife = false;
            //cc.director.loadScene("working");
            cc.audioEngine.stopAllEffects();
        }
        else if (other.node.name == "bird") {
            this.dinoLife = false;
            //cc.director.loadScene("working");
            cc.audioEngine.stopAllEffects();
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "bgm", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();