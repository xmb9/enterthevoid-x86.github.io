document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
    const profilePicture = box.querySelector("img");
    const pfpMenu = document.querySelector(".menu img:nth-child(1)");
    const fileMenu = document.querySelector(".menu p:nth-child(2)");
    const editMenu = document.querySelector(".menu p:nth-child(3)");
    const nameElements = document.querySelectorAll("h2, title");
    let posX = window.innerWidth / 2 - box.offsetWidth / 2;
    let posY = window.innerHeight / 2 - box.offsetHeight / 2;
    box.style.position = "absolute";
    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;

    const keyStates = {};
    const speed = 5;
    const gravity = 1;
    const leap = -15;
    let xmb9iemode = false;
    let dvdmode = false;
    let matt = false;
    let dx = 2;
    let dy = 2;
    let isJumping = false;
    const xmb9ieletters = ["x", "m", "b", "9"];
    const dvdletters = ["d", "v", "d"];
    const mattletters = ["m", "a", "t", "t"];
    let xmb9index = 0;
    let indvdex = 0;
    let mattindex = 0;

    document.addEventListener("keydown", (event) => {
        keyStates[event.key] = true;

        if (!xmb9iemode && !dvdmode) {
            if (event.key === xmb9ieletters[xmb9index]) {
                xmb9index++;
                if (xmb9index === xmb9ieletters.length) {
                    xmb9iemode = true;
                    xmb9index = 0;
                }
            } else {
                xmb9index = 0;
            }

            if (event.key === dvdletters[indvdex]) {
                indvdex++;
                if (indvdex === dvdletters.length) {
                    dvdmode = true;
                    indvdex = 0;
                }
            } else {
                indvdex = 0;
            }
        }
        if (event.key === mattletters[mattindex]) {
            mattindex++;
            if (mattindex === mattletters.length) {
                mattstart();
                mattindex = 0;
            }
        } else {
            mattindex = 0;
        }
        if (event.key === "r" || event.key === "R") {
            resetAll();
        }
    });

    document.addEventListener("keyup", (event) => {
        keyStates[event.key] = false;
    });

    function mattstart() {
        matt = true;
        profilePicture.src = "images/matt.png";
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "images/matthew.png";
        nameElements.forEach((element) => {
            element.textContent = element.textContent.replace(/xmb9/g, "Matt");
            element.textContent = element.textContent.replace(/Mac/g, "Matt");
            element.textContent = element.textContent.replace(/Ethereal/g, "Matthereal");
        });
    }

    function resetAll() {
        posX = window.innerWidth / 2 - box.offsetWidth / 2;
        posY = window.innerHeight / 2 - box.offsetHeight / 2;
        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;
        xmb9iemode = false;
        dvdmode = false;
        matt = false;
        dx = 2;
        dy = 2;
        isJumping = false;
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "images/xmb9.png";
        profilePicture.src = "images/Untitled.png";
        nameElements.forEach((element) => {
            element.textContent = element.textContent.replace(/Matt/g, "xmb9");
            element.textContent = element.textContent.replace(/xmb9 OS/g, "Mac OS");
            element.textContent = element.textContent.replace(/xmb9ereal/g, "Ethereal");
            element.textContent = element.textContent.replace(/This xmb9/g, "This Mac");
        });

        Object.keys(keyStates).forEach((key) => {
            keyStates[key] = false;
        });
    }

    function move() {
        if (dvdmode) {
            posX += dx;
            posY += dy;

            if (posX <= 0 || posX >= window.innerWidth - box.offsetWidth) {
                dx *= -1;
            }
            if (posY <= 30 || posY >= window.innerHeight - box.offsetHeight) {
                dy *= -1;
            }
        } else if (xmb9iemode) {
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);

            dy += gravity;
            posY = Math.min(window.innerHeight - box.offsetHeight, posY + dy);

            if (posY >= window.innerHeight - box.offsetHeight) {
                dy = 30;
                isJumping = false;
            }

            if ((keyStates[" "] || keyStates["ArrowUp"]) && !isJumping) {
                dy = leap;
                isJumping = true;
            }
        } else {
            if (keyStates["ArrowUp"]) posY = Math.max(30, posY - speed);
            if (keyStates["ArrowDown"]) posY = Math.min(window.innerHeight - box.offsetHeight, posY + speed);
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);
        }

        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;

        requestAnimationFrame(move);
    }

    move();

    pfpMenu.addEventListener("click", () => {
        mattstart();
    });

    fileMenu.addEventListener("click", () => {
        dvdmode = true;
        indvdex = 0;
    });

    editMenu.addEventListener("click", () => {
        resetAll(); 
    });

    box.addEventListener("mousedown", (event) => {
        let isDragging = true;
        const mouseX = event.clientX - box.offsetLeft;
        const mouseY = event.clientY - box.offsetTop;
        document.getElementById('wmov idle').play();

        const children = box.querySelectorAll('*');

        const dragMove = (moveEvent) => {
            document.getElementById('wmov idle').pause();
            document.getElementById('wmov idle').currentTime = 0;
            if (isDragging) {
                posX = Math.max(0, Math.min(window.innerWidth - box.offsetWidth, moveEvent.clientX - mouseX));
                posY = Math.max(30, Math.min(window.innerHeight - box.offsetHeight, moveEvent.clientY - mouseY));
                box.style.left = `${posX}px`;
                box.style.top = `${posY}px`;
                box.style.backgroundColor = "transparent";
                box.style.border = "dotted 2px black";
                children.forEach(child => {
                    child.style.opacity = 0;
                });
            }
            document.getElementById('wmov moving').play();
        };
        
        document.addEventListener("mousemove", dragMove);

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                document.getElementById('wmov idle').pause();
                document.getElementById('wmov idle').currentTime = 0;
                document.getElementById('delay').play();
            }
            isDragging = false;
            document.getElementById('wmov moving').pause();
            document.getElementById('wmov moving').currentTime = 0;
            const children = box.querySelectorAll('*');
            children.forEach(child => {
                child.style.opacity = 100;
            });
            box.style.backgroundColor = "#dcdcdc";
            box.style.border = "solid 2px black";
            document.removeEventListener("mousemove", dragMove);
        }, { once: true });
    });

    document.getElementById('switch').addEventListener("click", () => {
        document.getElementById('powerBtn').remove();
        document.querySelector('.top').style.display = "flex";
        document.querySelector('.main').style.display = "flex";
        document.querySelector('.main').style.backgroundImage = "url(images/background.png)";
        document.querySelector('.main').style.backgroundRepeat = "repeat";
        document.getElementById('startupSound').play();
        resetAll();
    });
});
