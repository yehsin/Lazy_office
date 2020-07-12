(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameMGR.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f44dkb2/dNuZtAvJQQol4A', 'gameMGR', __filename);
// script/gameMGR.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameMGR = /** @class */ (function (_super) {
    __extends(gameMGR, _super);
    function gameMGR() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basicofficeNode = null;
        _this.advanceofficeNode = null;
        _this.click_playgame_sound = null;
        _this.click_bottle_sound = null;
        _this.click_radio_sound = null;
        _this.click_restart_sound = null;
        _this.bgm_success = null;
        _this.bgm_music = null;
        _this.bgm_amb = null;
        //@property(cc.Node)
        //radioBtn : cc.Node = null;
        _this.playBtn = null;
        //@property(cc.Node)
        //bottleBtn : cc.Node = null;
        _this.restartBtn = null;
        _this.exitBtn = null;
        _this.resultText = null;
        _this.bgm_state = "music";
        _this.timeNode = null;
        _this.scoreNode = null;
        _this.finalscoreNode = null;
        _this.resultNode = null;
        _this.gameTime = -1; // remaining time
        _this.isTimeover = false; // time out or not
        _this.isFinish = false;
        _this.textContent = "CONGRADULATION";
        _this.officeLevel = "BASIC";
        return _this;
    }
    gameMGR.prototype.restart = function () {
        cc.audioEngine.playEffect(this.click_restart_sound, false);
        cc.log("restart");
        //this.start_step();
        cc.director.loadScene("working");
    };
    gameMGR.prototype.exit = function () {
        cc.audioEngine.playEffect(this.click_restart_sound, false);
        cc.log("exit");
        cc.director.loadScene("userInfo");
    };
    gameMGR.prototype.finishgame = function () {
        //cc.audioEngine.pauseAll();
        //cc.audioEngine.playMusic(this.bgm_success,true); //TODO: cannot play 
        cc.log("SUCCESS!");
        this.score = this.score + 300;
        //this.score = 600; //TODO:for debug
        this.totalScore = this.totalScore + this.score;
        this.finalscoreNode.getComponent(cc.Label).string = String(this.score);
        this.resultNode.opacity = 255;
        this.restartBtn.getComponent(cc.Button).interactable = true;
        this.exitBtn.getComponent(cc.Button).interactable = true;
        if (this.score > this.Hscore) { //new record
            this.textContent = "NEW RECORD";
        }
        else {
            if (this.score < 500) {
                this.textContent = "SUCCESS";
            }
            else if (this.score >= 500 && this.score < 1000) {
                this.textContent = "NICE JOB";
            }
            else {
                this.textContent = "EXCELLENT!";
            }
        }
        this.resultText.getComponent(cc.Label).string = this.textContent;
        this.isFinish = true;
        //this.radioBtn.getComponent(cc.Button).interactable = false;
        this.playBtn.getComponent(cc.Button).interactable = false;
        //this.bottleBtn.getComponent(cc.Button).interactable = false;
        if (this.officeLevel == "BASIC") {
            this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
        }
        else {
            this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
        }
        cc.audioEngine.pauseAll();
        this.writeUserData();
    };
    gameMGR.prototype.radio_change = function () {
        if (this.bgm_state == "music") {
            cc.audioEngine.pauseMusic();
            //cc.audioEngine.playMusic(this.bgm_amb,true);
            this.bgm_state = "amb";
        }
        else {
            cc.audioEngine.pauseMusic();
            //cc.audioEngine.playMusic(this.bgm_music,true);
            this.bgm_state = "music";
        }
    };
    gameMGR.prototype.Timer = function () {
        if (this.gameTime == -1)
            this.gameTime = 40;
        cc.log("start timer:", this.gameTime);
        this.schedule(function () {
            this.gameTime -= 1;
            if (this.gameTime <= 0 && this.isTimeover == false) {
                this.isTimeover = true;
                this.finishgame();
                this.gameTime = 0;
                // jump to another scene or show result directly
            }
            cc.log(this.gameTime);
            if (this.gameTime < 0)
                this.gameTime = 0;
            this.timeNode.getComponent(cc.Label).string = String(this.gameTime);
        }, 1);
    };
    gameMGR.prototype.loadUserData = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        //this.user_ID = firebase.auth().currentUser.uid;
        var scene = cc.director.getScene().name;
        cc.log("read user", this.user_ID, " data");
        var scorenode = this.scoreNode;
        var ScoreNum = 0;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", function (snapshot) {
            cc.log('total score:', snapshot.val().totalScore, '\nscore', snapshot.val().Score, //score
            '\nminigamescore', snapshot.val().minigameScore, '\nstatus', snapshot.val().status, '\ntime', snapshot.val().time);
            if (snapshot.val().status == "start") { // NEW GAME
                cc.log("new game");
                _this.gameTime = 180;
                _this.score = 0;
                ScoreNum = 0;
            }
            else if (snapshot.val().status == "endgame") {
                cc.log("end of mini game");
                _this.gameTime = snapshot.val().time;
                var score_main = +snapshot.val().Score;
                var score_mini = +snapshot.val().minigameScore;
                ScoreNum = score_main + score_mini;
                _this.score = ScoreNum;
            }
            scorenode.getComponent(cc.Label).string = ScoreNum.toString();
            _this.Hscore = snapshot.val().HScore; //load highest score
            _this.totalScore = snapshot.val().totalScore; //load total score until now
            _this.officeLevel = snapshot.val().office; //load office
            cc.log("remaining time:", _this.gameTime);
            cc.log("score:", _this.score);
            cc.log("HScore:", _this.Hscore);
        });
    };
    gameMGR.prototype.writeUserData = function () {
        var _this = this;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", function (snapshot) {
            _this.Hscore = snapshot.val().HScore;
        });
        if (this.isFinish == false) //
         {
            var updateInfo_1 = {
                'Score': this.score,
                'status': 'endgame',
                'time': this.gameTime,
                'minigameScore': '0'
            };
            userRef.update(updateInfo_1);
        }
        else {
            if (this.totalScore > 1000 && this.officeLevel == 'BASIC') {
                this.officeLevel = "ADVANCE";
            }
            if (this.score > this.Hscore) { //new record
                var updateInfo_2 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    HScore: this.score,
                    Score: '0',
                    status: 'start',
                    time: '180',
                };
                userRef.update(updateInfo_2);
            }
            else {
                var updateInfo_3 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    Score: "0",
                    status: "start",
                    time: "180",
                };
                userRef.update(updateInfo_3);
            }
        }
    };
    gameMGR.prototype.ToDinosaur = function () {
        this.playerStatus = "playGame";
        cc.audioEngine.playEffect(this.click_playgame_sound, false);
        this.writeUserData(); //TODO:firebase bug
        cc.audioEngine.pauseAll();
        cc.log("jump to Dino");
        cc.director.loadScene('dino_game');
    };
    gameMGR.prototype.ToPacman = function () {
        this.playerStatus = "goToilet";
        cc.audioEngine.playEffect(this.click_bottle_sound, false);
        this.writeUserData(); //TODO:firebase bug
        cc.audioEngine.pauseAll();
        cc.log("jump to pacman");
        cc.director.loadScene('Pacman');
    };
    gameMGR.prototype.onLoad = function () {
        //this.loadUserData();//TODO:firebase bug 
        //office setting
        cc.log("initial load:working");
        //this.officeLevel = "BASIC";
    };
    gameMGR.prototype.start_step = function () {
        this.isFinish = false;
        this.isTimeover = false;
        this.resultNode.opacity = 0;
        //this.radioBtn.getComponent(cc.Button).interactable = true;
        //this.playBtn.getComponent(cc.Button).interactable = true;
        //this.bottleBtn.getComponent(cc.Button).interactable = true;
        this.restartBtn.getComponent(cc.Button).interactable = false;
        this.exitBtn.getComponent(cc.Button).interactable = false;
        if (this.bgm_state == "music") {
            //cc.audioEngine.playMusic(this.bgm_music,true);
        }
        else {
            //cc.audioEngine.playMusic(this.bgm_amb,true);
        }
        this.Timer();
    };
    gameMGR.prototype.start = function () {
        cc.log("Start Game!");
        cc.audioEngine.pauseAll();
        this.loadUserData();
        this.start_step();
        this.setting();
    };
    gameMGR.prototype.setting = function () {
        if (this.officeLevel == 'BASIC') {
            cc.log("basic office setting...");
            this.basicofficeNode.opacity = 255;
            this.advanceofficeNode.opacity = 0;
            this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
            this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = true;
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
            cc.log(this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable);
        }
        else {
            cc.log("advance office setting...");
            this.basicofficeNode.opacity = 0;
            this.advanceofficeNode.opacity = 255;
            this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = true;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
        }
    };
    gameMGR.prototype.update = function (dt) {
        ///* TODO:time
        if (this.gameTime < 33) { // time < 33 -> cannot go to toilet
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
        }
        else {
            if (this.officeLevel == "BASIC") {
                this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
            }
            else {
                this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
            }
        }
        //*/
    };
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "basicofficeNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "advanceofficeNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "click_playgame_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "click_bottle_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "click_radio_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "click_restart_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "bgm_success", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "bgm_music", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], gameMGR.prototype, "bgm_amb", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "playBtn", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "restartBtn", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "exitBtn", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "resultText", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "timeNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "scoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "finalscoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameMGR.prototype, "resultNode", void 0);
    gameMGR = __decorate([
        ccclass
    ], gameMGR);
    return gameMGR;
}(cc.Component));
exports.default = gameMGR;

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
        //# sourceMappingURL=gameMGR.js.map
        