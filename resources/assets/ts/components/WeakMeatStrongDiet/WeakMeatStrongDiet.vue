<template>
<div id="content" class="container-fluid p-0">
    <div class="row">
        <div class="col-md-12">
            <p class="content">Success：<code>.bg-success</code></p>
            <div class="progress">
	            <div class="progress-bar bg-success" :aria-valuenow="me.life" aria-valuemin="0" aria-valuemax="100" :style="life"></div>
            </div>
        </div>
        <canvas ref="my-canvas" width="1200" height="600"></canvas>
    </div>
</div>
</template>

<script lang="ts">
  // キャンバス用コンポーネントの読み込み
  import { getParentSize } from "../../utils.ts";
  import Circle from "./Circle.ts";
  import {Vue, Component, Watch} from 'vue-property-decorator';
  @Component
  export default class WeakMeatStrongDietComponent extends Vue {
    ctx: any;
    g: number = 0.1;
    first_flag: boolean = true;
    circles: any = [];//サークルオブジェクトを入れる関数
    time: number = 0;
    tm: any;
    mouse: any = { x: null, y:null };// マウス
    move: any;
    cw: number = 0;
    ch: number = 0;
    me: any = {
        life: 100
    };
    /** watch */
    @Watch('modalState')
    onValueChange(newValue: string, oldValue: string): void {
        $('#fireflyModal').modal();
    }
    mounted(): void {
        let canvas: any = this.$refs["my-canvas"];
        this.ctx = canvas.getContext("2d");
        this.cw = canvas.width;
        this.ch = canvas.height;
        this.tm = setInterval(this.main, 10);
        const self  = this;
        this.move = canvas.addEventListener("mousemove", (e: any) => {
            let rect = e.target.getBoundingClientRect();
            Object.assign(self.mouse, {x: e.clientX - rect.left, y: e.clientY - rect.top})
        }, false);
    }
    get life(): string {
        return `width:${this.me.life * 10}%`;
    }
    
    main(): void {
        //キャンバスをクリア（消す）
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        if(this.time>100 || this.time==0) {
            this.time = 0;
            //サークルオブジェクトを配列に格納
            this.circles.push(new Circle(this.circles.length, this.ctx, this.cw, this.ch));
            //あるオブジェクトを初期化
            if(!this.first_flag)
                this.circles[this.circles.length-1].init(this.circles.length%2,false);
            else{
                this.circles[this.circles.length-1].init(this.circles.length%2, true);
                this.first_flag = false;
            }
        }
        //サークルの衝突判定
        for(let i=0;i<this.circles.length;i++){
            for(let j=i+1;j<this.circles.length;j++){
                const circleA: Circle = this.circles[i];
                const circleB: Circle = this.circles[j];
                if (this.isCollision(circleA, circleB)) {

                    this.collisionCircleCircle(circleA, circleB); // 衝突の計算
                    this.survivalJudgment(circleA, circleB);
                }
            }
        }
        // 自身の位置等をUPDATE
        this.updateMe();
        
        this.circles.forEach((circle: Circle) => {
          circle.move();
          circle.collisionWall();
          circle.view();
      });
      this.time++;
    };

    /**
     * 自分自身のサークルをアップデート
     */
    updateMe(): void {
        //自分自身の場所を更新
        Object.assign(this.circles[0], {
            x: this.mouse.x,
            y: this.mouse.y
        });
        this.circles[0].view();
    }

    isCollision(a: Circle, b: Circle): boolean {
        let vx = a.x-b.x;
        let vy = a.y-b.y;
        //サークルaとサークルbが衝突した場合 -> true
        return vx*vx + vy*vy < (a.r + b.r) * (a.r + b.r)
    }
    
    /**
     * 衝突判定関数
     */
    collisionCircleCircle(a: any, b: any): any {
        let vx = a.x-b.x;
        let vy = a.y-b.y;
      //サークルaとサークルbが衝突した場合
        let len = Math.sqrt(vx*vx+vy*vy);
        let d = a.r+b.r-len;
        if( len > 0 ) {
            len =1/len;
        } 
        vx *= len;
        vy *= len;
        d /= 2.0;
        a.x += vx*d;
        a.y += vy*d;
        b.x -= vx*d;
        b.y -= vy*d;
        let t = - (vx*a.vx+vy*a.vy) / (vx*vx+vy*vy);
        let arx = a.vx+vx*t;
        let ary = a.vy+vy*t;

        t = - (-vy*a.vx+vx*a.vy) / (vy*vy+vx*vx);
        let amx = a.vx-vy*t;
        let amy = a.vy+vx*t;

        t = - (vx*b.vx+vy*b.vy) / (vx*vx+vy*vy);
        let brx = b.vx+vx*t;
        let bry = b.vy+vy*t;

        t = - (-vy*b.vx+vx*b.vy) / (vy*vy+vx*vx);
        let bmx = b.vx-vy*t;
        let bmy = b.vy+vx*t;
  
        let e = 0.8;
        let adx = (a.r*amx + b.r*bmx + bmx*e*b.r - amx*e*b.r) / (a.r + b.r);
        let bdx = -e*(bmx-amx) + adx;
        let ady = (a.r*amy+b.r*bmy + bmy*e*b.r - amy*e*b.r) / (a.r + b.r);
        let bdy = -e*(bmy - amy) + ady;
  
        a.vx = adx + arx;
        a.vy = ady + ary;
        b.vx = bdx + brx;
        b.vy = bdy + bry;
    }

    /**
     * 
     */
    survivalJudgment(circleA: Circle, circleB: Circle): void {
        if(circleA.life > circleB.life) {
            circleA.r += circleB.r / 10;
            circleB.r -= circleA.r / 10;
            circleA.addLife(circleB.life);
            circleB.subLife(circleA.life);
            if(circleA.num === 0) {
                console.log('aの方が大きい');
                this.me.life = circleA.life;
            }
        } else if(circleA.life < circleB.life){
            circleB.r += circleA.r / 10;
            circleA.r -= circleB.r / 10;
            circleB.addLife(circleA.life);
            circleA.subLife(circleB.life);
            if(circleA.num === 0) {
                console.log('aの方が小さい');
                this.me.life = circleA.life;
            }
        }
        this.circles = this.circles.filter( (circle: Circle) => { return circle.num === 0 || circle.life !== 0; } );
    }
}
</script>
<style>
.canvas {
  background-image: url("../../../images/firefly/picture2.jpg");
}

.picture1 { background-image: url("../../../images/firefly/picture1.jpg"); }
.picture2 { background-image: url("../../../images/firefly/picture2.jpg"); }
.picture4 { background-image: url("../../../images/firefly/picture4.jpg"); }
.picture5 { background-image: url("../../../images/firefly/picture5.jpg"); }
.picture6 { background-image: url("../../../images/firefly/picture6.jpg"); }
.picture7 { background-image: url("../../../images/firefly/picture7.jpg"); }
.picture8 { background-image: url("../../../images/firefly/picture8.jpg"); }
.picture9 { background-image: url("../../../images/firefly/picture9.jpg"); }
.picture10 { background-image: url("../../../images/firefly/picture10.jpg"); }
.picture17 { background-image: url("../../../images/firefly/picture17.jpg"); }
.picture19 { background-image: url("../../../images/firefly/picture19.jpg"); }
.picture20 { background-image: url("../../../images/firefly/picture20.jpg"); }
.picture28 { background-image: url("../../../images/firefly/picture28.jpg"); }
.picture29 { background-image: url("../../../images/firefly/picture29.jpg"); }
</style>