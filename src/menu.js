import { Game } from "./game.js";

const menu = document.getElementById('main-menu');
const startBtn = document.getElementById('start');
const settingsBtn = document.getElementById('settings');
const creditsBtn = document.getElementById('credits');

document.addEventListener('keyup', key => {
    if (key.code === 'Escape') {
        if (menu.open)
            menu.close();
        else
            menu.showModal();
    }
});

menu.addEventListener('keydown', ev => {
    ev.preventDefault();
});

menu.addEventListener('toggle', ev => {
    if (ev.newState === 'closed')
        Game.paused = false;
    else
        Game.paused = true;
});

startBtn.addEventListener('click', () => {
    
});

settingsBtn.addEventListener('click', () => {
    
});

creditsBtn.addEventListener('click', () => {
    
});

menu.showModal();