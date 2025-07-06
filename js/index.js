const numBubbles = 400;

for (let i = 0; i < numBubbles; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = Math.random() * 8 + 4;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // استخدم scrollHeight و scrollWidth لتغطية الصفحة بالكامل
  const screenWidth = document.documentElement.scrollWidth - size;
  const screenHeight = document.documentElement.scrollHeight - size;

  bubble.style.left = `${Math.random() * screenWidth}px`;
  bubble.style.top = `${Math.random() * screenHeight}px`;

  const moveX = (Math.random() - 0.5) * 100 + "px";
  const moveY = (Math.random() - 0.5) * 100 + "px";
  bubble.style.setProperty('--x', moveX);
  bubble.style.setProperty('--y', moveY);
  bubble.style.animationDuration = `${5 + Math.random() * 5}s`;

  document.body.appendChild(bubble);
}
