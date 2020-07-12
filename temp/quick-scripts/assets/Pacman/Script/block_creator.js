(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Pacman/Script/block_creator.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '66e70AdaBZElYuDnw+x/J4p', 'block_creator', __filename);
// Pacman/Script/block_creator.ts

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
        _this.map = null;
        return _this;
    }
    NewClass.prototype.onload = function () {
        var p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.debugDrawFlags = 255;
    };
    NewClass.prototype.start = function () {
        var tiledSize = this.map.getTileSize();
        var layer = this.map.getLayer("block");
        var layerSize = layer.getLayerSize();
        for (var i = 0; i < layerSize.width; i++) {
            for (var j = 0; j < layerSize.height; j++) {
                var tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {
                    tiled.node.group = 'block';
                    var body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    var collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    };
    __decorate([
        property(cc.TiledMap)
    ], NewClass.prototype, "map", void 0);
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
        //# sourceMappingURL=block_creator.js.map
        