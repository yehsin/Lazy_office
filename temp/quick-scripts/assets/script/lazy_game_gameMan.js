(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/lazy_game_gameMan.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f81ceKVLdCtZFyEP6/LzSB', 'lazy_game_gameMan', __filename);
// script/lazy_game_gameMan.ts

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
        _this.Time = null;
        _this.Score = null;
        _this.resultbg = null;
        _this.scoretitle = null;
        _this.showScore = null;
        _this.dinoLife = null;
        _this.restart = null;
        _this.result_Man = null;
        _this.QTE = null;
        _this.Boss = null;
        _this.Dino = null;
        _this.isTimeover = false;
        _this.show = false;
        _this.mainScore = 0;
        _this.totalScore = 0;
        _this.HScore = 0;
        return _this;
    }
    NewClass.prototype.loadUserData = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var ScoreNum = 0;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", function (snapshot) {
            _this.gametime = snapshot.val().time;
            _this.score = 0;
            _this.mainScore = snapshot.val().Score;
            _this.totalScore = snapshot.val().totalScore;
            _this.HScore = snapshot.val().HScore;
            cc.log('office:', snapshot.val().office);
            if (snapshot.val().office == 'BASIC') {
                _this.Dino.getComponent('dinosour').changrDinoSkin(false);
            }
            else {
                _this.Dino.getComponent('dinosour').changrDinoSkin(true);
            }
        });
    };
    NewClass.prototype.runUserdata = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.on("value", function (snapshot) {
            _this.gametime = snapshot.val().time;
            _this.score = Number(snapshot.val().minigameScore);
        });
    };
    NewClass.prototype.Timer = function () {
        var _this = this;
        this.schedule(function () {
            _this.gametime -= 1;
            if (_this.score >= 0)
                _this.score += 10;
            if (_this.gametime <= 0 && _this.isTimeover == false) {
                _this.isTimeover = true;
            }
        }, 1);
        if (this.gametime < 0)
            this.gametime = 0;
    };
    NewClass.prototype.writrdata = function (state) {
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        if (state == "restart") {
            var anim = this.Boss.getComponent('boss').getAnimState();
            cc.log("restart with anim:", anim, '\nscore:', this.Score.getComponent(cc.Label).string);
            userRef.update({
                time: this.gametime,
                minigameScore: this.Score.getComponent(cc.Label).string,
                status: 'endgame_restart',
                bossState: anim,
            });
        }
        else if (state == "success") {
            var anim = this.Boss.getComponent('boss').getAnimState();
            cc.log("success with anim:", anim, '\nscore:', this.Score.getComponent(cc.Label).string);
            userRef.update({
                time: this.gametime,
                minigameScore: this.Score.getComponent(cc.Label).string,
                status: 'endgame_dino',
                bossState: anim,
            });
        }
    };
    NewClass.prototype.show_result = function () {
        this.result_Man.opacity = 255;
        this.resultbg.opacity = 150;
        this.scoretitle.opacity = 255;
        this.showScore.opacity = 255;
        this.restart.opacity = 255;
        //this.back.opacity = 255;
        this.showScore.getComponent(cc.Label).string = String(this.score);
        this.restart.getComponent(cc.Button).interactable = true;
        //this.back.getComponent(cc.Button).interactable = true;
    };
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        var _this = this;
        this.loadUserData();
        this.gametime = Number(this.Time.getComponent(cc.Label).string);
        this.restart.getComponent(cc.Button).interactable = false;
        //this.back.getComponent(cc.Button).interactable = false;
        this.restart.on('click', function () {
            cc.log('click');
            var anim = _this.Boss.getComponent('boss').getAnimState();
            if (cc.director.getScene().name == 'dino_game' && anim != 'angry') {
                cc.log('click');
                //this.dinoLife.getComponent("dinosour").dinoLife = true;
                //cc.director.resume();
                _this.writrdata('restart');
                cc.director.loadScene('dino_game');
            }
            else {
                //this.dinoLife.getComponent("dinosour").dinoLife = true;
                cc.log('pack');
                //cc.director.resume();
                cc.director.loadScene('PAC_MAN');
            }
        });
        /*this.back.on('click',()=>{
            this.writrdata();
            cc.director.loadScene('working');
        });*/
    };
    NewClass.prototype.GameOver = function () {
        //cc.audioEngine.pauseAll();
        //cc.audioEngine.playMusic(this.bgm_success,true); //TODO: cannot play 
        //cc.log("GameOver at dino scene");
        this.score = this.score - 300;
        cc.log("GameOver at dino scene", this.score);
        this.totalScore = this.totalScore + this.score;
        cc.audioEngine.pauseAll();
        //this.isDead = true;
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        if (this.score > this.HScore) { //new record
            userRef.update({
                Score: this.score,
                HScore: this.score,
                totalScore: this.totalScore,
                status: 'start',
                bossState: 'sleep',
                time: '180'
            });
        }
        else {
            userRef.update({
                Score: this.score,
                totalScore: this.totalScore,
                status: 'start',
                bossState: 'sleep',
                time: '180'
            });
        }
        cc.director.loadScene("GameOver");
    };
    NewClass.prototype.successGame = function () {
        cc.log('mgr success');
        this.writrdata('success');
        cc.director.loadScene('working');
    };
    NewClass.prototype.start = function () {
        this.runUserdata();
        this.Timer();
    };
    NewClass.prototype.update = function (dt) {
        this.Time.getComponent(cc.Label).string = String(this.gametime);
        if (!this.show)
            this.Score.getComponent(cc.Label).string = String(this.score);
        if (this.dinoLife.getComponent("dinosour").dinoLife == false) {
            //cc.director.pause();
            if (!this.show)
                this.show_result();
            this.show = true;
        }
        //success
        /* TODO:change
        
                if(this.QTE.getComponent('QTE').QTE_count ==true  ){ //&& this.Boss.getComponent('boss').animState.name == 'back'
                    this.writrdata('success');
                    this.dinoLife.getComponent("dinosour").dinoLife == false;
                    cc.director.loadScene('working');
                }
                */
        //cc.log(this.restart.getComponent(cc.Button).interactable);
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Time", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Score", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "resultbg", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "scoretitle", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "showScore", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "dinoLife", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "restart", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "result_Man", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "QTE", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Boss", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Dino", void 0);
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
        //# sourceMappingURL=lazy_game_gameMan.js.map
        