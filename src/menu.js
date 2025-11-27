const menu = document.getElementById('main-menu');
const startBtn = document.getElementById('start');
const settingsBtn = document.getElementById('settings');
const creditsBtn = document.getElementById('credits');

const main = document.getElementById('main');

menu.showModal();
document.addEventListener('keyup', key => {
    if (key.code === 'Escape')
        menu.showModal();
});

startBtn.addEventListener('click', () => {
    
});

settingsBtn.addEventListener('click', () => {
    
});

creditsBtn.addEventListener('click', () => {
    
});