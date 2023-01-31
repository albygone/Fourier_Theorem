import { ondaSin, ondaQua, ondaRis, ondaTri, ondaDen } from "./onda.js";
const visualizzazioni = {
    quadra: true,
    sinQua: true,
    armonicheQua: true,
    risQua: true,
    risTri: true,
    risDen: true,
};
const to = Math.PI * 2;
let tick;
let velocita = 12.5;
let precisione = 0.002;
let i = 0;
let ferma = false;
const canvas = document.getElementById("canvasOnde");
const ctx = canvas.getContext("2d");
inizializzaCallBack();
let ondeQua = [];
let ondaQuadra;
let ondaRisultanteQua;
let ondeTri = [];
let ondaRisultanteTri;
let ondeDen = [];
let ondaRisultanteDen;
calcolaTutto();
start();
function start() {
    tick = setInterval(() => {
        if (ferma)
            return;
        if (visualizzazioni.sinQua)
            point(ondeQua[0].punti[i].x, ondeQua[0].punti[i].y, ondeQua[0].color);
        if (visualizzazioni.armonicheQua) {
            ondeQua.forEach((item, index) => {
                if (index == 0)
                    return;
                point(item.punti[i].x, item.punti[i].y, item.color);
            });
        }
        if (visualizzazioni.quadra)
            point(ondaQuadra.punti[i].x, ondaQuadra.punti[i].y, ondaQuadra.color);
        if (visualizzazioni.risQua)
            point(ondaRisultanteQua.punti[i].x, ondaRisultanteQua.punti[i].y, ondaRisultanteQua.color);
        if (visualizzazioni.risTri)
            point(ondaRisultanteTri.punti[i].x, ondaRisultanteTri.punti[i].y, ondaRisultanteTri.color);
        if (visualizzazioni.risDen)
            point(ondaRisultanteDen.punti[i].x, ondaRisultanteDen.punti[i].y, ondaRisultanteDen.color);
        i++;
        if (i >= ondeQua[0].punti.length) {
            i = 0;
            clear();
        }
    }, velocita);
}
function calcolaTutto() {
    cambiaArmonicheQua("5");
    inizializzaOndeQuadre();
    cambiaArmonicheTri("5");
    cambiaArmonicheDen("10");
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const point = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 2, 2);
};
function toggleFerma() {
    ferma = !ferma;
}
function toggle(ondaToggle) {
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
        cambiaArmonicheQua(document.getElementById("numArmQua").value);
    });
    document.getElementById("chkRisTri").addEventListener("change", () => {
        toggle("risTri");
    });
    document.getElementById("numArmTri").addEventListener("change", () => {
        cambiaArmonicheTri(document.getElementById("numArmTri").value);
    });
    document.getElementById("rangeVel").addEventListener("change", () => {
        cambiaVel(document.getElementById("rangeVel").value);
    });
    document.getElementById("btnFull").addEventListener("click", () => {
        canvas.requestFullscreen();
    });
    document.getElementById("chkRisDen").addEventListener("change", () => {
        toggle("risDen");
    });
    document.getElementById("numArmDen").addEventListener("change", () => {
        cambiaArmonicheDen(document.getElementById("numArmDen").value);
    });
    document.getElementById("btnFerma").addEventListener("click", toggleFerma);
}
function cambiaArmonicheTri(value) {
    let num = parseInt(value);
    ondeTri = [];
    for (let i = 0, j = 1; i < num; i++, j += 2) {
        ondeTri.push(new ondaTri(Math.PI, 100, to, "#" + Math.floor(Math.random() * 16777215).toString(16), precisione, canvas, j));
        ondeTri[ondeTri.length - 1].calcola();
    }
    ondaRisultanteTri = new ondaRis(Math.PI, 80, to, "#000000", precisione, canvas, ondeTri);
    ondaRisultanteTri.calcola();
}
function cambiaArmonicheQua(value) {
    let num = parseInt(value);
    ondeQua = [];
    for (let i = 0, j = 1; i < num; i++, j += 2) {
        ondeQua.push(new ondaSin(Math.PI, 100, to, "#" + Math.floor(Math.random() * 16777215).toString(16), precisione, canvas, j));
        ondeQua[ondeQua.length - 1].calcola();
    }
    if (ondeQua.length == 0) {
        ondeQua.push(new ondaSin(Math.PI, 100, to, "#FF0000", 0.005, canvas, 1));
        ondeQua[0].calcola();
    }
    ondaRisultanteQua = new ondaRis(Math.PI, 80, to, "#000000", precisione, canvas, ondeQua);
    ondaRisultanteQua.calcola();
}
function cambiaArmonicheDen(value) {
    let num = parseInt(value);
    ondeDen = [];
    for (let i = 1; i <= num; i++) {
        ondeDen.push(new ondaDen(Math.PI, 100, to, "#" + Math.floor(Math.random() * 16777215).toString(16), precisione, canvas, i));
        ondeDen[ondeDen.length - 1].calcola();
    }
    ondaRisultanteDen = new ondaRis(Math.PI, 60, to, "#000000", precisione, canvas, ondeDen);
    ondaRisultanteDen.calcola();
}
function cambiaVel(value) {
    let n = parseInt(value);
    console.log(n);
    velocita = 25 - n;
    clearInterval(tick);
    start();
}
function inizializzaOndeQuadre() {
    ondaQuadra = new ondaQua(Math.PI, 80, to, "red", precisione, canvas);
    ondaQuadra.calcola();
}
