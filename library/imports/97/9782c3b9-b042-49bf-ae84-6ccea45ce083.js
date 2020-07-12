"use strict";
cc._RF.push(module, '9782cO5sEJJv66EbM6kXOCD', 'login');
// script/login.ts

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
var username = '';
var password = '';
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.input = null;
        _this.enter = null;
        _this.switch = null;
        _this.icon = null;
        _this.user = null;
        _this.Logup = null;
        _this.inup_set = null;
        _this.logup = false;
        _this.isuser = false;
        _this.ispass = false;
        return _this;
    }
    login.prototype.onLoad = function () {
        var _this = this;
        this.switch.on('click', function () {
            if (_this.logup == false) { //login
                _this.logup = true;
                _this.switch.getChildByName('switch_login').opacity = 0;
                _this.switch.getChildByName('switch_signup').opacity = 255;
            }
            else {
                _this.logup = false;
                _this.switch.getChildByName('switch_signup').opacity = 0;
                _this.switch.getChildByName('switch_login').opacity = 255;
            }
            cc.log('switch', _this.logup);
        });
        this.enter.on('click', function () {
            _this.login_data();
            cc.log('aaa');
        });
        this.Logup.on('click', function () {
            //cc.log('change');
            //var type = this.Logup.getComponent(cc.Label).string;
            var type = _this.inup_set.string;
            cc.log(type, 'change');
            if (type == "sign up") {
                _this.logup = false;
                //this.Logup.getChildByName('Label').getComponent(cc.Label).string = 'login';
                _this.inup_set.string = 'log in';
            }
            else {
                _this.logup = true;
                //this.Logup.getChildByName('Label').getComponent(cc.Label).string = 'logup';
                _this.inup_set.string = 'sign up';
            }
        });
    };
    login.prototype.login_data = function () {
        var _this = this;
        if (!this.isuser) {
            if (this.input.getComponent(cc.EditBox).string != '') {
                username = this.input.getComponent(cc.EditBox).string;
                this.input.getComponent(cc.EditBox).string = '';
                this.icon.opacity = 255;
                this.user.opacity = 255;
                this.user.getComponent(cc.Label).string = username;
                this.isuser = true;
            }
        }
        else if (!this.ispass) {
            if (this.input.getComponent(cc.EditBox).string != '') {
                password = this.input.getComponent(cc.EditBox).string;
            }
            if (!this.logup) {
                firebase.auth().signInWithEmailAndPassword(username, password).then(function () {
                    cc.log('displayname:', firebase.auth().currentUser.email);
                    cc.director.loadScene('userInfo'); //check
                }).catch(function (error) {
                    alert(error);
                    _this.isuser = false;
                    _this.ispass = false;
                    _this.icon.opacity = 0;
                    _this.user.opacity = 0;
                });
            }
            else { // logup
                firebase.auth().createUserWithEmailAndPassword(username, password).then(function () {
                    var User = username.split('@');
                    var userEmail = User[0];
                    firebase.auth().currentUser.displayname = userEmail;
                    cc.log('displayname:', firebase.auth().currentUser.displayname);
                    //currentuser.displayname
                    firebase.database().ref('/user/' + userEmail).set({
                        time: '180',
                        status: 'start',
                        minigameScore: '0',
                        Score: '0',
                        HScore: '0',
                        totalScore: '0',
                        office: 'BASIC' //check
                    });
                    cc.director.loadScene('userInfo'); //check
                }).catch(function (error) {
                    alert(error);
                    _this.isuser = false;
                    _this.ispass = false;
                    _this.icon.opacity = 0;
                    _this.user.opacity = 0;
                });
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], login.prototype, "input", void 0);
    __decorate([
        property(cc.Node)
    ], login.prototype, "enter", void 0);
    __decorate([
        property(cc.Node)
    ], login.prototype, "switch", void 0);
    __decorate([
        property(cc.Node)
    ], login.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], login.prototype, "user", void 0);
    __decorate([
        property(cc.Node)
    ], login.prototype, "Logup", void 0);
    __decorate([
        property(cc.Label)
    ], login.prototype, "inup_set", void 0);
    login = __decorate([
        ccclass
    ], login);
    return login;
}(cc.Component));
exports.default = login;

cc._RF.pop();