// creating drum buttons
var NumOfDrumButton = document.querySelectorAll(".drum").length;

for (var i = 0; i < NumOfDrumButton; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttinnerhtml = this.innerHTML;
        keysound(buttinnerhtml);
        buttonAnimation(buttinnerhtml);
    });
}

// Keyboard Press 
document.addEventListener("keypress", function (event) {
    keysound(event.key);
    buttonAnimation(event.key);
});

// Sound function
function keysound(key) {
    createSoundWave(); // Visual effect on sound

    // Recording
    if (isRecording) {
        recording.push({
            key: key,
            time: Date.now() - recordStartTime
        });
    }

    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "l":
            var bass = new Audio("sounds/kick-bass.mp3");
            bass.play();
            break;
        default:
            console.log(key);
            break;
    }
}

// Button Animation
function buttonAnimation(currkey) {
    var actbutton = document.querySelector("." + currkey);

    if (actbutton) { // Check if button exists
        actbutton.classList.add("pressed");

        setTimeout(function () {
            actbutton.classList.remove("pressed");
        }, 100);
    }
}

// Create Sound Wave Visual
function createSoundWave() {
    var container = document.getElementById("sound-wave-container");
    var wave = document.createElement("div");
    wave.classList.add("wave");

    // Randomize wave color
    wave.style.borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    container.appendChild(wave);

    // Remove after animation
    setTimeout(function () {
        wave.remove();
    }, 600);
}


// Record & Playback
var recording = [];
var isRecording = false;
var recordStartTime = 0;

function startRecording() {
    recording = []; // clear old recording
    isRecording = true;
    recordStartTime = Date.now();
    console.log("Recording started...");
}

function stopRecording() {
    isRecording = false;
    console.log("Recording stopped.");
}

function playRecording() {
    isRecording = false;
    console.log("Playing recording...");

    for (var i = 0; i < recording.length; i++) {
        (function (i) {
            setTimeout(function () {
                keysound(recording[i].key);
                buttonAnimation(recording[i].key);
            }, recording[i].time);
        })(i);
    }
}
