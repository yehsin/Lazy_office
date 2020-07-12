(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/computer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6bf7fYMOhJArp8b+4n+3TE4', 'computer', __filename);
// script/computer.ts

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
var computer = /** @class */ (function (_super) {
    __extends(computer, _super);
    function computer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.click_sound = null;
        _this.type_sound = null;
        _this.horror_sound = null;
        _this.GMR = null;
        _this.workingBtn = null;
        _this.watchingBtn = null;
        _this.closeBtn = null;
        _this.working = null;
        _this.watching = null;
        _this.isPlaying = false;
        _this.isWorking = false;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    computer.prototype.onLoad = function () {
        var _this = this;
        this.workingBtn.on('click', function () {
            cc.audioEngine.playEffect(_this.click_sound, false);
            cc.log('working! open word!');
            cc.audioEngine.play(_this.type_sound, true, 0.5);
            _this.isPlaying = false;
            _this.isWorking = true;
            _this.working.opacity = 255;
            _this.watching.opacity = 0;
            _this.closeBtn.opacity = 255;
            _this.GMR.getComponent('maingame_mgr').stateChange(_this.isPlaying, _this.isWorking);
        });
        this.watchingBtn.on('click', function () {
            cc.audioEngine.playEffect(_this.click_sound, false);
            cc.log('watching video');
            cc.audioEngine.play(_this.horror_sound, true, 0.5);
            _this.isPlaying = true;
            _this.isWorking = false;
            _this.working.opacity = 0;
            _this.watching.opacity = 255;
            _this.closeBtn.opacity = 255;
            _this.GMR.getComponent('maingame_mgr').stateChange(_this.isPlaying, _this.isWorking);
        });
        this.closeBtn.on('click', function () {
            cc.log('Do nothing');
            cc.audioEngine.stopAll();
            _this.isPlaying = false;
            _this.isWorking = false;
            _this.working.opacity = 0;
            _this.watching.opacity = 0;
            _this.closeBtn.opacity = 0;
            _this.GMR.getComponent('maingame_mgr').stateChange(_this.isPlaying, _this.isWorking);
        });
    };
    computer.prototype.start = function () {
    };
    computer.prototype.getPlayingState = function () {
        //cc.log("state:",this.isPlaying);
        return this.isPlaying;
    };
    computer.prototype.getWorkingState = function () {
        //cc.log("state:",this.isPlaying);
        return this.isWorking;
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], computer.prototype, "click_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], computer.prototype, "type_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], computer.prototype, "horror_sound", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "GMR", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "workingBtn", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "watchingBtn", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "closeBtn", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "working", void 0);
    __decorate([
        property(cc.Node)
    ], computer.prototype, "watching", void 0);
    computer = __decorate([
        ccclass
    ], computer);
    return computer;
}(cc.Component));
exports.default = computer;

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
        //# sourceMappingURL=computer.js.map
        