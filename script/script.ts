import { ondaSin, ondaQua, ondaRis, ondaTri } from "./onda.js";

const visualizzazioni = {
   quadra: true,
   sinQua: true,
   armonicheQua: true,
   risQua: true,
   risTri: true,
};

const to = Math.PI * 2;

let tick;
let velocita = 12.5;

let i = 0;
let ferma = false;

const canvas = <HTMLCanvasElement>document.getElementById("canvasOnde");
const ctx = canvas.getContext("2d");

inizializzaCallBack();

let ondeQua: ondaSin[] = [];
let ondaQuadra: ondaQua;
let ondaRisultanteQua: ondaRis;

let ondeTri: ondaTri[] = [];
let ondaRisultanteTri: ondaRis;

cambiaArmonicheQua("5");
inizializzaOndeQuadre();

cambiaArmonicheTri("5");

start();

function start() {
   tick = setInterval(() => {
      if (ferma) return;

      if (visualizzazioni.sinQua)
         point(ondeQua[0].punti[i].x, ondeQua[0].punti[i].y, ondeQua[0].color);

      if (visualizzazioni.armonicheQua) {
         ondeQua.forEach((item, index) => {
            if (index == 0) return;

            point(item.punti[i].x, item.punti[i].y, item.color);
         });
      }

      if (visualizzazioni.quadra)
         point(ondaQuadra.punti[i].x, ondaQuadra.punti[i].y, ondaQuadra.color);

      if (visualizzazioni.risQua)
         point(
            ondaRisultanteQua.punti[i].x,
            ondaRisultanteQua.punti[i].y,
            ondaRisultanteQua.color
         );

      if (visualizzazioni.risTri)
         point(
            ondaRisultanteTri.punti[i].x,
            ondaRisultanteTri.punti[i].y,
            ondaRisultanteTri.color
         );

      i++;
      if (i >= ondeQua[0].punti.length) {
         i = 0;
         clear();
      }
   }, velocita);
}

function clear() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const point = (x: number, y: number, color: string) => {
   ctx.fillStyle = color;
   ctx.fillRect(x, y, 2, 2);
};

function toggleFerma() {
   ferma = !ferma;
}

function toggle(ondaToggle: string) {
   visualizzazioni[ondaToggle] = !visualizzazioni[ondaToggle];
}

function inizializzaCallBack() {
   document.getElementById("chkQuadra").addEventListener("change", () => {
      toggle("quadra");
   });

   document.getElementById("chkSin").addEventListener("change", () => {
      toggle("sinQua");
   });

   document.getElementById("chkArmonicheSin").addEventListener("change", () => {
      toggle("armonicheQua");
   });

   document.getElementById("chkRisQua").addEventListener("change", () => {
      toggle("risQua");
   });

   document.getElementById("numArmQua").addEventListener("change", () => {
      cambiaArmonicheQua(
         (<HTMLInputElement>document.getElementById("numArmQua")).value
      );
   });

   document.getElementById("chkRisTri").addEventListener("change", () => {
      toggle("risTri");
   });

   document.getElementById("numArmTri").addEventListener("change", () => {
      cambiaArmonicheTri(
         (<HTMLInputElement>document.getElementById("numArmTri")).value
      );
   });

   document.getElementById("rangeVel").addEventListener("change", () => {
      cambiaVel((<HTMLInputElement>document.getElementById("rangeVel")).value);
   });

   document.getElementById("btnFull").addEventListener("click", () => {
      //fullscreen
   });

   document.getElementById("btnFerma").addEventListener("click", toggleFerma);
}

function cambiaArmonicheTri(value: string) {
   let num = parseInt(value);
   ondeTri = [];

   for (let i = 0, j = 1; i < num; i++, j += 2) {
      ondeTri.push(
         new ondaTri(
            Math.PI,
            100,
            to,
            "#" + Math.floor(Math.random() * 16777215).toString(16),
            0.005,
            canvas,
            j
         )
      );
      ondeTri[ondeTri.length - 1].calcola();
   }

   ondaRisultanteTri = new ondaRis(
      Math.PI,
      80,
      to,
      "#000000",
      0.005,
      canvas,
      ondeTri
   );

   ondaRisultanteTri.calcola();
}

function cambiaArmonicheQua(value: string) {
   let num = parseInt(value);
   ondeQua = [];

   for (let i = 0, j = 1; i < num; i++, j += 2) {
      ondeQua.push(
         new ondaSin(
            Math.PI,
            100,
            to,
            "#" + Math.floor(Math.random() * 16777215).toString(16),
            0.005,
            canvas,
            j
         )
      );
      ondeQua[ondeQua.length - 1].calcola();
   }

   if (ondeQua.length == 0) {
      ondeQua.push(new ondaSin(Math.PI, 100, to, "#FF0000", 0.005, canvas, 1));
      ondeQua[0].calcola();
   }

   ondaRisultanteQua = new ondaRis(
      Math.PI,
      80,
      to,
      "#000000",
      0.005,
      canvas,
      ondeQua
   );

   ondaRisultanteQua.calcola();
}

function cambiaVel(value: string) {
   let n = parseInt(value);
   console.log(n);

   velocita = 25 - n;

   clearInterval(tick);
   start();
}

function inizializzaOndeQuadre() {
   ondaQuadra = new ondaQua(Math.PI, 80, to, "red", 0.005, canvas);
   ondaQuadra.calcola();
}
