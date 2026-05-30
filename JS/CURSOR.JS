// ========== KURSOR EFFEKTLARI ==========

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let trailDots = [];
let trailPositions = [];

function createTrailDots() {
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.background = '#00ffff';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9997';
        dot.style.opacity = '0';
        document.body.appendChild(dot);
        trailDots.push(dot);
        trailPositions.push({ x: 0, y: 0 });
    }
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    }
    if (cursorOutline) {
        cursorOutline.style.transform = `translate(${mouseX - 17}px, ${mouseY - 17}px)`;
    }
    
    trailPositions.unshift({ x: mouseX, y: mouseY });
    if (trailPositions.length > trailDots.length) {
        trailPositions.pop();
    }
    
    for (let i = 0; i < trailDots.length; i++) {
        const pos = trailPositions[i];
        if (pos) {
            trailDots[i].style.transform = `translate(${pos.x - 2}px, ${pos.y - 2}px)`;
            trailDots[i].style.opacity = 0.8 - (i / trailDots.length) * 0.8;
            trailDots[i].style.width = `${6 - (i / trailDots.length) * 4}px`;
            trailDots[i].style.height = `${6 - (i / trailDots.length) * 4}px`;
        }
    }
});

function updateCursorOnHover(element, scale, color) {
    element.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = `scale(${scale})`;
            cursorOutline.style.borderColor = color;
            cursorOutline.style.boxShadow = `0 0 15px ${color}`;
        }
        if (cursorDot) {
            cursorDot.style.transform = `scale(1.5)`;
            cursorDot.style.background = color;
        }
    });
    element.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = `scale(1)`;
            cursorOutline.style.borderColor = '#ff00ff';
            cursorOutline.style.boxShadow = '0 0 10px #ff00ff';
        }
        if (cursorDot) {
            cursorDot.style.transform = `scale(1)`;
            cursorDot.style.background = '#00ffff';
        }
    });
}

document.querySelectorAll('button').forEach(btn => updateCursorOnHover(btn, 1.5, '#00ffff'));
document.querySelectorAll('.dialog-btn').forEach(btn => updateCursorOnHover(btn, 1.5, '#00ff88'));
document.querySelectorAll('.dialog-close').forEach(btn => updateCursorOnHover(btn, 1.3, '#ff3366'));
document.querySelectorAll('input').forEach(input => updateCursorOnHover(input, 1.2, '#9d00ff'));
document.querySelectorAll('a').forEach(link => updateCursorOnHover(link, 1.3, '#00ffff'));

document.addEventListener('click', () => {
    if (cursorDot) {
        cursorDot.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (cursorDot) cursorDot.style.transform = 'scale(1)';
        }, 150);
    }
    if (cursorOutline) {
        cursorOutline.style.transform = 'scale(0.9)';
        setTimeout(() => {
            if (cursorOutline) cursorOutline.style.transform = 'scale(1)';
        }, 150);
    }
});

createTrailDots();
