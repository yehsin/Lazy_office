(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/video_controll.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ee1845OFh5BGYn2p7YKmhgU', 'video_controll', __filename);
// script/video_controll.ts

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
        _this.video = null;
        _this.button = null;
        _this.work = null;
        _this.workVideo = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.video.enabled = false;
        this.button.on('click', function () {
            _this.workVideo.enabled = false;
            _this.video.enabled = true;
            _this.video.play();
        });
        this.work.on('click', function () {
            _this.video.enabled = false;
            _this.workVideo.enabled = true;
            _this.workVideo.play();
        });
    };
    NewClass.prototype.start = function () {
    };
    __decorate([
        property(cc.VideoPlayer)
    ], NewClass.prototype, "video", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "button", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "work", void 0);
    __decorate([
        property(cc.VideoPlayer)
    ], NewClass.prototype, "workVideo", void 0);
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
        //# sourceMappingURL=video_controll.js.map
        