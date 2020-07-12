(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/boss.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ec57d1zVFFLyIqcxOidCn9V', 'boss', __filename);
// script/boss.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var boss = /** @class */ (function (_super) {
    __extends(boss, _super);
    function boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim_str = ""; // "sleep" "walk" "catch" "angry" "back"
        _this.animPlay = null;
        _this.boss_state = "";
        _this.sleep_time = 3;
        _this.isCatch = false;
        _this.scene = "";
        _this.user_ID = "";
        _this.isSend = false;
        _this.isStart = false;
        _this.computer = null;
        _this.QTE = null;
        _this.gameMgr = null;
        _this.lazygameMgr = null;
        _this.walking_sound = null;
        _this.score = 0;
        _this.totalScore = 0;
        _this.HScore = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    boss.prototype.onKeyDown = function (event) {
        //cc.log("Key Down: " + event.keyCode);
        if (event.keyCode == cc.macro.KEY.q) {
            cc.log("debug mode long");
            if (this.isStart) {
                if (this.animState.name == 'sleep')
                    this.animState.repeatCount = 7;
            }
        }
        else if (event.keyCode == cc.macro.KEY.e) {
            cc.log("debug mode short");
            if (this.isStart) {
                if (this.animState.name == 'sleep')
                    this.animState.repeatCount = 1;
            }
        }
    };
    boss.prototype.onLoad = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.isStart = false;
        this.anim_str = "";
        this.loadAnimStr();
        this.animPlay = this.getComponent(cc.Animation);
    };
    boss.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max)) + 3;
    };
    boss.prototype.loadAnimStr = function () {
        var _this = this;
        var userEmail = firebase.auth().currentUser.email;
        var split_name = userEmail.split('@');
        this.user_ID = split_name[0];
        var userRef = firebase.database().ref("/user/" + this.user_ID);
        userRef.once("value", function (snapshot) {
            cc.log('bossState', snapshot.val().bossState);
            /* //TODO:
            if(this.scene!='working'){
                this.score =snapshot.val().Score;
                this.totalScore= snapshot.val().totalScore;
                this.HScore = snapshot.val().HScore;
  
            }
            */
            _this.anim_str = snapshot.val().bossState;
            if (snapshot.val().status == "endgame_restart") {
                cc.log("endgame_restart");
                if (_this.anim_str == "sleep") {
                    _this.sleep_time = 1;
                }
            }
            cc.log("load boss state:", _this.anim_str);
            //if(this.anim_str){
            _this.animState = _this.animPlay.play(_this.anim_str);
            _this.isStart = true;
            //}
            if (_this.anim_str == 'sleep') {
                _this.animState.wrapMode = cc.WrapMode.Loop;
                _this.animState.repeatCount = _this.sleep_time;
                cc.log(_this.sleep_time);
            }
        });
    };
    boss.prototype.GameOver = function () {
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
    boss.prototype.start = function () {
        this.scene = cc.director.getScene().name;
        this.sleep_time = this.getRandomInt(3);
        this.loadAnimStr();
        //this.sleep_time = this.getRandomInt(3);
        //cc.log("boss start at",this.scene);
        //this.anim_str = "sleep";
        //this.setAnim(this.anim_str);
        // cc.log("start anim:",this.anim_str);
        /*
         this.animState =  this.animPlay.play(this.anim_str);
         if(this.anim_str=='sleep'){
             this.animState.wrapMode = cc.WrapMode.Loop;
             this.animState.repeatCount = this.sleep_time;
         }
 
         //TODO: transition when angry?
         */
    };
    boss.prototype.setAnim = function (anim_s) {
        //cc.log('setAnim');
        if (anim_s == this.anim_str)
            return;
        else {
            this.anim_str = anim_s;
            //cc.log('not return');
        }
        //this.animPlay.play(this.anim_str);
        this.animState = this.animPlay.play(this.anim_str);
        //cc.log('play:',this.anim_str);
        if (this.anim_str == "sleep") {
            this.animState.wrapMode = cc.WrapMode.Loop;
            this.animState.repeatCount = this.sleep_time;
            cc.log(this.sleep_time);
        }
        else if (this.scene != 'working' && this.anim_str == 'catch') {
            this.animState.wrapMode = cc.WrapMode.Loop;
        }
        else {
            this.animState.wrapMode = cc.WrapMode.Normal;
            this.animState.repeatCount = 1;
        }
        if (this.anim_str == 'walk') {
            //cc.audioEngine.playEffect(this.walking_sound,false);
        }
    };
    boss.prototype.getAnimState = function () {
        return this.animState.name;
    };
    boss.prototype.setAnimState = function (anim) {
        cc.log(anim);
        this.setAnim(anim);
    };
    boss.prototype.update = function (dt) {
        if (this.isStart == true) {
            //cc.log(this.isCatch);
            if (this.animState && this.animState.isPlaying == false && this.animState.isPaused == false) {
                //cc.log("stop")
                if (this.animState.name == "walk") {
                    this.isSend = false;
                    this.sleep_time = this.getRandomInt(3);
                    //this.anim_str = "catch";
                    this.setAnim("catch");
                }
                else if (this.animState.name == "sleep") {
                    //this.anim_str = "walk";
                    this.setAnim("walk");
                }
                else if (this.animState.name == "catch") {
                    if (this.scene == 'working')
                        this.setAnim("back");
                    //this.anim_str = "back";
                }
                else if (this.animState.name == "walk") {
                    //this.anim_str = "catch";
                    this.setAnim("catch");
                }
                else if (this.animState.name == "angry") {
                    if (this.isCatch == false) {
                        this.isCatch = true;
                        cc.log("call gameover");
                        if (this.scene == 'working') {
                            this.gameMgr.getComponent('maingame_mgr').GameOver();
                        }
                        else {
                            this.QTE.getComponent('QTE').changeQTEingState();
                            this.lazygameMgr.getComponent('lazy_game_gameMan').GameOver();
                        }
                    }
                    //call function at maingame_mgr
                }
                else if (this.animState.name == "back") {
                    //this.anim_str = "sleep";
                    this.isCatch = false;
                    this.setAnim("sleep");
                }
                //cc.log('try to play:',this.anim_str);
            }
            else if (this.animState.isPlaying == true && this.animState.name == "catch") {
                //cc.log("workstate:",this.computer.getComponent('computer').getPlayingState());
                if (this.scene == 'working') {
                    if (this.computer.getComponent('computer').getPlayingState() == false && this.computer.getComponent('computer').getWorkingState() == false) { //
                        if (this.isCatch == false) {
                            this.isCatch = true;
                            this.gameMgr.getComponent('maingame_mgr').updateScore(-100);
                        }
                        //cc.log("nothing happen");
                    }
                    else if (this.computer.getComponent('computer').getPlayingState() == true && this.computer.getComponent('computer').getWorkingState() == false) {
                        //cc.log("lazy!!");
                        //this.anim_str="angry";
                        this.setAnim("angry");
                    }
                }
                else { //dino
                    if (this.isSend == false) {
                        this.isSend = true;
                        this.QTE.getComponent('QTE').catchDetect();
                    }
                }
            }
        }
        //cc.log(this.anim_str,this.animState.name,this.animState.isPlaying);
        // cc.log(this.animState.name,this.animState.isPlaying,this.animState.isPaused);
    };
    __decorate([
        property(cc.Node)
    ], boss.prototype, "computer", void 0);
    __decorate([
        property(cc.Node)
    ], boss.prototype, "QTE", void 0);
    __decorate([
        property(cc.Node)
    ], boss.prototype, "gameMgr", void 0);
    __decorate([
        property(cc.Node)
    ], boss.prototype, "lazygameMgr", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], boss.prototype, "walking_sound", void 0);
    boss = __decorate([
        ccclass
    ], boss);
    return boss;
}(cc.Component));
exports.default = boss;

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
        //# sourceMappingURL=boss.js.map
        