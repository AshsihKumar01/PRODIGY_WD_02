let timer;
let isRunning = false;
let startTime;
let lapNumber = 1;

function startPause() {
    const startPauseButton = document.getElementById("startPause");

    if (!isRunning) {
        startTime = new Date() - (timer || 0);
        startPauseButton.textContent = "Pause";
        timer = setInterval(updateDisplay, 1000);
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseButton.textContent = "Resume";
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
    isRunning = false;
    startTime = undefined;  // Fix to prevent resetting when resuming
}

function lap() {
    if (isRunning) {
        const lapTime = calculateElapsedTime();
        const lapList = document.getElementById("laps");

        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapNumber++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function updateDisplay() {
    const elapsedTime = calculateElapsedTime();
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function calculateElapsedTime() {
    return new Date() - startTime;
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
