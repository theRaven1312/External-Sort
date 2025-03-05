function createFirework() {
    const firework = document.createElement("div");
    firework.style.position = "fixed";
    firework.style.left = Math.random() * window.innerWidth + "px";
    firework.style.top = Math.random() * window.innerHeight + "px";
    firework.style.width = "10px";
    firework.style.height = "10px";
    firework.style.borderRadius = "50%";
    firework.style.backgroundColor = getRandomColor();
    firework.style.boxShadow = "0 0 10px " + firework.style.backgroundColor;
    document.body.appendChild(firework);

    setTimeout(() => {
        explode(firework);
    }, 500);
}

function explode(firework) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.position = "fixed";
        particle.style.left = firework.style.left;
        particle.style.top = firework.style.top;
        particle.style.width = "10px";
        particle.style.height = "10px";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = getRandomColor();
        particle.style.transition = "transform 1s ease-out, opacity 1s";

        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 100 + 30;
        let x = Math.cos(angle) * distance;
        let y = Math.sin(angle) * distance;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    firework.remove();
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 60%)`;
}

function startFireworks(duration = 5000) {
    let interval = setInterval(createFirework, 300);
    setTimeout(() => clearInterval(interval), duration);
}

// Bắt đầu bắn pháo hoa trong 5 giây

export {startFireworks}
