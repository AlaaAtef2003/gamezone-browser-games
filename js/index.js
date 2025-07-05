    const numBubbles =300; 
        for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        
        const size = Math.random() * 8 + 4;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.top = `${Math.random() * 100}vh`;

        
        const moveX = (Math.random() - 0.5) * 100 + "px";
        const moveY = (Math.random() - 0.5) * 100 + "px";
        bubble.style.setProperty('--x', moveX);
        bubble.style.setProperty('--y', moveY);
        bubble.style.animationDuration = `${5 + Math.random() * 5}s`;

        document.body.appendChild(bubble);
        }