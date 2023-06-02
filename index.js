
const boxes = Array.from(document.getElementsByClassName('box'));
const container = document.querySelector('.boxes');

let alerta = document.querySelector('.Alerta');
let alertaTurno = document.querySelector('.Alerta2');
let turno = "X"
let pause = false;
let ganador = "X"

const combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]      
]

// lee los clicks echos en la pagina y si enceuntra el evento que queremos ejecuta codigo

addEventListener('click',(e)=>{
    if (pause == false) {
        try {
            let num = e.target.id;
            comprobacion(num)
            comprobacionWin()
        }
        catch (e) {
            console.error("No se hizo click en una caja")
        }
    }
})

function comprobacion(num) {
    if (turno == "X" && !boxes[num].classList.contains('boxO')) {
        boxes[num].classList.add('boxX');
        turno = "O";
        return;
    }
    if (turno == "O" && !boxes[num].classList.contains('boxX')) {
        boxes[num].classList.add('boxO');
        turno = "X";
        return;    
    }
}

function comprobacionWin() {
    for (const [a,b,c] of combinaciones) {
        if (boxes[a].classList.contains('boxX') && boxes[b].classList.contains('boxX') && boxes[c].classList.contains('boxX')) {
            win("El ganador anterior fue X")
            reiniciar()
        }
        if (boxes[a].classList.contains('boxO') && boxes[b].classList.contains('boxO') && boxes[c].classList.contains('boxO')) {
            win("El ganador anterior fue O")
            reiniciar()
        }
    }
}

function win(ganador) {
    alerta.textContent =`${ganador}`
    pause = true;
    return;
}

function empate() {
    reiniciar()
    alerta.textContent = "Empate"
    return;
}

function reiniciar() {
        for(let i = 0; i < boxes.length; i++){
            boxes[i].classList.remove('boxX');
            boxes[i].classList.remove('boxO');
            boxes[i].classList.remove('marcada');
        }
        pause = false;
        return;
}

setInterval(()=> {
    alertaTurno.textContent = `Turno de ${turno}`
})