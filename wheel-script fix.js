document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const spinButton = document.getElementById("spinButton");
    const resultText = document.getElementById("result");

    const options = ["Free Ebook", "Discount Code", "Bonus Gift", "Free Trial", "Exclusive Offer"];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#FF33A6"];
    let spinning = false;

    function drawWheel() {
        const slices = options.length;
        const sliceAngle = (2 * Math.PI) / slices;

        for (let i = 0; i < slices; i++) {
            ctx.beginPath();
            ctx.moveTo(200, 200);
            ctx.arc(200, 200, 200, i * sliceAngle, (i + 1) * sliceAngle);
            ctx.fillStyle = colors[i];
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#fff";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(options[i], 200 + Math.cos(sliceAngle * i + sliceAngle / 2) * 120, 200 + Math.sin(sliceAngle * i + sliceAngle / 2) * 120);
        }
    }

    function spinWheel() {
        if (spinning) return;
        spinning = true;

        let rotation = 0;
        let spinTime = 0;
        let spinDuration = Math.random() * 3000 + 3000;

        function animateSpin() {
            if (spinTime >= spinDuration) {
                spinning = false;
                let chosenIndex = Math.floor(Math.random() * options.length);
                resultText.textContent = "You won: " + options[chosenIndex] + "!";
                return;
            }
            setTimeout(function () {
                window.location.href = "redeem.html"; // Change to the next page you want
            }, 3000); // Redirect after 5 seconds
            rotation += 20;
            ctx.clearRect(0, 0, 400, 400);
            ctx.save();
            ctx.translate(200, 200);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.translate(-200, -200);
            drawWheel();
            ctx.restore();

            spinTime += 30;
            requestAnimationFrame(animateSpin);
        }

        animateSpin();
    }

    drawWheel();
    spinButton.addEventListener("click", spinWheel);
});
