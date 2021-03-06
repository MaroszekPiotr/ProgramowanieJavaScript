const soundtrack = []; //tablica przechowuje nagrywane ścieżki soundtrack1 w [0] itd
const recordFlag = []; //info czy nagrywanie jest włączone?
const stopFlag = []; //jeżeli flaga===true to zostaje wyłączone odtwarzanie oraz nagrywanie
const actionState = [];
const recordStartTime = []; //czas wciśnięcia startu nagrywania
const keyboardKeys = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP']; //domyślne klawisze obsługujące dźwięki
const sounds = [...(document.querySelectorAll('audio'))];
const trackDiv = document.querySelector('.soundtrack'); //div do którego przyczepiam nowe ścieżki

const setParameters = ()=>{ //ustawienia domyślne klawiszy grających:
    for (let i=0;i<sounds.length;i++){
        sounds[i] = {
            name: sounds[i].id,
            keyboardKey: keyboardKeys[i],
            sound: document.querySelectorAll('audio')[i],
        };
    }
};
setParameters();

const drawSoundPanel = ()=>{
    const drumsDiv = document.querySelector('.drums');
    const lineConstruct = (soundIndex)=>{
        const soundLine = document.createElement('div');
        soundLine.textContent = `Key: ${(sounds[soundIndex].keyboardKey+'').slice(-1)}  -> Sound: "${sounds[soundIndex].name}"`;
        return soundLine;
    };
    sounds.forEach((sound, index)=>{
        drumsDiv.appendChild(lineConstruct(index));
    });
};
drawSoundPanel();

const playSound = ({soundObject}) => {
    if (soundObject){
        soundObject.currentTime = 0;
        soundObject.play();
    }
};

const setDrum = keyboardAction => {
    let sound;
    let id;
    sounds.forEach(soundData => {
        if (keyboardAction==soundData.keyboardKey) {
            sound = soundData.sound;
            id = soundData.name;
        }
    });

    if (sound) {
        return  {
            id: id,
            soundObject: sound, 
        };
    } else {
        return {
            soundObject: null,
        };
    }
};

const recordDrum = (keyboardAction, soundtrackIndex)=>{
    let sound = setDrum(keyboardAction);
    if (sound.soundObject) {
        const recordDuration = (Date.now() - recordStartTime[soundtrackIndex]);
        const recordedSound = {
            id: sound.id,
            soundObject: sound.soundObject,
            durationTime: recordDuration,
        };
        soundtrack[soundtrackIndex].push(recordedSound);
    }
};

const startRecordDrum = (keyboardAction,soundtrackIndex)=> {
    if (!recordFlag[soundtrackIndex]) {
        stopFlag[soundtrackIndex]=true;
        recordFlag[soundtrackIndex] = true;
        recordStartTime[soundtrackIndex] = Date.now();
        actionState[soundtrackIndex].textContent = 'RECORDING';
    }
};

const stopDrum = (soundtrackIndex)=> {
    stopFlag[soundtrackIndex]=true; 
    recordFlag[soundtrackIndex]=false;
    actionState[soundtrackIndex].textContent = '';
};

const playRecordedDrum = (soundtrackIndex)=> {
    recordFlag[soundtrackIndex]=false;
    stopFlag[soundtrackIndex]=false;
    if (soundtrack[soundtrackIndex].length>0) actionState[soundtrackIndex].textContent='PLAYING';
    for (let sound=0;sound<soundtrack[soundtrackIndex].length;sound++){
        setTimeout(()=>{
            if (!stopFlag[soundtrackIndex]){
                playSound(soundtrack[soundtrackIndex][sound]);
                if (sound===(soundtrack[soundtrackIndex].length)-1) stopDrum(soundtrackIndex);
            }},                
        soundtrack[soundtrackIndex][sound].durationTime);    
    }
};

const stopAllDrums = ()=> {
    soundtrack.forEach((soundtrack, index)=>{
        stopDrum(index);
    });
};
const playAllRecordedDrums = ()=>{
    soundtrack.forEach((soundtrack, index)=>{
        playRecordedDrum(index);
    });
};

const addSoundtrack = (soundtrackIndex)=> { //metoda tworząca przycisk wraz z nasłuchiwaniem:
    if (soundtrackIndex<4){ 
        const createBtn = (buttonName)=>{
            const button = document.createElement('button');
            button.id = `${buttonName}${soundtrackIndex}`;
            button.textContent = `${buttonName}`;
            divTrackNo.appendChild(button);
            button.addEventListener('click',(e)=>{
                switch(buttonName){
                case 'record': 
                    startRecordDrum(e.code, soundtrackIndex);
                    break;
                case 'stop': stopDrum(soundtrackIndex);
                    break;
                case 'play': playRecordedDrum(soundtrackIndex);
                    break;
                }
            });
        };
        //zmiany w HTML:
        const divTrackNo = document.createElement('div'); // nowa, generowana ścieżka muzyczna
        divTrackNo.id = `track${soundtrackIndex}`;
        divTrackNo.textContent = `Track ${soundtrackIndex+1}:`;
        createBtn('record');
        createBtn('stop');
        createBtn('play');
        actionState[soundtrackIndex] = document.createElement('p');
        divTrackNo.appendChild(actionState[soundtrackIndex]);
        trackDiv.appendChild(divTrackNo);
        //zmiany w JS:
        soundtrack.push([]);
        recordFlag.push(false);
        stopFlag.push(false);
        recordStartTime.push();
    } else {
        alert('Max number of tracks is 4!');
    }    
};
addSoundtrack(0);

const startDrum = (e)=>{
    playSound(setDrum(e.code));
    for (let index=0; index<recordFlag.length; index++){
        if (recordFlag[index]){
            recordDrum(e.code, index);
        }
    }
};
window.addEventListener('keydown', startDrum);
document.body.querySelector('#addSoundtrack').addEventListener('click', ()=>addSoundtrack(soundtrack.length));
document.body.querySelector('#playAll').addEventListener('click',playAllRecordedDrums);
document.body.querySelector('#stopAll').addEventListener('click',stopAllDrums);