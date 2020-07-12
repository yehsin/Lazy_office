(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/AudioPlayerController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d07eGa+2FPfp1/p71LHvGj', 'AudioPlayerController', __filename);
// script/AudioPlayerController.ts

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
        _this.audioButton = [];
        _this.audioClips = [];
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.playAudioClip = function () {
        cc.audioEngine.resumeMusic();
    };
    NewClass.prototype.pauseAudioClip = function () {
        cc.audioEngine.pauseMusic();
    };
    NewClass.prototype.start = function () {
        for (var i = 0; i < this.audioClips.length; i++) {
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = "AudioPlayerController";
            clickEventHandler.handler = "changeAudioClip";
            clickEventHandler.customEventData = "" + i;
            this.audioButton[i].clickEvents.push(clickEventHandler);
        }
    };
    NewClass.prototype.changeAudioClip = function (event, customEventData) {
        cc.audioEngine.playMusic(this.audioClips[customEventData], false);
    };
    __decorate([
        property([cc.Button])
    ], NewClass.prototype, "audioButton", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "audioClips", void 0);
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
        //# sourceMappingURL=AudioPlayerController.js.map
        