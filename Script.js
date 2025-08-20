// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Generate spiral arms
    const spiral = document.querySelector('.spiral');
    const arms = 4;
    const armSegments = 8;
    
    for (let i = 0; i < arms; i++) {
        for (let j = 0; j < armSegments; j++) {
            const arm = document.createElement('div');
            arm.className = 'arm';
            
            // Position each arm segment
            const angle = (i * (360 / arms)) + (j * 15);
            const distance = 50 + (j * 25);
            
            arm.style.transform = `rotate(${angle}deg) translate(${distance}px, 0)`;
            arm.style.width = `${200 - j * 15}px`;
            arm.style.height = `${30 - j * 2}px`;
            arm.style.background = `rgba(${102 + j * 5}, ${153 - j * 5}, ${255 - j * 10}, ${0.3 - j * 0.03})`;
            
            spiral.appendChild(arm);
        }
    }
    
    // Generate stars
    const container = document.querySelector('.container');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        
        // Randomly assign class for large or small stars
        if (Math.random() > 0.7) {
            star.className = 'star star-large';
        } else {
            star.className = 'star star-small';
        }
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        
        // Random animation duration for variety
        const duration = 2 + Math.random() * 5;
        star.style.setProperty('--duration', `${duration}s`);
        
        // Random delay for non-synchronized twinkling
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
    
    // Make emoji draggable
    const emoji = document.getElementById('emoji');
    let isDragging = false;
    let offsetX, offsetY;
    
    emoji.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - emoji.getBoundingClientRect().left;
        offsetY = e.clientY - emoji.getBoundingClientRect().top;
        emoji.style.animation = 'none';
        emoji.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        emoji.style.cursor = 'grab';
        // Restart the animation after a short delay
        setTimeout(() => {
            emoji.style.animation = 'spin 5s infinite linear';
        }, 100);
    });
    
    // Touch events for mobile devices
    emoji.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - emoji.getBoundingClientRect().left;
        offsetY = touch.clientY - emoji.getBoundingClientRect().top;
        emoji.style.animation = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;
        
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
        // Restart the animation after a short delay
        setTimeout(() => {
            emoji.style.animation = 'spin 5s infinite linear';
        }, 100);
    });
});
