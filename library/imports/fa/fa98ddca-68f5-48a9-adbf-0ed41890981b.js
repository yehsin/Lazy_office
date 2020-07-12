"use strict";
cc._RF.push(module, 'fa98d3KaPVIqa2/DtQYkJgb', 'bird');
// script/dino_script/bird.ts

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
        _this.speedup = 0;
        return _this;
    }
    // onLoad () {}
    NewClass.prototype.start = function () {
        var node = this.node;
        this.schedule(function () {
            this.speedup += 1;
        }, 3);
    };
    NewClass.prototype.update = function (dt) {
        this.node.x -= (8 + this.speedup);
        if (this.node.x < -660) {
            this.node.x = Math.random() * 10000 + 3200;
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();