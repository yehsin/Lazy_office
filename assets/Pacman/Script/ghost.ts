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

    @property(cc.Node)
    private player: cc.Node = null;

    @property(cc.Node)
    private gameMgr: cc.Node = null;

    

    // 1 up 2 down 3 left 4 right
    private direction: number = 4;

    private ghostSpeedX: number = 0;

    private ghostSpeedY: number = 0;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        var n = Math.floor(Math.random()*Math.floor(2));
        if (n == 0){
            this.direction = 3;
        }
        else{
            this.direction = 4;
        }
    }

    
    private ghostMovement(dt){
        if (this.direction == 1){
            this.ghostSpeedX = 0;
            this.ghostSpeedY = 100;
        }
        if (this.direction == 2){
            this.ghostSpeedX = 0;
            this.ghostSpeedY = -100;
        }
        if (this.direction == 3){
            this.ghostSpeedX = -100;
            this.ghostSpeedY = 0;
        }
        if (this.direction == 4){
            this.ghostSpeedX = 100;
            this.ghostSpeedY = 0;
        }

        this.node.x += this.ghostSpeedX * dt;
        this.node.y += this.ghostSpeedY * dt;
    }

    private ghostMovement2(dt){
        if (this.player.x > this.node.x){
            this.ghostSpeedX = 100;
        }
        if (this.player.x < this.node.x){
            this.ghostSpeedX = -100;
        }
        if (this.player.y > this.node.y){
            this.ghostSpeedY = 100;
        }
        if (this.player.y < this.node.y){
            this.ghostSpeedY = -100;
        }

        this.node.x += this.ghostSpeedX*dt;
        this.node.y += this.ghostSpeedY*dt;
    }

    update (dt) {
        this.ghostMovement(dt);
        //cc.log(this.player.getComponent("pacman").Dead())
        if (this.player.getComponent("pacman").Dead()){
            this.node.destroy();
        }

        if (this.gameMgr.getComponent("gameMgr").notime()){
            this.node.destroy();
        }
        //this.node.x += 100*dt;
        //cc.log(this.node.x);
        //cc.log(this.node.y);
    }

    onCollisionEnter(other){
        //cc.log(other.node.group);
        //cc.log(other.tag)

        if (this.ghostSpeedY == 0){
            if (other.node.group == "situation1"){
                if (other.tag == 13){
                    this.direction = 1;
                }
                if (other.tag == 14){
                    this.direction = 1;
                }
                if (other.tag == 23){
                    this.direction = 2;
                }
                if (other.tag == 24){
                    this.direction = 2;
                }
            }

            if (other.node.group == "situation2"){
                var n = Math.floor(Math.random()*Math.floor(2));
                if (n == 0)
                    this.direction = 1;
                else
                    this.direction = 2;
            }

            if (other.node.group == "situation3"){
                var n = Math.floor(Math.random()*Math.floor(2));
                if (other.tag == 1){
                    if (n == 0)
                        this.direction = 1;
                }
                if (other.tag == 2){
                    if (n == 0)
                        this.direction = 2;
                }
            }
        }

        if (this.ghostSpeedX == 0){
            if (other.node.group == "situation1"){
                if (other.tag == 13){
                    this.direction = 3;
                }
                if (other.tag == 14){
                    this.direction = 4;
                }
                if (other.tag == 23){
                    this.direction = 3;
                }
                if (other.tag == 24){
                    this.direction = 4;
                }
            }

            if (other.node.group == "situation2"){
                var n = Math.floor(Math.random()*Math.floor(2));
                if (other.tag == 3){
                    if (n == 0)
                        this.direction = 3;
                }
                if (other.tag == 4){
                    if (n == 0)
                        this.direction = 4;
                }
            }

            if (other.node.group == "situation3"){
                var n = Math.floor(Math.random()*Math.floor(2));
                if (n == 0)
                    this.direction = 3;
                else
                    this.direction = 4;
            }
        }

    }

    onBeginContact(contact, self, other){
        //cc.log(other.node.name)
        if (other.node.name == "Pacman"){
            self.node.destroy();
        }
    }
}
