const soundtrack = [];
const soundtrack1 = [];
const soundtrack2 = [];
const soundtrack3 = [];
const soundtrack4 = [];
const keyboardKeys = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP'];
const sounds = [...(document.querySelectorAll('audio'))];
let recordStartTime; //stara wartość, do wykasowania

//ustawienia domyślne klawiszy grających:
const setParameters = ()=>{
    for (let i=0;i<sounds.length;i++){
        sounds[i] = {
            name: sounds[i].id,
            keyboardKey: keyboardKeys[i],
            sound: document.querySelectorAll('audio')[i],
        };
    }
};

setParameters();

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

const startRecording = () => recordStartTime = Date.now();

const recordDrum = (keyboardAction, soundtrackNumber)=>{
    let sound = setDrum(keyboardAction);
    if (sound.soundObject) {
        const recordDuration = Date.now() - recordStartTime;
        const recordedSound = {
            id: sound.id,
            soundObject: sound.soundObject,
            durationTime: recordDuration
        };
        soundtrackNumber.push(recordedSound);
    }
};
// czas rozpoczęcia nagrywania musi być zapisany w tablicy i odwołania do tablicy
const playRecordedDrum = (soundtrackNumber)=> {
    soundtrackNumber.forEach((sound)=>{
        setTimeout(()=>{
            playSound(sound);
        }, sound.durationTime);

    });
};

const startDrum = (e)=>{
    playSound(setDrum(e.code));
    recordDrum(e.code, soundtrack1);
};
window.addEventListener('keydown', startDrum);