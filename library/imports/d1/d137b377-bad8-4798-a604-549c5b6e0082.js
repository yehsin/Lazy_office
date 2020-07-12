"use strict";
cc._RF.push(module, 'd137bN3uthHmKYEVJxbbgCC', 'maingame_mgr');
// script/maingame_mgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var maingame_mgr = /** @class */ (function (_super) {
    __extends(maingame_mgr, _super);
    function maingame_mgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boss = null;
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
        _this.user_ID = '789'; //TODO:delete this only for debug
        _this.playerStatus = 'nothing';
        _this.officeLevel = "BASIC";
        _this.isDead = false;
        _this.CdTimePac = 0;
        _this.CdTimeDino = 0;
        _this.nextStatus = "";
        return _this;
    }
    maingame_mgr.prototype.stateChange = function (playing, working) {
        if (playing == false && working == false) {
            this.playerStatus = 'nothing';
        }
        else if (playing == true) {
            this.playerStatus = 'playing';
        }
        else if (working == true) {
            this.playerStatus = 'working';
        }
        cc.log(this.playerStatus);
    };
    maingame_mgr.prototype.restart = function () {
        cc.audioEngine.playEffect(this.click_restart_sound, false);
        cc.log("restart");
        //this.start_step();
        cc.director.loadScene("userInfo");
    };
    maingame_mgr.prototype.exit = function () {
        cc.audioEngine.playEffect(this.click_restart_sound, false);
        //cc.log("exit");
        //cc.director.loadScene("userInfo");
        window.close();
    };
    maingame_mgr.prototype.finishgame = function () {
        cc.audioEngine.pauseAll();
        //cc.audioEngine.playMusic(this.bgm_success,false); //TODO: cannot play 
        cc.log("SUCCESS!");
        this.score = this.score + 300;
        this.boss.getComponent('boss').finish();
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
    maingame_mgr.prototype.radio_change = function () {
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
    maingame_mgr.prototype.Timer = function () {
        if (this.gameTime == -1)
            this.gameTime = 10;
        cc.log("start timer:", this.gameTime);
        this.schedule(function () {
            this.gameTime -= 1;
            if (this.CdTimeDino > 0) {
                this.CdTimeDino -= 1;
            }
            if (this.CdTimePac > 0) {
                this.CdTimePac -= 1;
            }
            //cc.log(this.gameTime);
            if (this.gameTime <= 0 && this.isTimeover == false) {
                this.isTimeover = true;
                this.finishgame();
                this.gameTime = 0;
                // jump to another scene or show result directly
            }
            if (this.gameTime < 0)
                this.gameTime = 0;
            if (this.gameTime > 0) {
                if (this.playerStatus == 'playing')
                    this.score += 2;
                else if (this.playerStatus == 'working')
                    this.score -= 1;
            }
            this.scoreNode.getComponent(cc.Label).string = String(this.score);
            this.timeNode.getComponent(cc.Label).string = String(this.gameTime);
        }, 1);
    };
    maingame_mgr.prototype.loadUserData = function () {
        var _this = this;
        cc.log("start connecting with firebase");
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
            cc.log('total score:', snapshot.val().totalScore, 
            //'\nscore',snapshot.val().Score, //score
            '\nminigamescore', snapshot.val().minigameScore, '\nstatus', snapshot.val().status, '\ntime', snapshot.val().time, '\noffice', snapshot.val().office);
            _this.officeLevel = snapshot.val().office;
            if (snapshot.val().status == "start") { // NEW GAME
                cc.log("new game");
                _this.gameTime = 120;
                _this.score = 0;
                ScoreNum = 0;
            }
            else if (snapshot.val().status == "endgame_dino") {
                cc.log("end of mini game dino");
                cc.director.resume(); // TODO: may be harmful
                _this.gameTime = Number(snapshot.val().time);
                var score_main = +snapshot.val().Score;
                var score_mini = +snapshot.val().minigameScore;
                ScoreNum = score_main + score_mini;
                _this.score = ScoreNum;
                //this.CdTimeDino = 10;
                userRef.update({ status: 'start' });
            }
            else if (snapshot.val().status == "endgame_pac") {
                cc.log("end of mini game pac");
                cc.director.resume(); // TODO: may be harmful
                _this.gameTime = Number(snapshot.val().time);
                var score_main = +snapshot.val().Score;
                var score_mini = +snapshot.val().minigameScore;
                ScoreNum = score_main + score_mini;
                _this.score = ScoreNum;
                _this.CdTimePac = 30;
                userRef.update({ status: 'start' });
            }
            _this.setting();
            scorenode.getComponent(cc.Label).string = ScoreNum.toString();
            _this.Hscore = snapshot.val().HScore; //load highest score
            _this.totalScore = snapshot.val().totalScore; //load total score until now
            _this.officeLevel = snapshot.val().office; //load office
            cc.log("remaining time:", _this.gameTime);
            cc.log("score:", _this.score);
            cc.log("HScore:", _this.Hscore);
        });
    };
    maingame_mgr.prototype.updateScore = function (addScore) {
        this.score = this.score + addScore;
        this.scoreNode.getComponent(cc.Label).string = this.score.toString();
    };
    maingame_mgr.prototype.writeUserData = function () {
        var _this = this;
        var animState = this.boss.getComponent('boss').getAnimState();
        cc.log(animState);
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", function (snapshot) {
            _this.Hscore = snapshot.val().HScore;
        });
        if (this.isFinish == false) //
         {
            var updateInfo_1 = {
                'minigameScore': 0,
                'Score': this.score,
                'status': this.nextStatus,
                'time': this.gameTime,
                'bossState': animState
            };
            userRef.update(updateInfo_1);
        }
        else if (this.isDead == true) {
            if (this.totalScore >= 1000 && this.officeLevel == 'BASIC') {
                this.officeLevel = "ADVANCE";
            }
            else if (this.totalScore < 1000 && this.officeLevel == "ADVANCE") {
                this.officeLevel = 'BASIC';
            }
            if (this.score > this.Hscore) { //new record
                cc.log('new record:', this.score, this.Hscore);
                var updateInfo_4 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    HScore: this.score,
                    Score: this.score,
                    status: 'start',
                    time: '120',
                    bossState: 'sleep'
                };
                userRef.update(updateInfo_4);
            }
            else {
                var updateInfo_5 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    Score: this.score,
                    status: "start",
                    time: "120",
                    bossState: 'sleep'
                };
                userRef.update(updateInfo_5);
            }
        }
        else if (this.isFinish == true && this.isDead == false) {
            if (this.totalScore > 1000 && this.officeLevel == 'BASIC') {
                this.officeLevel = "ADVANCE";
            }
            if (this.score > this.Hscore) { //new record
                cc.log('new record:', this.score, this.Hscore);
                var updateInfo_2 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    HScore: this.score,
                    Score: '0',
                    status: 'start',
                    time: '120',
                    bossState: 'sleep'
                };
                userRef.update(updateInfo_2);
            }
            else {
                var updateInfo_3 = {
                    office: this.officeLevel,
                    totalScore: this.totalScore,
                    Score: "0",
                    status: "start",
                    time: "120",
                    bossState: 'sleep'
                };
                userRef.update(updateInfo_3);
            }
        }
    };
    maingame_mgr.prototype.ToDinosaur = function () {
        //this.playerStatus = "playGame";
        cc.audioEngine.playEffect(this.click_playgame_sound, false);
        this.nextStatus = "endgame_dino";
        this.writeUserData(); //TODO:firebase bug
        //cc.audioEngine.pauseAll();
        cc.log("jump to Dino");
        cc.director.loadScene('dino_game');
    };
    maingame_mgr.prototype.ToPacman = function () {
        //this.playerStatus = "goToilet";
        cc.audioEngine.playEffect(this.click_bottle_sound, false);
        this.nextStatus = "endgame_pac";
        this.writeUserData(); //TODO:firebase bug
        cc.audioEngine.pauseAll();
        cc.log("jump to pacman");
        cc.director.loadScene('Pacman');
    };
    maingame_mgr.prototype.onLoad = function () {
        //this.loadUserData();//TODO:firebase bug 
        //office setting
        cc.log("initial load:working", this.enabled);
        this.loadUserData();
        //this.officeLevel = "BASIC";
        this.start_step();
    };
    maingame_mgr.prototype.GameOver = function () {
        //cc.audioEngine.pauseAll();
        //cc.audioEngine.playMusic(this.bgm_success,true); //TODO: cannot play 
        cc.log("GameOver at main scene");
        this.score = this.score - 200;
        //this.score = 600; //TODO:for debug
        this.totalScore = this.totalScore + this.score;
        //this.finalscoreNode.getComponent(cc.Label).string = String(this.score);
        //this.resultNode.opacity = 255;
        //this.restartBtn.getComponent(cc.Button).interactable = true;
        //this.exitBtn.getComponent(cc.Button).interactable = true;
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
        this.isDead = true;
        this.writeUserData();
        cc.director.loadScene("GameOver");
    };
    maingame_mgr.prototype.start_step = function () {
        this.isFinish = false;
        this.isTimeover = false;
        this.resultNode.opacity = 0;
        //this.radioBtn.getComponent(cc.Button).interactable = true;
        //this.playBtn.getComponent(cc.Button).interactable = true;
        //this.bottleBtn.getComponent(cc.Button).interactable = true;
        this.restartBtn.getComponent(cc.Button).interactable = false;
        this.exitBtn.getComponent(cc.Button).interactable = false;
        /*
        if(this.bgm_state == "music"){
          //cc.audioEngine.playMusic(this.bgm_music,true);
        }
        else{
          //cc.audioEngine.playMusic(this.bgm_amb,true);
        }
        */
        //this.Timer();
    };
    maingame_mgr.prototype.start = function () {
        cc.log("Start Game!");
        cc.audioEngine.pauseAll();
        //this.loadUserData();
        //this.start_step();
        //this.setting();
        this.Timer();
    };
    maingame_mgr.prototype.setting = function () {
        if (this.officeLevel == 'BASIC') {
            cc.log("basic office setting...");
            this.basicofficeNode.opacity = 255;
            this.advanceofficeNode.opacity = 0;
            this.advanceofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
            this.basicofficeNode.getChildByName('radio').getComponent(cc.Button).interactable = true;
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
            cc.log('basic coffee:', this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable);
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
    maingame_mgr.prototype.update = function (dt) {
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
        /*
        if(this.CdTimeDino>0){
          cc.log('DINO:',this.CdTimeDino);
    
          this.playBtn.getComponent(cc.Button).interactable = false;
    
        }
        else{
          this.playBtn.getComponent(cc.Button).interactable = true;
    
    
        }
        */
        if (this.CdTimePac > 0) {
            cc.log('PAC:', this.CdTimePac);
            this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
            this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = false;
        }
        else if (this.CdTimePac <= 0 && this.gameTime >= 33) {
            if (this.officeLevel == 'BASIC')
                this.basicofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
            else if (this.officeLevel == 'ADVANCE')
                this.advanceofficeNode.getChildByName('coffee').getComponent(cc.Button).interactable = true;
        }
        //*/
    };
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "boss", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "basicofficeNode", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "advanceofficeNode", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "click_playgame_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "click_bottle_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "click_radio_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "click_restart_sound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "bgm_success", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "bgm_music", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], maingame_mgr.prototype, "bgm_amb", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "playBtn", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "restartBtn", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "exitBtn", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "resultText", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "timeNode", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "scoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "finalscoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], maingame_mgr.prototype, "resultNode", void 0);
    maingame_mgr = __decorate([
        ccclass
    ], maingame_mgr);
    return maingame_mgr;
}(cc.Component));
exports.default = maingame_mgr;

cc._RF.pop();