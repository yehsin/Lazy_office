"use strict";
cc._RF.push(module, '8b8655E3stJmJrkZjuuV6lR', 'userInfo');
// script/userInfo.ts

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
var userInfo = /** @class */ (function (_super) {
    __extends(userInfo, _super);
    function userInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startBtn = null;
        _this.userNameNode = null;
        _this.officeNode = null;
        _this.HscoreNode = null;
        _this.bgm_music = null;
        _this.click_start_sound = null;
        return _this;
        // update (dt) {}
    }
    userInfo.prototype.loadUserData = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var scene = cc.director.getScene().name;
        cc.log(scene, " | read user ", this.user_ID, " data");
        var usernamenode = this.userNameNode;
        var officenode = this.officeNode;
        var Hscorenode = this.HscoreNode;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", function (snapshot) {
            cc.log(snapshot.val().HScore, // Highest score
            snapshot.val().office);
            _this.Hscore = snapshot.val().HScore;
            _this.officeLevel = snapshot.val().office;
            officenode.getComponent(cc.Label).string = _this.officeLevel.toString();
            Hscorenode.getComponent(cc.Label).string = _this.Hscore.toString();
            usernamenode.getComponent(cc.Label).string = _this.user_ID.toString();
            cc.log("level:", _this.officeLevel);
            cc.log("Hscore:", _this.Hscore);
        });
        userRef.update({
            Score: '0',
            status: 'start',
            time: '180',
            bossState: 'sleep'
        });
    };
    userInfo.prototype.gameStart = function () {
        cc.audioEngine.playEffect(this.click_start_sound, false);
        cc.audioEngine.pauseAll();
        cc.log("startBtn clicked");
        cc.director.loadScene("working");
    };
    // LIFE-CYCLE CALLBACKS:
    userInfo.prototype.onLoad = function () {
        var _this = this;
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
        this.loadUserData();
        this.startBtn.on('click', function () {
            cc.log('start btn click');
            cc.audioEngine.playEffect(_this.click_start_sound, false);
            //cc.audioEngine.pauseAll();
            cc.director.loadScene("working");
        });
    };
    userInfo.prototype.start = function () {
        cc.audioEngine.play(this.bgm_music, true, 0.3);
    };
    __decorate([
        property(cc.Node)
    ], userInfo.prototype, "startBtn", void 0);
    __decorate([
        property(cc.Node)
    ], userInfo.prototype, "userNameNode", void 0);
    __decorate([
        property(cc.Node)
    ], userInfo.prototype, "officeNode", void 0);
    __decorate([
        property(cc.Node)
    ], userInfo.prototype, "HscoreNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], userInfo.prototype, "bgm_music", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], userInfo.prototype, "click_start_sound", void 0);
    userInfo = __decorate([
        ccclass
    ], userInfo);
    return userInfo;
}(cc.Component));
exports.default = userInfo;

cc._RF.pop();