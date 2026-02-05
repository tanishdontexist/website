const themeBtn = document.querySelector('.theme-theme');
let themeInitialized = false;

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
});

// Toggle theme
themeBtn.addEventListener('click', () => {
    const currentTheme =
        document.documentElement.getAttribute('data-theme') || 'dark';

    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);

    localStorage.setItem('theme', nextTheme);
});

// Apply theme instantly
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Moon SVG for dark theme
    const moonSVG = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    `;

    // Sun SVG for light theme
    const sunSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        `;

    themeBtn.innerHTML = theme === 'dark' ? moonSVG : sunSVG;

    // Update TM image based on theme
    const tmImage = document.querySelector('img[alt="TM"]');
    if (tmImage) {
        tmImage.src = theme === 'dark' ? 'media/tm.png' : 'media/itm.png';
    }
    // Update NMS image based on theme
    const nmsImage = document.getElementById('nms-image');
    if (nmsImage) {
            nmsImage.src =
                theme === 'light'
                    ? '/media/projects/nms.png'
                    : '/media/projects/dark-nms.png';
    }
    const tmsImage = document.getElementById('tms-image');
    if (tmsImage) {
            tmsImage.src =
                theme === 'light'
                    ? '/media/projects/light-tms.png'
                    : '/media/projects/tms.png';
    }
    const exoImage = document.getElementById('exo-image');
    if (exoImage) {
            exoImage.src =
                theme === 'light'
                    ? '/media/projects/dashboards/light-exo.png'
                    : '/media/projects/dashboards/exo.png';
    }
    const exoHubImage = document.getElementById('exo-hub-image');
    if (exoHubImage) {
            exoHubImage.src =
                theme === 'light'
                    ? '/media/projects/light-exo-gui.png'
                    : '/media/projects/exo-gui.png';
    }
}

const soundBtn = document.querySelector('.theme-sound');
let audio = new Audio('/media/song.wav');
audio.loop = true;
let soundState = 'off'; // 'off', 'low', 'high'

// Always start as off on page load (don't load from localStorage)
document.addEventListener('DOMContentLoaded', () => {
    soundState = 'off';
    localStorage.setItem('sound', 'off');
    applySoundState();
});

// Toggle sound through three states
soundBtn.addEventListener('click', () => {
    if (soundState === 'off') {
        soundState = 'low';
    } else if (soundState === 'low') {
        soundState = 'high';
    } else {
        soundState = 'off';
    }
    
    localStorage.setItem('sound', soundState);
    applySoundState();
});

// Apply sound state
function applySoundState() {
    if (soundState === 'off') {
        audio.pause();
        audio.volume = 0;
    } else if (soundState === 'low') {
        audio.volume = 0.1;
        audio.play();
    } else if (soundState === 'high') {
        audio.volume = 0.5;
        audio.play();
    }
    
    updateSoundIcon();
}

// Update icon based on state
function updateSoundIcon() {
    // Speaker muted with X (off)
    const soundOffSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
    `;

    // Speaker with one wave (low volume)
    const soundLowSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
    `;

    // Speaker with two waves (high volume)
    const soundHighSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
    `;

    if (soundState === 'off') {
        soundBtn.innerHTML = soundOffSVG;
    } else if (soundState === 'low') {
        soundBtn.innerHTML = soundLowSVG;
    } else {
        soundBtn.innerHTML = soundHighSVG;
    }
}