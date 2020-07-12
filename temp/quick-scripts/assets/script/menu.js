(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/menu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4df225qv9RF4YMd05PcKla7', 'menu', __filename);
// script/menu.ts

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
        _this.label = null;
        _this.bgm = null;
        _this.radio = null;
        _this.coffee = null;
        _this.play = null;
        _this.palybgm = true;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        /*
        this.radio.on('click',()=>{
            if(this.palybgm){
                cc.audioEngine.pauseMusic();
                this.palybgm = false;
            }
            else if(!this.palybgm){
                cc.audioEngine.resumeMusic();
                this.palybgm = true;
            }
        })
        */
        /*

        this.coffee.on('click',()=>{
            cc.director.loadScene('game2');
        })
        */
        /*this.coffee.on('mousemove',()=>{
            let action = cc.scaleBy(2,2);
            this.coffee.runAction(action);
        })*/
        /*
                this.play.on('click',()=>{
                    cc.director.loadScene('game1');
                })
                */
    };
    NewClass.prototype.start = function () {
        //cc.audioEngine.playMusic(this.bgm,true);
    };
    NewClass.prototype.animation = function () {
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], NewClass.prototype, "bgm", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "radio", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "coffee", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "play", void 0);
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
        //# sourceMappingURL=menu.js.map
        