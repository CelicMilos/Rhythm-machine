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
    this.seqVolume = 1;
    this.audioByTrack = {
      0: this.kickAudio,
      1: this.openhatAudio,
      2: this.snareAudio,
      3: this.hihatAudio,
      4: this.clapAudio,
      5: this.crashAudio,
      6: this.cowbellAudio,
    };
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
    const audio = this.audioByTrack[muteIndex];
    audio.volume = e.target.classList.contains("active") ? 0 : this.seqVolume;
  }
  setSeqVolume(volume) {
    this.seqVolume = volume;
    this.muteBtns.forEach((btn) => {
      if (!btn.classList.contains("active")) {
        const track = btn.getAttribute("data-track");
        this.audioByTrack[track].volume = volume;
      }
    });
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

const sekvencerVolumeSlider = document.querySelector(".sekvencer-volume-slider");
const sekvencerVolumeText = document.querySelector(".sekvencer-volume-nbr");
const DEFAULT_SEQ_VOLUME = 50;

sekvencerVolumeSlider.value = DEFAULT_SEQ_VOLUME;
sekvencerVolumeText.innerText = DEFAULT_SEQ_VOLUME;
drumKit.setSeqVolume(DEFAULT_SEQ_VOLUME / 100);

sekvencerVolumeSlider.addEventListener("input", (e) => {
  drumKit.setSeqVolume(e.target.value / 100);
  sekvencerVolumeText.innerText = e.target.value;
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
let saxWave = null;

function getSaxWave() {
  if (!saxWave) {
    const amps = [0, 1, 0.55, 0.65, 0.3, 0.4, 0.2, 0.25, 0.12, 0.15, 0.08, 0.1];
    const real = new Float32Array(amps.length);
    const imag = new Float32Array(amps);
    saxWave = audioCtx.createPeriodicWave(real, imag);
  }
  return saxWave;
}

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
  if (waveform === "saxophone") {
    oscillator.setPeriodicWave(getSaxWave());
  } else {
    oscillator.type = waveform;
  }
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

//*************     ROTIRAJUCI TOCKIC (KNOB)     ************

const KNOB_MIN_ANGLE = -135;
const KNOB_MAX_ANGLE = 135;
const KNOB_DRAG_PIXELS_FOR_FULL_RANGE = 200;

function setupKnob(knob, slider) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const range = max - min;
  const valuePerPixel = range / KNOB_DRAG_PIXELS_FOR_FULL_RANGE;
  const step = Math.max(1, Math.round(range / 50));

  function valueToAngle(value) {
    return KNOB_MIN_ANGLE + ((value - min) / range) * (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE);
  }

  function setKnobValue(value) {
    value = Math.min(max, Math.max(min, Math.round(value)));
    if (Number(slider.value) === value) return;
    slider.value = value;
    knob.style.transform = `rotate(${valueToAngle(value)}deg)`;
    knob.setAttribute("aria-valuenow", value);
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    slider.dispatchEvent(new Event("change", { bubbles: true }));
  }

  knob.style.transform = `rotate(${valueToAngle(slider.value)}deg)`;
  knob.setAttribute("aria-valuenow", slider.value);

  let knobDragging = false;
  let knobStartX = 0;
  let knobStartY = 0;
  let knobStartValue = 0;

  knob.addEventListener("pointerdown", (e) => {
    knobDragging = true;
    knobStartX = e.clientX;
    knobStartY = e.clientY;
    knobStartValue = Number(slider.value);
    knob.setPointerCapture(e.pointerId);
  });

  knob.addEventListener("pointermove", (e) => {
    if (!knobDragging) return;
    const deltaValue = (knobStartY - e.clientY + (e.clientX - knobStartX)) * valuePerPixel;
    setKnobValue(knobStartValue + deltaValue);
  });

  knob.addEventListener("pointerup", () => {
    knobDragging = false;
  });
  knob.addEventListener("pointercancel", () => {
    knobDragging = false;
  });

  knob.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? -1 : 1;
      setKnobValue(Number(slider.value) + direction * step);
    },
    { passive: false },
  );

  knob.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      setKnobValue(Number(slider.value) + step);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      setKnobValue(Number(slider.value) - step);
    }
  });
}

setupKnob(document.getElementById("volume-knob"), volumeSlider);
setupKnob(document.getElementById("sekvencer-volume-knob"), sekvencerVolumeSlider);
