class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.currenKick = "./zvukovi/kick-classic.wav";
    this.currenSnare = "./zvukovi/snare-electro.wav";
    this.currenHihat = "./zvukovi/hihat-electro.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 150;
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
    let step = this.index % 12;
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
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
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
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
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
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
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
    const platBtn = document.querySelector(".play");
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
  reset() {
    // 1. Zaustavi loop
    clearInterval(this.isPlaying);
    this.isPlaying = null;

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
    this.snareAudio.pause();
    this.snareAudio.currentTime = 0;
    this.hihatAudio.pause();
    this.hihatAudio.currentTime = 0;
  }
}
const drumKit = new Drumkit();
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
