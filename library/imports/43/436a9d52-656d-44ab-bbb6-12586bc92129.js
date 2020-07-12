"use strict";
cc._RF.push(module, '436a91SZW1Eq7u2ElhrySEp', 'position_manage');
// script/dino_script/position_manage.ts

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
        _this.catusNode = null;
        _this.catus2Node = null;
        _this.birdNode = null;
        _this.speedup = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.schedule(function () {
            this.speedup += 1;
        }, 3);
    };
    NewClass.prototype.update = function (dt) {
        this.catusNode.x -= (8 + this.speedup);
        this.catus2Node.x -= (8 + this.speedup);
        this.birdNode.x -= (8 + this.speedup);
        if (this.birdNode.x < -660) {
            this.birdNode.x = Math.random() * 10000 + 3200;
        }
        if (this.catusNode.x < -500) {
            cc.log(Math.random() * 1000);
            this.catusNode.x = Math.random() * 100 + 500;
        }
        if (this.catus2Node.x < -500) {
            cc.log(Math.random() * 1000);
            this.catus2Node.x = Math.random() * 10000 + 1200;
        }
        if (Math.abs(this.catusNode.x - this.catus2Node.x) < 300) {
            this.catus2Node.x += 400;
        }
        if (Math.abs(this.catusNode.x - this.birdNode.x) < 300) {
            this.birdNode.x += 400;
        }
        if (Math.abs(this.catus2Node.x - this.birdNode.x) < 300) {
            this.birdNode.x += 400;
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "catusNode", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "catus2Node", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "birdNode", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();