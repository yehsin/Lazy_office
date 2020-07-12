// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.TiledMap)
    map: cc.TiledMap =  null;

    onload (){
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.debugDrawFlags = 255;
    }

    start (){
        let tiledSize = this.map.getTileSize();
        let layer = this.map.getLayer("block");
        let layerSize = layer.getLayerSize();

        for (let i=0; i<layerSize.width; i++){
            for (let j=0; j<layerSize.height; j++){
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0){
                    tiled.node.group = 'block';

                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width/2, tiledSize.height/2);
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    }
}
