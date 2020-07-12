(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/video.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '08fbbrR9g5E2KxmimGf6g4h', 'video', __filename);
// script/video.ts

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
        _this.scream_sound = null;
        _this.gameMgr = null;
        _this.video_animation = null;
        _this.timer = 26;
        _this.playing = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.video_animation = this.node.getComponent(cc.Animation);
        //this.video_animation.play("video");
    };
    NewClass.prototype.timerDown = function () {
        this.schedule(function () {
            this.timer -= 1;
        }, 1);
    };
    NewClass.prototype.start = function () {
        this.timerDown();
    };
    NewClass.prototype.update = function (dt) {
        //cc.log(this.timer);
        if (this.timer <= 3) {
            //cc.audioEngine.playEffect(this.scream_sound, false);
            if (this.timer <= 0) {
                cc.log("Finish Video");
                this.timer = 23;
                this.gameMgr.getComponent("maingame_mgr").updateScore(1000);
            }
        }
        if (this.node.opacity == 0) {
            this.video_animation.stop();
            this.playing = false;
            this.timer = 23;
        }
        if (this.node.opacity == 255 && this.playing == false) {
            cc.log("Video Playing");
            this.playing = true;
            this.timer = 23;
            this.video_animation.play("video");
        }
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "scream_sound", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gameMgr", void 0);
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
        //# sourceMappingURL=video.js.map
        