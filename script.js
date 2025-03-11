document.addEventListener("DOMContentLoaded", () => {
    const box = document.querySelector(".box");
    const profilePicture = box.querySelector("img");
    const pfpMenu = document.querySelector(".menu img:nth-child(1)");
    const fileMenu = document.querySelector(".menu p:nth-child(3)");
    const editMenu = document.querySelector(".menu p:nth-child(2)");
    const nameElements = document.querySelectorAll("h2, title, h4, p");
    let posX = window.innerWidth / 2 - box.offsetWidth / 2;
    let posY = window.innerHeight / 2 - box.offsetHeight / 2;
    box.style.position = "absolute";
    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;

    const keyStates = {};
    const speed = 5;
    const gravity = 1;
    const leap = -15;
    let xmb9mode = false;
    let dvdmode = false;
    let matt = false;
    let dx = 2;
    let dy = 2;
    let isJumping = false;
    const xmb9letters = ["x", "m", "b", "9"];
    const dvdletters = ["d", "v", "d"];
    const mattletters = ["m", "a", "t", "t"];
    let xmb9index = 0;
    let indvdex = 0;
    let mattindex = 0;

    document.addEventListener("keydown", (event) => {
        keyStates[event.key] = true;

        if (!xmb9mode && !dvdmode) {
            if (event.key === xmb9letters[xmb9index]) {
                xmb9index++;
                if (xmb9index === xmb9letters.length) {
                    xmb9mode = true;
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
        profilePicture.src = "matt.png";
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "matthew.png"
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
        xmb9mode = false;
        dvdmode = false;
        matt = false;
        dx = 2;
        dy = 2;
        isJumping = false;
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = "xmb9.png";
        profilePicture.src = "images/Untitled.png";
        nameElements.forEach((element) => {
            element.textContent = element.textContent.replace(/Matt/g, "xmb9");
            element.textContent = element.textContent.replace(/xmb9hereal/g, "Ethereal");
            element.textContent = element.textContent.replace(/This xmb9/g, "This Mac");
            element.textContent = element.textContent.replace(/xmb9 OS/g, "Mac OS");
        });

        Object.keys(keyStates).forEach((key) => {
            keyStates[key] = false;
        });
    }

    editMenu.addEventListener("click", () => {
        dvdmode = true;
    });

    fileMenu.addEventListener("click", () => {
        resetAll();
    });

    pfpMenu.addEventListener("click", () => {
        mattstart();
    });

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
        } else if (xmb9mode) {
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);

            dy += gravity;
            posY = Math.min(window.innerHeight - box.offsetHeight, posY + dy);

            if (posY >= window.innerHeight - box.offsetHeight) {
                dy = 0;
                isJumping = false;
            }

            if ((keyStates[" "] || keyStates["ArrowUp"]) && !isJumping) {
                dy = leap;
                isJumping = true;
            }
        } else {
            if (keyStates["ArrowUp"]) posY = Math.max(0, posY - speed);
            if (keyStates["ArrowDown"]) posY = Math.min(window.innerHeight - box.offsetHeight, posY + speed);
            if (keyStates["ArrowLeft"]) posX = Math.max(0, posX - speed);
            if (keyStates["ArrowRight"]) posX = Math.min(window.innerWidth - box.offsetWidth, posX + speed);
        }

        box.style.left = `${posX}px`;
        box.style.top = `${posY}px`;

        requestAnimationFrame(move);
    }

    move();

    box.addEventListener("mousedown", (event) => {
        let isDragging = true;
        const mouseX = event.clientX - box.offsetLeft;
        const mouseY = event.clientY - box.offsetTop;

        const dragMove = (moveEvent) => {
            if (isDragging) {
                posX = Math.max(0, Math.min(window.innerWidth - box.offsetWidth, moveEvent.clientX - mouseX));
                posY = Math.max(0, Math.min(window.innerHeight - box.offsetHeight, moveEvent.clientY - mouseY));
                box.style.left = `${posX}px`;
                box.style.top = `${posY}px`;
            }
        };

        document.addEventListener("mousemove", dragMove);

        document.addEventListener("mouseup", () => {
            isDragging = false;
            document.removeEventListener("mousemove", dragMove);
        }, { once: true });
    });
});
