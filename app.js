class Drumkit{
    constructor(){
        this.pads= document.querySelectorAll(".pad");
        this.currenKick="./zvukovi/kick-classic.wav";
        this.currenSnare="./zvukovi/snare-electro.wav";
        this.currenHihat="./zvukovi/hihat-electro.wav";
        this.kickAudio= document.querySelector(".kick-sound");
        this.snareAudio= document.querySelector(".snare-sound");
        this.hihatAudio= document.querySelector(".hihat-sound");
        this.playBtn= document.querySelector(".play");
        this.index= 0 ;
        this.bpm= 250;
        this.isplaying=null;
        this.selects=document.querySelectorAll('select');
     }
     activePad(){
         this.classList.toggle("active");
     }

     repeat(){
         let step =this.index % 8;
         const activeBars= document.querySelectorAll(`.b${step}`);
         //ponavljanje padova
         activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.2s alternate ease-in-out 2`;
            //dodavanje zvuka
            if(bar.classList.contains('active')){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime= 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime= 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime= 0;
                    this.hihatAudio.play();
                }

            }
        });
        this.index++;
         
    }
        start(){
            const interval=(60/this.bpm)*1000;
            if(!this.isPlaying){
                this.isPlaying = setInterval(() => {
                    this.repeat();
                },interval);
            } else{
                clearInterval(this.isPlaying);
                this.isPlaying = null;
            }
       
        
    }
    updateBtn(){
        if(!this.isPlaying){
            this.playBtn.innerText = "STOP";
            this.playBtn.classList.add('active');

        }else{
            this.playBtn.innerText = "PLAY";
            this.playBtn.classList.remove('active');
        }

    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName){
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
         
}
const drumKit = new Drumkit(); 
drumKit.pads.forEach(pad => {
    pad.addEventListener('click',drumKit.activePad);
    pad.addEventListener('animationend',function(){
        this.style.animation= "";
    })
});
drumKit.playBtn.addEventListener('click',() => {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select =>{
    select.addEventListener('change', function(e){
     drumKit.changeSound(e);
    });
});
   

