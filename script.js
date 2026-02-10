// Create floating hearts
function createHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 300);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const nextBtn = document.getElementById('nextBtn');
    const continueBtn = document.getElementById('continueBtn');
    const mainContainer = document.getElementById('mainContainer');
    const timelineContainer = document.getElementById('timelineContainer');
    const proposalContainer = document.getElementById('proposalContainer');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebration = document.getElementById('celebration');
    
    let musicPlaying = false;
    
    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔇';
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.textContent = '🔊';
            musicToggle.classList.add('playing');
        }
        musicPlaying = !musicPlaying;
    });
    
    // Auto-play music on first interaction
    const startMusic = () => {
        if (!musicPlaying) {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.textContent = '🔊';
            musicToggle.classList.add('playing');
            musicPlaying = true;
        }
    };
    
    // Next button click - show timeline
    nextBtn.addEventListener('click', () => {
        startMusic();
        mainContainer.classList.add('hidden');
        timelineContainer.classList.remove('hidden');
    });
    
    // Continue button click - show proposal
    continueBtn.addEventListener('click', () => {
        timelineContainer.classList.add('hidden');
        proposalContainer.classList.remove('hidden');
    });
    
    // Yes button click
    yesBtn.addEventListener('click', () => {
        proposalContainer.classList.add('hidden');
        celebration.classList.remove('hidden');
        createConfetti();
    });
    
    // No button - make it run away
    let noBtnClickCount = 0;
    noBtn.addEventListener('mouseover', () => {
        noBtnClickCount++;
        const maxX = window.innerWidth - noBtn.offsetWidth - 100;
        const maxY = window.innerHeight - noBtn.offsetHeight - 100;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Make Yes button bigger
        const currentSize = 1 + (noBtnClickCount * 0.1);
        yesBtn.style.transform = `scale(${Math.min(currentSize, 1.5)})`;
        
        // Change button text after a few attempts
        if (noBtnClickCount === 3) {
            noBtn.textContent = 'Really?';
        } else if (noBtnClickCount === 5) {
            noBtn.textContent = 'Are you sure?';
        } else if (noBtnClickCount === 7) {
            noBtn.textContent = 'Please? 🥺';
        }
    });
    
    // If they somehow click No
    noBtn.addEventListener('click', () => {
        alert('The "No" button is currently out of service! 😊💕 Please click "Yes" instead! ❤️');
    });
});

// Create confetti effect
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = '1';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const fallDuration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 30);
    }
}
