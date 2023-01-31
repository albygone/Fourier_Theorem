import { ondaInterface } from "./ondaInterface.js";
export class ondaSin extends ondaInterface {
    constructor(_frequenza, _ampiezza, _to, _color, _step, _canvas, _n) {
        super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
        this.n = _n;
    }
    calcola() {
        const PI2 = Math.PI * 2;
        this.punti = [];
        for (let i = 0, j = 0; i < this.to; i += this.step, j++) {
            this.punti.push({
                x: i * 200,
                y: (Math.sin((1 / this.periodo) * PI2 * i * this.n) / this.n) *
                    this.ampiezza +
                    this.canvas.height / 2,
            });
        }
    }
}
export class ondaTri extends ondaInterface {
    constructor(_frequenza, _ampiezza, _to, _color, _step, _canvas, _n) {
        super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
        this.n = _n;
    }
    calcola() {
        const PI2 = Math.PI * 2;
        this.punti = [];
        for (let i = 0, j = 0; i < this.to; i += this.step, j++) {
            this.punti.push({
                x: i * 200,
                y: (Math.cos((1 / this.periodo) * PI2 * i * this.n) /
                    Math.pow(this.n, 2)) *
                    this.ampiezza +
                    this.canvas.height / 2,
            });
        }
    }
}
export class ondaQua extends ondaInterface {
    calcola() {
        const PI2 = Math.PI * 2;
        this.punti = [];
        for (let i = 0; i < this.to; i += this.step) {
            this.punti.push({
                x: i * 200,
                y: Math.sin((1 / this.periodo) * PI2 * i) > 0
                    ? this.ampiezza + this.canvas.height / 2
                    : -this.ampiezza + this.canvas.height / 2,
            });
        }
    }
}
export class ondaRis extends ondaInterface {
    constructor(_frequenza, _ampiezza, _to, _color, _step, _canvas, _lstOnde) {
        super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
        this.lstOnde = _lstOnde;
    }
    calcola() {
        this.punti = [];
        for (let i = 0, j = 0; i < this.to; i += this.step, j++) {
            let ampCalc = 0;
            this.lstOnde.forEach((item) => {
                ampCalc += item.punti[j].y - this.canvas.height / 2;
            });
            this.punti.push({
                x: i * 200,
                y: ampCalc + this.canvas.height / 2,
            });
        }
    }
}
