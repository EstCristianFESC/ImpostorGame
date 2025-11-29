// ===== THEME SYSTEM =====
const themes = {
    cyberpunk: {
        name: 'Cyberpunk',
        primary: '#00f3ff',
        secondary: '#ff0055',
        bg: '#050505',
        cardBg: 'rgba(20, 20, 30, 0.6)',
        text: '#ffffff',
        textMuted: '#a0a0a0'
    },
    retrowave: {
        name: 'Retro Wave',
        primary: '#ff6ec7',
        secondary: '#ff9500',
        bg: '#0a0015',
        cardBg: 'rgba(30, 10, 40, 0.6)',
        text: '#ffffff',
        textMuted: '#b8a0c8'
    },
    matrix: {
        name: 'Matrix',
        primary: '#00ff41',
        secondary: '#00cc33',
        bg: '#000000',
        cardBg: 'rgba(0, 20, 0, 0.6)',
        text: '#00ff41',
        textMuted: '#008822'
    },
    minimal: {
        name: 'Minimal',
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        bg: '#0f172a',
        cardBg: 'rgba(30, 41, 59, 0.6)',
        text: '#f1f5f9',
        textMuted: '#94a3b8'
    }
};

// Light mode overrides
const lightModeOverrides = {
    bg: '#f8fafc',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    text: '#0f172a',
    textMuted: '#64748b'
};

// ===== THEME FUNCTIONS =====
function applyTheme(themeName, isLightMode = false) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    
    // Apply theme colors
    if (isLightMode) {
        root.style.setProperty('--bg-color', lightModeOverrides.bg);
        root.style.setProperty('--card-bg', lightModeOverrides.cardBg);
        root.style.setProperty('--text-color', lightModeOverrides.text);
        root.style.setProperty('--text-muted', lightModeOverrides.textMuted);
    } else {
        root.style.setProperty('--bg-color', theme.bg);
        root.style.setProperty('--card-bg', theme.cardBg);
        root.style.setProperty('--text-color', theme.text);
        root.style.setProperty('--text-muted', theme.textMuted);
    }
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);

    // Save to localStorage
    localStorage.setItem('selectedTheme', themeName);
    localStorage.setItem('lightMode', isLightMode);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
    const lightMode = localStorage.getItem('lightMode') === 'true';
    applyTheme(savedTheme, lightMode);
    return { theme: savedTheme, lightMode };
}

function toggleLightMode() {
    const currentTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
    const isLightMode = localStorage.getItem('lightMode') !== 'true';
    applyTheme(currentTheme, isLightMode);
    return isLightMode;
}

// ===== SOUND EFFECTS =====
const sounds = {
    reveal: new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'), // Whoosh
    suspense: new Audio('https://assets.mixkit.co/active_storage/sfx/562/562-preview.mp3') // Suspense drone
};

// Set volumes
sounds.reveal.volume = 0.4;
sounds.suspense.volume = 0.2;
sounds.suspense.loop = true;

function playSound(soundName) {
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play prevented:', e));
    }
}

function stopSound(soundName) {
    const sound = sounds[soundName];
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

// ===== PARTICLE EFFECTS =====
function createParticles(container) {
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'particles';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesDiv.appendChild(particle);
    }
    
    container.appendChild(particlesDiv);
    
    // Remove after animation
    setTimeout(() => {
        particlesDiv.remove();
    }, 3000);
}

// ===== GLITCH EFFECT =====
function applyGlitchEffect(element, text) {
    element.classList.add('glitch-text');
    element.setAttribute('data-text', text);
    
    // Remove after a few seconds
    setTimeout(() => {
        element.classList.remove('glitch-text');
        element.removeAttribute('data-text');
    }, 3000);
}

// ===== SMOOTH TRANSITIONS =====
function transitionSection(hideElement, showElement) {
    hideElement.classList.add('fade-out');
    
    setTimeout(() => {
        hideElement.classList.add('hidden');
        hideElement.classList.remove('fade-out');
        
        showElement.classList.remove('hidden');
        showElement.classList.add('fade-in');
        
        setTimeout(() => {
            showElement.classList.remove('fade-in');
        }, 500);
    }, 300);
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
});

// Export functions for use in main.js
window.ThemeSystem = {
    applyTheme,
    toggleLightMode,
    loadSavedTheme,
    themes
};

window.SoundSystem = {
    playSound,
    stopSound
};

window.AnimationSystem = {
    createParticles,
    applyGlitchEffect,
    transitionSection
};
