export class ondaInterface {
   periodo: number;
   ampiezza: number;
   to: number;
   color: string;
   step: number;
   canvas: HTMLCanvasElement;
   punti: { x; y }[];

   calcola() {}

   constructor(
      _frequenza: number,
      _ampiezza: number,
      _to: number,
      _color: string,
      _step: number,
      _canvas: HTMLCanvasElement
   ) {
      this.periodo = _frequenza;
      this.ampiezza = _ampiezza;
      this.color = _color;
      this.step = _step;
      this.canvas = _canvas;
      this.to = _to;
   }
}
