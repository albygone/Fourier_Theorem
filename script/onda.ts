import { ondaInterface } from "./ondaInterface.js";

export class ondaSin extends ondaInterface {
   n: number;
   risultante: number[];

   calcola() {
      const PI2 = Math.PI * 2;
      this.punti = [];

      for (let i = 0, j = 0; i < this.to; i += this.step, j++) {
         this.punti.push({
            x: i * 200,
            y:
               (Math.sin((1 / this.periodo) * PI2 * i * this.n) / this.n) *
                  this.ampiezza +
               this.canvas.height / 2,
         });
      }
   }
   constructor(
      _frequenza: number,
      _ampiezza: number,
      _to: number,
      _color: string,
      _step: number,
      _canvas: HTMLCanvasElement,
      _n: number
   ) {
      super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
      this.n = _n;
   }
}

export class ondaTri extends ondaInterface {
   n: number;
   risultante: number[];

   calcola() {
      const PI2 = Math.PI * 2;
      this.punti = [];

      for (let i = 0, j = 0; i < this.to; i += this.step, j++) {
         this.punti.push({
            x: i * 200,
            y:
               (Math.cos((1 / this.periodo) * PI2 * i * this.n) /
                  Math.pow(this.n, 2)) *
                  this.ampiezza +
               this.canvas.height / 2,
         });
      }
   }
   constructor(
      _frequenza: number,
      _ampiezza: number,
      _to: number,
      _color: string,
      _step: number,
      _canvas: HTMLCanvasElement,
      _n: number
   ) {
      super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
      this.n = _n;
   }
}

export class ondaQua extends ondaInterface {
   calcola() {
      const PI2 = Math.PI * 2;
      this.punti = [];

      for (let i = 0; i < this.to; i += this.step) {
         this.punti.push({
            x: i * 200,
            y:
               Math.sin((1 / this.periodo) * PI2 * i) > 0
                  ? this.ampiezza + this.canvas.height / 2
                  : -this.ampiezza + this.canvas.height / 2,
         });
      }
   }
}

export class ondaRis extends ondaInterface {
   lstOnde: ondaSin[];

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

   constructor(
      _frequenza: number,
      _ampiezza: number,
      _to: number,
      _color: string,
      _step: number,
      _canvas: HTMLCanvasElement,
      _lstOnde: ondaSin[]
   ) {
      super(_frequenza, _ampiezza, _to, _color, _step, _canvas);
      this.lstOnde = _lstOnde;
   }
}
