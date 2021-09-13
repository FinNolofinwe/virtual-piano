document.addEventListener('DOMContentLoaded', () => {


const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const btns = document.querySelectorAll('.btn');
const relay = document.querySelector('.btn-container');
const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');
const fullScr = document.querySelector('.fullscreen');
const pianoApp = document.querySelector('body');

// Функции для обработчиков событий

function playNoteClick(event) {
    const audio = document.querySelector(`audio[data-note="${event.target.dataset.note}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

function playNoteKey(event) {
    const audio = document.querySelector(`audio[data-key="${event.code}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

}

function addActive(event) {
    if(event.target.classList.contains('piano-key')) {
        event.target.classList.add('piano-key-active');
    }
}

function removeActive(event) {
    if(event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
    }
}


// Переключение активности кнопок ноты/буквы

for (let btn of btns) {
    btn.addEventListener('click', function() {
        btns.forEach(i => i.classList.remove('btn-active'));
            this.classList.toggle('btn-active');
        });
};

// Добавление активности клавишам при клике мышью

piano.addEventListener('mousedown', addActive);
piano.addEventListener('mouseup', removeActive);

// Добавление активности клавишам при работе клавиатуры

window.addEventListener('keydown', (event) => {
    const key = document.querySelector(`div[data-key="${event.code}"]`);
    if (!key) return;
    key.classList.add('piano-key-active');
});

window.addEventListener('keyup', (event) => {
    const key = document.querySelector(`div[data-key="${event.code}"]`);
    if (!key) return;
    key.classList.remove('piano-key-active');
});

// Переключаемся между буквами-нотами

relay.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-notes')){
        pianoКeys.forEach(i => {
            i.classList.remove('piano-key-letter');
            i.classList.add('piano-key-note');
        });
    } else if (event.target.classList.contains('btn-letters')){
        pianoКeys.forEach(i => {
            i.classList.remove('piano-key-note');
            i.classList.add('piano-key-letter');
        });
    }
});

// Воспроизведение аудио при движении мыши над клавиатурой пианино

piano.addEventListener('mousedown', function(){
    piano.addEventListener('mouseover', (e) => {
        playNoteClick(e);
        addActive(e);
    });

    piano.addEventListener('mouseout', (e) => {
        removeActive(e);
    });
})  

// Переход в полноэкранный режим/выход из поноэкр режима при нажатии на кнопку

document.addEventListener('click', function (event) {

    if (!event.target.classList.contains('fullscreen')) return;

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}, false);

// Обработчики воспроизведения аудио

piano.addEventListener('mousedown', playNoteClick);
window.addEventListener('keydown', playNoteKey);

});