import { getParentSize } from '../../utils';
// 蛍オブジェクト
export default class Firefly {
    ctx: any;
    SLEEP_COUNT: number;
    number: number;
    ps: any;
    prePos: any;
    curPos: any;
    alpha: number;
    delta_alpha: number;
    lightflag: boolean;
    time: number; //起動変数t
    changeflag: boolean;
    sleepcount: number; //蛍が光らない時間
    color: string;
    blur: any;
    path: any;
    FlySizeWidth = 20; //ホタルの大きさの幅
    constructor(number: number, ctx: any) {
        this.ctx = ctx;
        this.SLEEP_COUNT = 200;
        this.number = number; //蛍のid
        this.ps = getParentSize();
        //蛍直前のx, y z座標
        this.prePos = { x: 0, y: 0, z: 0 };
        this.alpha = 0.0; //蛍の透明度(点滅に使用)
        this.delta_alpha = 0.01;
        this.lightflag = true;
        this.time = 0.0; //起動変数t
        this.changeflag = false;
        this.sleepcount = 0; //蛍が光らない時間
        this.color = 'rgba(232,250,26,' + this.alpha + ')';
        this.blur;
        this.path = [];
        this.FlySizeWidth = 20; //ホタルの大きさの幅
    }
    // set blur(name: string) {
    // }
    set sleepCount(sleepCount:number) {
        this.SLEEP_COUNT = sleepCount;// default:200
    }
    set alphaSpeed(floatNumber:number) {
        this.delta_alpha = floatNumber;// default:0.01
    }
    set speed(floatNumber:number) {
        this.time = floatNumber; //起動変数t default:0.1
    }
    set rgba(color:any) {
        this.alpha = color.a;
        // default: 232, 250, 26, 0.1
        this.color = `rgba(${color.r},${color.g},${color.b},${this.alpha})`;
    }
    set flySize(size:number) {
        this.FlySizeWidth = 20; //ホタルの大きさの幅 default:20
    }



    init() {
        //vecはサークルが左右どちらから発射される か

        //移動先x座標の値:1〜8までの値をランダムに代入
        //サークルの半径:5〜24までの値をランダムに代入
        //var lean = Math.floor(Math.random()*100);

        // 蛍の現在のx, y, z座標
        this.curPos = {
            x: Math.floor(Math.random() * this.ps.width),
            y: Math.floor(Math.random() * this.ps.height),
            z: Math.floor(Math.random() * this.FlySizeWidth + 2)
        };

        //色を設定する.最終的にはthis.color = '#1F4e8F'のようになる
        this.color = 'rgba(232,250,26,' + this.alpha + ')';
        this.setRandomPoints();
    }
    //サークルの移動関数
    move() {
        this.time += 0.0005;
        this.curPos = this.myGetPointNB(this.time, this.path);

        if (this.lightflag) {
            this.alpha += this.delta_alpha;
            if (this.alpha >= 1.0) {
                this.lightflag = false;
            }
        } else {
            this.alpha -= this.delta_alpha;
            if (this.alpha <= 0.0) {
                this.alpha = 0;
                this.sleepcount++;
                if (this.sleepcount == this.SLEEP_COUNT) {
                    this.lightflag = true;
                    this.sleepcount = 0;
                }
            }
        }

        if (this.time >= 1.0) {
            this.time = 0.0;
            this.prePos = this.curPos;
            this.setRandomPoints();
        }
    } //end of this.move

    setRandomPoints() {
        if (this.path.length > 0) {
            // そのままのthis.prePos
        } else {
            this.prePos = {
                x: Math.floor(Math.random() * this.ps.width),
                y: Math.floor(Math.random() * this.ps.height),
                z: Math.floor(Math.random() * this.FlySizeWidth + 2)
                //this.delta_alpha = Math.floor(Math.random()*20 + 1)*0.001;
            };
            this.path.push(this.prePos);
        }
        this.path = [];
        //2 < n < 6
        let n = Math.floor(Math.random() * 6 + 2);

        for (let i = 1; i <= n; i++) {
            let ranPos = {
                x: Math.floor(Math.random() * this.ps.width),
                y: Math.floor(Math.random() * this.ps.height),
                z: Math.floor(Math.random() * this.FlySizeWidth + 2)
            };
            let dist3d =
                (this.prePos.x - ranPos.x) * (this.prePos.x - ranPos.x) +
                (this.prePos.y - ranPos.y) * (this.prePos.y - ranPos.y) +
                (this.prePos.z - ranPos.z) * (this.prePos.z - ranPos.z);
            if (dist3d > 300 && dist3d < 500000) {
                this.path.push(ranPos);
            } else {
                i--;
            }
        }
    }
    view(developflag: boolean) {
        /* 合成演算子をセット */
        //ctx.globalCompositeOperation = "destination-in";

        //ベジエ曲線確認用
        if (developflag && this.number == 0) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgb(192, 80, 77)';
            this.ctx.moveTo(this.path[0].x, this.path[0].y);
            this.alpha = 1.0;
            for (let i = 1; i < this.path.length; i++) {
                this.ctx.lineTo(this.path[i].x, this.path[i].y);
            }
            this.ctx.stroke();
        }
        this.ctx.shadowBlur = Math.floor(Math.random() * 100 + 20);
        this.ctx.shadowColor = this.color;
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.beginPath();
        //中から順番に
        //でかいほどぼかす
        let alpha = [4];
        alpha[0] = 0.9 * this.alpha;
        alpha[1] = 0.3 * this.curPos.z * 0.05 * this.alpha;
        alpha[2] = 0.2 * this.curPos.z * 0.05 * this.alpha;
        alpha[3] = 0.05 * this.curPos.z * 0.05 * this.alpha;
        for (let i = 0; i < 4; i++) {
            if (alpha[i] < 0.0) {
                alpha[i] = 0.0;
            }
        }
        let change_r = 232;
        let change_g = 250;
        let change_b = 26;
        if (developflag && this.number == 0) {
            change_r = 250;
            change_g = 26;
            change_b = 232;
        }
        let edgecolor1 =
            'rgba(' +
            change_r +
            ',' +
            change_g +
            ',' +
            change_b +
            ', ' +
            alpha[0] +
            ')';
        let edgecolor2 = 'rgba(0, 255, 200, ' + alpha[1] + ')';
        let edgecolor3 = 'rgba(0, 255, 100, ' + alpha[2] + ')';
        let edgecolor4 = 'rgba(0, 255, 0, ' + alpha[3] + ')';
        let gradblur = this.ctx.createRadialGradient(
            this.curPos.x,
            this.curPos.y,
            0,
            this.curPos.x,
            this.curPos.y,
            this.curPos.z
        );

        gradblur.addColorStop(0, edgecolor1);
        gradblur.addColorStop(0.2, edgecolor1);
        gradblur.addColorStop(0.7, edgecolor2);
        //gradblur.addColorStop(0.9,edgecolor3);
        gradblur.addColorStop(1, edgecolor4);
        this.blur = gradblur;

        //ここでサークルに色を割り当てる
        //this.color = "rgba(232,250,26,"+this.alpha+")";
        //ctx.fillStyle = this.color;
        this.ctx.fillStyle = gradblur;
        //座標(this.x, this.y)を中心とした半径rの円を描く
        this.ctx.arc(
            this.curPos.x,
            this.curPos.y,
            this.curPos.z,
            0,
            360,
            false
        );

        //上記の設定で描画
        this.ctx.fill();
    }
    //**********************************************************************
    //引数時刻t(0～1)のときのN次ベジエ曲線の現在地点(Position)を返す関数
    //**********************************************************************
    myGetPointNB(t: number, posarray: any) {
        t = t > 1.0 ? 1.0 : t;
        const tp = 1 - t;
        let retPos = { x: 0, y: 0, z: 0 };
        posarray.forEach((pos: any, index: number) => {
            const n = posarray.length - 1;
            const nCi = this.myGetCombination(n, index);
            const k = nCi * Math.pow(t, index) * Math.pow(tp, n - index);
            retPos = {
                x: retPos.x + k * pos.x,
                y: retPos.y + k * pos.y,
                z: retPos.z + k * pos.z
            };
        });
        return retPos;
    }
    //**********************************************************************
    //nCiを再帰的に求める関数
    //**********************************************************************
    myGetCombination(n: number, i: number) {
        let c = 1;
        let ns;
        let ms;
        i = n - i < i ? n - i : i;
        for (ns = n - i + 1, ms = 1; ms <= i; ns++, ms++) {
            c *= ns;
            c /= ms;
        }
        return c;
    }
}
