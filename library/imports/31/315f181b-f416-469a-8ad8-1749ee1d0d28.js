"use strict";
cc._RF.push(module, '315f1gb9BZGmorYF0nuHQ0o', 'gameMgr');
// Pacman/Script/gameMgr.ts

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
        _this.click_restart_sound = null;
        _this.gameoverNode = null;
        _this.levelsuccessNode = null;
        _this.timeoutNode = null;
        _this.finalscoreNode = null;
        _this.showScore = null;
        _this.restartBtn = null;
        _this.exitBtn = null;
        _this.score = 0;
        _this.mainScore = 0;
        _this.Hscore = 0;
        _this.totalScore = 0;
        _this.showTime = null;
        _this.timer = 30;
        _this.user_ID = '321';
        _this.isAlive = true;
        _this.isComplete = false;
        _this.isFind = false;
        _this.noTime = false;
        // LIFE-CYCLE CALLBACKS:
        _this.bgm = null;
        _this.eatingEffect = null;
        _this.winningBgm = null;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        cc.director.preloadScene("working", function () {
            cc.log("Next scene preloaded");
        });
        this.levelsuccessNode.opacity = 0;
        this.gameoverNode.opacity = 0;
        //his.timeoutNode.opacity = 0;
        //this.restartBtn.getComponent(cc.Button).interactable = false;
        //this.exitBtn.getComponent(cc.Button).interactable = false;
        //this.gameoverNode.getChildByName('RestartBtn').getComponent(cc.Button).interactable = false;
        //this.gameoverNode.getChildByName('ExitBtn').getComponent(cc.Button).interactable = false;
    };
    NewClass.prototype.start = function () {
        this.loadUserData();
        cc.audioEngine.play(this.bgm, false, 0.8);
        this.schedule(function () {
            cc.audioEngine.play(this.eatingEffect, true, 0.5);
        }, 0, 1, 4.3);
        this.timerDown();
    };
    NewClass.prototype.timerDown = function () {
        this.schedule(function () {
            this.timer -= 1;
            this.showTime.getComponent(cc.Label).string = String(this.timer);
        }, 1);
    };
    NewClass.prototype.updateScore = function (num) {
        this.score += num;
        this.showScore.getComponent(cc.Label).string = String(this.score);
    };
    NewClass.prototype.loadUserData = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        cc.log("load user ", this.user_ID, "data");
        //this.user_ID = firebase.auth().currentUser.uid;
        //var scene = cc.director.getScene().name;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", function (snapshot) {
            _this.Hscore = snapshot.val().status;
            _this.totalScore = snapshot.val().totalScore;
            _this.mainScore = snapshot.val().Score;
            _this.gametime = snapshot.val().time;
        });
        //timer
        if (this.gametime < 30) {
            this.timer = this.gametime;
        }
    };
    NewClass.prototype.writedata = function (state) {
        cc.log("write data to database", this.user_ID, state);
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        if (state == "timeout") {
            userRef.update({
                time: this.gametime - 30,
                minigameScore: '0',
                status: 'endgame_pac'
            });
        }
        else if (state == "gameover") {
            this.totalScore = this.mainScore + this.totalScore;
            if (this.Hscore < this.mainScore) { //new record
                userRef.update({
                    Score: this.mainScore,
                    time: "120",
                    HScore: this.mainScore,
                    totalScore: this.totalScore,
                    status: 'start'
                });
            }
            else {
                userRef.update({
                    Score: this.mainScore,
                    time: "120",
                    totalScore: this.totalScore,
                    status: 'start'
                });
            }
            cc.log("write data when gameover");
        }
        else if (state == "success") {
            userRef.update({
                time: this.gametime - 30,
                minigameScore: this.score,
                status: 'endgame_pac'
            });
        }
    };
    NewClass.prototype.restart = function () {
        cc.log('restart!');
        //cc.audioEngine.playEffect(this.click_restart_sound,false);
        cc.director.loadScene('working');
    };
    NewClass.prototype.exit = function () {
        cc.log('exit!');
        //cc.audioEngine.playEffect(this.click_restart_sound,false);
        cc.director.loadScene('userInfo');
    };
    NewClass.prototype.gameOver = function () {
        cc.log("GameOver");
        //cc.director.pause();
        cc.audioEngine.pauseAll();
        this.isAlive = false;
        this.mainScore = this.mainScore + this.score - 300; //score calculate
        this.writedata("gameover");
        cc.director.loadScene('GameOver');
    };
    NewClass.prototype.backTowork = function () {
        cc.director.loadScene('working');
    };
    NewClass.prototype.timeout = function () {
        cc.log("timeout");
        this.isAlive = true;
        this.writedata("timeout");
        //this.timeoutNode.opacity = 255;
        cc.audioEngine.stopAll();
        this.scheduleOnce(this.backTowork, 3);
        //cc.director.loadScene('working');
        //TODO: schedule
        //this.gameoverNode.opacity = 0;
        //cc.director.loadScene("pantry");
    };
    NewClass.prototype.levelcomplete = function () {
        cc.log("success");
        this.writedata("success");
        this.levelsuccessNode.opacity = 255;
        cc.audioEngine.stopAll();
        cc.audioEngine.playEffect(this.winningBgm, false);
        this.scheduleOnce(this.backTowork, 3);
        //return true;
    };
    NewClass.prototype.notime = function () {
        if (this.noTime)
            return true;
        else
            return false;
    };
    NewClass.prototype.update = function (dt) {
        if (this.timer <= 0) {
            this.timer = 1;
            this.noTime = true;
            if (this.isComplete == false) {
                this.isComplete = true;
                this.timeout();
            }
        }
        //TODO: delete this
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "click_restart_sound", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gameoverNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "levelsuccessNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "timeoutNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "finalscoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "showScore", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "restartBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "exitBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "showTime", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "bgm", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "eatingEffect", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "winningBgm", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();