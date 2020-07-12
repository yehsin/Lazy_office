(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameover.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'af206yiOtFHvaKQSYqDCw1f', 'gameover', __filename);
// script/gameover.ts

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
var gameover = /** @class */ (function (_super) {
    __extends(gameover, _super);
    function gameover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.restartBtn = null;
        _this.exitBtn = null;
        _this.scoreNode = null;
        _this.bgm_gameover = null;
        _this.click = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    gameover.prototype.onLoad = function () {
        var _this = this;
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
        this.restartBtn.on('click', function () {
            cc.audioEngine.stopAll();
            cc.audioEngine.playEffect(_this.click, false);
            cc.log('restart');
            cc.director.loadScene('userInfo');
        });
        this.exitBtn.on('click', function () {
            /*
            cc.log('ecit');
            cc.director.loadScene('userInfo');
            
            */
            cc.audioEngine.stopAll();
            cc.audioEngine.playEffect(_this.click, false);
            window.close();
        });
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        cc.log("load user ", this.user_ID, "data");
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", function (snapshot) {
            var score = snapshot.val().Score;
            _this.scoreNode.getComponent(cc.Label).string = String(score);
        });
    };
    gameover.prototype.start = function () {
        cc.audioEngine.playEffect(this.bgm_gameover, false);
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.update({
            Score: '0'
        });
    };
    __decorate([
        property(cc.Node)
    ], gameover.prototype, "restartBtn", void 0);
    __decorate([
        property(cc.Node)
    ], gameover.prototype, "exitBtn", void 0);
    __decorate([
        property(cc.Node)
    ], gameover.prototype, "scoreNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameover.prototype, "bgm_gameover", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameover.prototype, "click", void 0);
    gameover = __decorate([
        ccclass
    ], gameover);
    return gameover;
}(cc.Component));
exports.default = gameover;

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
        //# sourceMappingURL=gameover.js.map
        