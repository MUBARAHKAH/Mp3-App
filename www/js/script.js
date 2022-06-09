let previous = document.querySelector('#pre');
let play=document.querySelector('#play');
let next=document.querySelector('#next');
let title=document.querySelector('#title');
let recent_volume=document.querySelector('#volume');
let volume_show=document.querySelector('#volume_show');
let slider=document.querySelector('#duration_slider');
let show_duration=document.querySelector('#show_duration');
let quranPix= document.querySelector('#quranPix');
let auto_play=document.querySelector('#auto');
let present=document.querySelector('#present');
let total = document.querySelector('#total');
let reciter=document.querySelector('#reciter');

let timer;
let autoplay=0;
let index_no=0;
let playing_quran=false;

//create audio element
let quran = document.createElement('audio');

//All Chapters
let all_Chapters=[
  {
    name:"suratul Fathiat",
    path:"mp3/001.mp3",
    img:"img/quran11.PNG",
    reciter:"1"

  },

  {
    name:"suratul Ikhlas",
    path:"mp3/002.mp3",
    img:"img/quran11.PNG",
    reciter:"2"
  }
];

function load_quran(index_no){
  clearInterval(timer);
  reset_slider();
  quran.src=all_Chapters[index_no].path
  title.innerHTML=all_Chapters[index_no].name
  quranPix.src=all_Chapters[index_no].img
  reciter.innerHTML=all_Chapters[index_no].reciter
  quran.load()
  timer=setInterval(range_slider, 1000);
  total.innerHTML=all_Chapters.length;
  present.innerHTML=index_no+1;
}load_quran(index_no)


//mute_sound function
function mute_sound(){
  quran.volume=0;
  volume.value=0;
  volume_show.innerHTML=0;
}

function justplay(){
  if(playing_quran==false){
    playquran();
  }
  else{
    pausequran();
  }
}

//reset quran range_slider
function reset_slider(){
  slider.value=0;
}

//playquran
function playquran(){
  quran.play();
  playing_quran=true;
  play.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>;'
}

function pausequran(){
  quran.pause();
  playing_quran=false;
  play.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>;'
}

//next_chapter
function next_chapter(){
  if(index_no < all_Chapters.length - 1){
    index_no +=1
    load_quran(index_no);
    playquran()
  }
  else{
    index_no = 0
    load_quran(index_no)
    playquran()
  }
}

//previous_chapter
function previous_chapter(){
  if(index_no > 0){
    index_no -=1
    load_quran(index_no);
    playquran()
  }
  else{
    index_no = all_Chapters.length
    load_quran(index_no)
    playquran()
  }
}

//change volume
function volume_change(){
  volume_show.innerHTML=recent_volume.value;
  quran.volume=recent_volume.value/100
}

//change slider position
function change_duration(){
  slider_position = quran.duration * (slider.value/100);
  quran.currentTime = slider_position;
}

//Auto function
function autoplay_switch(){
  if(autoplay==1){
    autoplay=0;
    auto_play.style.background="rgba(255, 255, 255, 0.2)"
  }
  else{
    autoplay=1;
    auto_play.style.background="#148F77"
  }
}
function range_slider(){
  let position=0;
  //update slider slider_position
  if(!isNaN(quran.duration)){
    position=quran.currentTime*(100/quran.duration);
    slider.value=position;
    //function should work when the quran is over
    if(quran.ended){
      play.innerHTML='<i class= "fa fa-play" aria-hidden="true"></i>';
        index_no+=1
        load_quran(index_no)
        playquran()
    }
  }
}
