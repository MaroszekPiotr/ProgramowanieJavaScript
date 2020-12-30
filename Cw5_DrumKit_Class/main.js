/* eslint-disable indent */
class DrumKit {
    constructor() {
        this.soundtrack = []; //tablica przechowuje nagrywane ścieżki soundtrack1 w [0] itd
        this.recordFlag = []; //info czy nagrywanie jest włączone?
        this.stopFlag = []; //jeżeli flaga===true to zostaje wyłączone odtwarzanie oraz nagrywanie
        this.actionState = [];
        this.recordStartTime = []; //czas wciśnięcia startu nagrywania
        this.keyboardKeys = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP']; //domyślne klawisze obsługujące dźwięki
        this.sounds = [...(document.querySelectorAll('audio'))];
        this.trackDiv = document.querySelector('.soundtrack'); //div do którego przyczepiam nowe ścieżki
        this.SetDrums(); //odpowiednik SetParameters z wersji nieobiektowej
        this.DrawSoundPanel();
        this.AddSoundtrack(0);
        window.addEventListener('keydown', (e) => this.StartDrum(e));
        document.body.querySelector('#addSoundtrack').addEventListener('click', () => this.AddSoundtrack(this.soundtrack.length));
        document.body.querySelector('#playAll').addEventListener('click', () => this.PlayAllRecordedDrums());
        document.body.querySelector('#stopAll').addEventListener('click', () => this.StopAllDrums());
    }
    SetDrums() {
        for (let i = 0; i < this.sounds.length; i++) {
            this.sounds[i] = {
                name: this.sounds[i].id,
                keyboardKey: this.keyboardKeys[i],
                sound: document.querySelectorAll('audio')[i],
            };
        }
    }
    StartDrum(e) {
        this.PlaySound(this.SetDrum(e.code));
        for (let index = 0; index < this.recordFlag.length; index++) {
            if (this.recordFlag[index]) {
                this.RecordDrum(e.code, index);
            }
        }
    }
    SetDrum(keyboardAction) {
        let sound;
        let id;
        this.sounds.forEach(soundData => {
            if (keyboardAction == soundData.keyboardKey) {
                sound = soundData.sound;
                id = soundData.name;
            }
        });
        if (sound) {
            return {
                id: id,
                soundObject: sound,
            };
        } else {
            return {
                soundObject: null,
            };
        }
    }
    DrawSoundPanel() {
        const drumsDiv = document.querySelector('.drums');
        const lineConstruct = (soundIndex) => {
            const soundLine = document.createElement('div');
            soundLine.textContent = `Key: ${(this.sounds[soundIndex].keyboardKey+'').slice(-1)}  -> Sound: "${this.sounds[soundIndex].name}"`;
            return soundLine;
        };
        this.sounds.forEach((sound, index) => {
            drumsDiv.appendChild(lineConstruct(index));
        });

    }
    PlaySound({
        soundObject
    }) {
        if (soundObject) {
            soundObject.currentTime = 0;
            soundObject.play();
        }
    }

    AddSoundtrack(soundtrackIndex) {
        if (soundtrackIndex < 4) {
            const createBtn = (buttonName) => {
                const button = document.createElement('button');
                button.id = `${buttonName}${soundtrackIndex}`;
                button.textContent = `${buttonName}`;
                divTrackNo.appendChild(button);
                button.addEventListener('click', () => {
                    switch (buttonName) {
                        case 'record':
                            this.StartRecordDrum(soundtrackIndex);
                            break;
                        case 'stop':
                            this.StopDrum(soundtrackIndex);
                            break;
                        case 'play':
                            this.PlayRecordedDrum(soundtrackIndex);
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
            this.actionState[soundtrackIndex] = document.createElement('p');
            divTrackNo.appendChild(this.actionState[soundtrackIndex]);
            this.trackDiv.appendChild(divTrackNo);
            //zmiany w JS:
            this.soundtrack.push([]);
            this.recordFlag.push(false);
            this.stopFlag.push(false);
            this.recordStartTime.push();
        } else {
            alert('Max number of tracks is 4!');
        }
    }
    RecordDrum(keyboardAction, soundtrackIndex) {
        let sound = this.SetDrum(keyboardAction);
        if (sound.soundObject) {
            const recordDuration = (Date.now() - this.recordStartTime[soundtrackIndex]);
            const recordedSound = {
                id: sound.id,
                soundObject: sound.soundObject,
                durationTime: recordDuration,
            };
            this.soundtrack[soundtrackIndex].push(recordedSound);
        }
    }
    StartRecordDrum(soundtrackIndex) {
        if (!this.recordFlag[soundtrackIndex]) {
            this.stopFlag[soundtrackIndex] = true;
            this.recordFlag[soundtrackIndex] = true;
            this.recordStartTime[soundtrackIndex] = Date.now();
            this.actionState[soundtrackIndex].textContent = 'RECORDING';
        }
    }
    StopDrum(soundtrackIndex) {
        this.stopFlag[soundtrackIndex] = true;
        this.recordFlag[soundtrackIndex] = false;
        this.actionState[soundtrackIndex].textContent = '';
    }
    StopAllDrums() {
        this.soundtrack.forEach((soundtrack, index) => {
            this.StopDrum(index);
        });
    }
    PlayRecordedDrum(soundtrackIndex) {
        this.recordFlag[soundtrackIndex] = false;
        this.stopFlag[soundtrackIndex] = false;
        if (this.soundtrack[soundtrackIndex].length > 0) this.actionState[soundtrackIndex].textContent = 'PLAYING';
        for (let sound = 0; sound < this.soundtrack[soundtrackIndex].length; sound++) {
            setTimeout(() => {
                    if (!this.stopFlag[soundtrackIndex]) {
                        this.PlaySound(this.soundtrack[soundtrackIndex][sound]);
                        if (sound === (this.soundtrack[soundtrackIndex].length) - 1) this.StopDrum(soundtrackIndex);
                    }
                },
                this.soundtrack[soundtrackIndex][sound].durationTime);
        }
    }
    PlayAllRecordedDrums() {
        this.soundtrack.forEach((soundtrack, index) => {
            this.PlayRecordedDrum(index);
        });
    }
}
new DrumKit();