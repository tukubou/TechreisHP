import { getParentSize } from '../../utils';
// 蛍オブジェクト
export default class Circle {
    ctx: any;
    /*
    this.h: this.x:移動前x座標 this.y:移動前y座標
    this.vx:移動先x座標 this.y:移動先y座標 this.r:サークルの半径
    this.color:#の後にcolorListをランダムに追加して色を決定する
    */
    h: number;
    colorList: string[] = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    color: string;
    num: number;
    cw: number;
    ch: number;
    status: any = { x: 0, y: 0, vx: 0, vy: 0, r:0 };
    constructor(number: number, ctx: any, cw: number, ch: number) {
        this.ctx = ctx;
        Object.assign(this.status, {
            x: 0,
            y: 100,
            vx: 0,
            vy: 0,
            r: 0,
            life: 1
        });
        this.h = 0.9;
        this.color = '#';
        this.num = number;
        this.cw = cw;
        this.ch = ch;
        // this.num = this.circles.length;//TODO あとから引数に追加
    }

    init(vec: any, isUser: any): any {
        //vecはサークルが左右どちらから発射されるか
        if(!isUser) {
            //移動先x座標の値:1〜8までの値をランダムに代入
            //サークルの半径:5〜24までの値をランダムに代入
            Object.assign(this.status, { vx: Math.random()*2+1, vy: -(Math.random()*2+1), r: Math.random()*25+5 });
            if(vec){ //右から発射される場合
                Object.assign(this.status, {
                    x: this.cw+100, //サークルの移動元のx座標をcanvasの幅+100に
                    vx: -1 * this.status.vx //左に平行に発射
                });
            }else{ //左から発射される場合
                Object.assign(this.status, { x: -100 });//サークルの移動元のx座標をの原点-100に
            }
          }else{//userの場合
            Object.assign(this.status, { x: this.cw/2, y: this.ch/2, r: 10 });//サークルの移動元のx座標をの原点-100に
          }
          //色を設定する.最終的にはthis.color = '#1F4e8F'のようになる
          this.color = this.createColorRandom();
          Object.assign(this.status, {life: Math.floor(Math.random()*3 + 1)})
    }

    /**
     * セッターとゲッター
     */
    get x(): number {
        return this.status.x;
    }
    get y(): number {
        return this.status.y;
    }
    get r(): number {
        return this.status.r;
    }
    get life(): number {
        return this.status.life;
    }
    get vx(): number {
        return this.status.vx;
    }
    get vy(): number {
        return this.status.vy;
    }
    set x(x: number) {
        this.status.x = x;
    }
    set y(y: number) {
        this.status.y = y;
    }
    set r(r: number) {
        this.status.r = r;
    }
    set vx(vx: number) {
        this.status.vx = vx;
    }
    set vy(vy: number) {
        this.status.vy = vy;
    }
    set life(life: number) {
        this.status.life = life;
    }
    /**
     * 色を設定する.最終的にはthis.color = '#1F4e8F'のようになる
     */
    createColorRandom(): string {
        let retColor = '#';
        for(let i = 0; i < 6; i++) {
            retColor += this.colorList[Math.floor(Math.random()*16)];
        }
        return retColor;
    }
    //サークルの移動関数
    move() {
        Object.assign(this.status, {
            x: this.status.x + this.status.vx,
            y: this.status.y + this.status.vy
        });//サークルの移動元のx座標をの原点-100に
    } //end of this.move

    view() {
        this.ctx.beginPath();
        //ここでサークルに色を割り当てる
        this.ctx.fillStyle = this.color;
        //座標(this.x, this.y)を中心とした半径rの円を描く
        this.ctx.arc(this.status.x, this.status.y, this.status.r, 0, 360, false);
       //上記の設定で描画
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.beginPath();
       this.ctx.fillStyle = '#000';
       this.ctx.font      = "12px arial"; // フォント
       this.ctx.fillText(this.status.life, this.status.x, this.status.y);
    }

    public addLife(againstLife: number) {
        this.status.life += againstLife;
    }
    public subLife(againstLife: number) {
        if(this.status.life - againstLife > 0) {
            this.status.life -= againstLife;
        } else {
            this.status.life = 0;
        }
    }

    //壁に衝突した時の挙動
    collisionWall() {
            if(this.status.x+this.status.r > this.cw && this.status.vx > 0 || 
                this.status.x-this.status.r < 0 && this.status.vx < 0){
             this.status.vx *= -this.h;
            }else if(this.status.y+this.status.r > this.ch && this.status.vy > 0 || 
              this.status.y-this.status.r < 0 && this.status.vy < 0){
             this.status.vy *= -this.h;
            }
    }
}
