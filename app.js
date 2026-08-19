class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.currenKick = "./zvukovi/kick-classic.wav";
    this.currenSnare = "./zvukovi/snare-electro.wav";
    this.currenHihat = "./zvukovi/hihat-electro.wav";
    this.currenOpenhat = "./zvukovi/openhat-808.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.cowbellAudio = document.querySelector(".cowbell-sound");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
    this.defaultBpm = 150;
    this.isplaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.resetBtn = document.querySelector(".reset");
  }
  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //ponavljanje padova
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;
      //dodavanje zvuka
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("crash-pad")) {
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }
        if (bar.classList.contains("cowbell-pad")) {
          this.cowbellAudio.currentTime = 0;
          this.cowbellAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "STOP";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "PLAY";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "openhat-select":
        this.openhatAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
      case "crash-select":
        this.crashAudio.src = selectionValue;
        break;
      case "cowbell-select":
        this.cowbellAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.openhatAudio.volume = 0;
          break;
        case "2":
          this.snareAudio.volume = 0;
          break;
        case "3":
          this.hihatAudio.volume = 0;
          break;
        case "4":
          this.clapAudio.volume = 0;
          break;
        case "5":
          this.crashAudio.volume = 0;
          break;
        case "6":
          this.cowbellAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.openhatAudio.volume = 1;
          break;
        case "2":
          this.snareAudio.volume = 1;
          break;
        case "3":
          this.hihatAudio.volume = 1;
          break;
        case "4":
          this.clapAudio.volume = 1;
          break;
        case "5":
          this.crashAudio.volume = 1;
          break;
        case "6":
          this.cowbellAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nbr");
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
  reset() {
    // 1. Zaustavi loop
    clearInterval(this.isPlaying);
    this.isPlaying = null;

    //Reset tempo

    this.bpm = this.defaultBpm;
    this.tempoSlider.value = this.defaultBpm;
    document.querySelector(".tempo-nbr").innerText = this.defaultBpm;

    // 2. Reset indeks
    this.index = 0;

    // 3. Ukloni sve active padove i animacije
    this.pads.forEach((pad) => {
      pad.classList.remove("active");
      pad.style.animation = "none";
    });

    // 4. Vrati PLAY dugme u stanje početka
    this.playBtn.classList.remove("active");
    this.playBtn.innerText = "PLAY";

    // 5. Zaustavi sve zvuke
    this.kickAudio.pause();
    this.kickAudio.currentTime = 0;
    this.openhatAudio.pause();
    this.openhatAudio.currentTime = 0;
    this.snareAudio.pause();
    this.snareAudio.currentTime = 0;
    this.hihatAudio.pause();
    this.hihatAudio.currentTime = 0;
    this.clapAudio.pause();
    this.clapAudio.currentTime = 0;
    this.crashAudio.pause();
    this.crashAudio.currentTime = 0;
    this.cowbellAudio.pause();
    this.cowbellAudio.currentTime = 0;
  }
}
const drumKit = new Drumkit();
drumKit.tempoSlider.value = drumKit.defaultBpm;
document.querySelector(".tempo-nbr").innerText = drumKit.defaultBpm;
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});

drumKit.resetBtn.addEventListener("click", () => {
  drumKit.reset();
});

//*************     PIANO PART     ************

const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
const BLACK_KEYS = ["w", "e", "t", "y", "u", "o", "p"];

const NOTE_FREQUENCIES = {
  C: 261.63,
  Db: 277.18,
  D: 293.66,
  Eb: 311.13,
  E: 329.63,
  F: 349.23,
  Gb: 369.99,
  G: 392.0,
  Ab: 415.3,
  A: 440.0,
  Bb: 466.16,
  B: 493.88,
};

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const instrumentSelect = document.getElementById("instrument-select");

let audioCtx = null;

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

function playNote(key) {
  key.classList.add("active");
  if (instrumentSelect.value === "piano") {
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();
    noteAudio.addEventListener("ended", () => {
      key.classList.remove("active");
    });
  } else {
    const octave = parseInt(key.dataset.octave || "0", 10);
    const oscillator = playSynthNote(
      key.dataset.note,
      instrumentSelect.value,
      octave,
    );
    oscillator.addEventListener("ended", () => {
      key.classList.remove("active");
    });
  }
}

function playSynthNote(note, waveform, octave = 0) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const now = audioCtx.currentTime;
  const peakGain = 0.3 * (volumeSlider.value / 100);

  const oscillator = audioCtx.createOscillator();
  oscillator.type = waveform;
  oscillator.frequency.value = NOTE_FREQUENCIES[note] * Math.pow(2, octave);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.6);

  return oscillator;
}

const noteAudios = document.querySelectorAll(".lower-section audio");
const volumeSlider = document.querySelector(".volume-slider");
const volumeText = document.querySelector(".volume-nbr");
const DEFAULT_VOLUME = 50;

volumeSlider.value = DEFAULT_VOLUME;
volumeText.innerText = DEFAULT_VOLUME;
noteAudios.forEach((audio) => {
  audio.volume = DEFAULT_VOLUME / 100;
});

volumeSlider.addEventListener("input", (e) => {
  noteAudios.forEach((audio) => {
    audio.volume = e.target.value / 100;
  });
  volumeText.innerText = e.target.value;
});
