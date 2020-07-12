(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Pacman/Script/pacman.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c1dfdG1LqlNXprjs4fjyloP', 'pacman', __filename);
// Pacman/Script/pacman.ts

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
        _this.gameMgr = null;
        _this.upDown = false;
        _this.downDown = false;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.playerSpeedX = 0;
        _this.playerSpeedY = 0;
        _this.isDead = false;
        _this.pacman_animation = null;
        _this.deathEffect = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
        this.pacman_animation = this.node.getComponent(cc.Animation);
        this.pacman_animation.play("packman");
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.onKeyDown = function (event) {
        //cc.log("Key Down: " + event.keyCode);
        if (event.keyCode == cc.macro.KEY.up) {
            this.upDown = true;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.node.rotation = -90;
            this.node.scaleX = 1;
        }
        else if (event.keyCode == cc.macro.KEY.down) {
            this.upDown = false;
            this.downDown = true;
            this.leftDown = false;
            this.rightDown = false;
            this.node.rotation = 90;
            this.node.scaleX = 1;
        }
        else if (event.keyCode == cc.macro.KEY.left) {
            this.upDown = false;
            this.downDown = false;
            this.leftDown = true;
            this.rightDown = false;
            this.node.rotation = 0;
            this.node.scaleX = -1;
        }
        else if (event.keyCode == cc.macro.KEY.right) {
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = true;
            this.node.rotation = 0;
            this.node.scaleX = 1;
        }
    };
    NewClass.prototype.onKeyUp = function (event) {
        if (event.keyCode == cc.macro.KEY.up) {
            this.upDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.down) {
            this.downDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.left) {
            this.leftDown = false;
        }
        else if (event.keyCode == cc.macro.KEY.right) {
            this.rightDown = false;
        }
    };
    NewClass.prototype.Dead = function () {
        if (this.isDead)
            return true;
        else
            return false;
    };
    NewClass.prototype.playerMovent = function (dt) {
        this.playerSpeedX = 0;
        this.playerSpeedY = 0;
        if (this.upDown) {
            this.playerSpeedY = 100;
            this.playerSpeedX = 0;
        }
        else if (this.downDown) {
            this.playerSpeedY = -100;
            this.playerSpeedX = 0;
        }
        else if (this.leftDown) {
            this.playerSpeedY = 0;
            this.playerSpeedX = -100;
        }
        else if (this.rightDown) {
            this.playerSpeedY = 0;
            this.playerSpeedX = 100;
        }
        this.node.x += this.playerSpeedX * dt;
        this.node.y += this.playerSpeedY * dt;
    };
    NewClass.prototype.update = function (dt) {
        this.playerMovent(dt);
        if (this.isDead) {
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.playerSpeedX = 0;
            this.playerSpeedY = 0;
        }
        if (this.node.x >= 920) {
            //cc.log("Success");
            this.gameMgr.getComponent("gameMgr").levelcomplete();
            this.isDead = true;
            this.node.destroy();
        }
        if (this.gameMgr.getComponent("gameMgr").notime()) {
            this.upDown = false;
            this.downDown = false;
            this.leftDown = false;
            this.rightDown = false;
            this.playerSpeedX = 0;
            this.playerSpeedY = 0;
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
    };
    NewClass.prototype.onBeginContact = function (contact, self, other) {
        if (other.node.group == "pill") {
            this.gameMgr.getComponent("gameMgr").updateScore(10);
        }
        //check this.isDead ==false X
        if (other.node.group == "redGhost" || other.node.group == "orangeGhost" || other.node.group == "pinkGhost" || other.node.group == "blueGhost") {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            this.isDead = true;
            cc.audioEngine.stopAll();
            //cc.audioEngine.playEffect(this.deathEffect, false);
            this.pacman_animation.play("dead");
            this.schedule(function () {
                this.gameMgr.getComponent("gameMgr").gameOver();
            }, 1, 1, 0.6);
            //cc.director.pause();
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gameMgr", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "deathEffect", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=pacman.js.map
        