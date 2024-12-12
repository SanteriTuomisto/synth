<script setup lang="ts">
import { ref, Ref } from 'vue';
import Knob from './components/Knob.vue';

function createNoteTable() {
  const noteFreq = [];
  for (let i = 0; i < 9; i++) {
    noteFreq[i] = [];
  }

  noteFreq[0]["A"] = 27.500000000000000;
  noteFreq[0]["A#"] = 29.135235094880619;
  noteFreq[0]["B"] = 30.867706328507756;

  noteFreq[1]["C"] = 32.703195662574829;
  noteFreq[1]["C#"] = 34.647828872109012;
  noteFreq[1]["D"] = 36.708095989675945;
  noteFreq[1]["D#"] = 38.890872965260113;
  noteFreq[1]["E"] = 41.203444614108741;
  noteFreq[1]["F"] = 43.653528929125485;
  noteFreq[1]["F#"] = 46.249302838954299;
  noteFreq[1]["G"] = 48.999429497718661;
  noteFreq[1]["G#"] = 51.913087197493142;
  noteFreq[1]["A"] = 55.000000000000000;
  noteFreq[1]["A#"] = 58.270470189761239;
  noteFreq[1]["B"] = 61.735412657015513;

  noteFreq[7]["C"] = 2093.004522404789077;
  noteFreq[7]["C#"] = 2217.461047814976769;
  noteFreq[7]["D"] = 2349.318143339260482;
  noteFreq[7]["D#"] = 2489.015869776647285;
  noteFreq[7]["E"] = 2637.020455302959437;
  noteFreq[7]["F"] = 2793.825851464031075;
  noteFreq[7]["F#"] = 2959.955381693075191;
  noteFreq[7]["G"] = 3135.963487853994352;
  noteFreq[7]["G#"] = 3322.437580639561108;
  noteFreq[7]["A"] = 3520.000000000000000;
  noteFreq[7]["A#"] = 3729.310092144719331;
  noteFreq[7]["B"] = 3951.066410048992894;

  noteFreq[8]["C"] = 4186.009044809578154;
  return noteFreq;
}

const notes = createNoteTable();

const context = new AudioContext;

const masterVolume = context.createGain();
masterVolume.connect(context.destination);

const waveforms: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth', 'custom'];
const waveform: Ref<OscillatorType> = ref('sine');

const noteLength = 3;
// noteFreq.forEach((keys, idx) => {
//     const keyList = Object.entries(keys);
//     const octaveElem = document.createElement("div");
//     octaveElem.className = "octave";

//     keyList.forEach((key) => {
//       if (key[0].length === 1) {
//         octaveElem.appendChild(createKey(key[0], idx, key[1]));
//       }
//     });

//     keyboard.appendChild(octaveElem);
//   });

const oscList: { [key: number]: OscillatorNode } = {};

const play = (freq: number) => {
    const osc = context.createOscillator();
    const noteGain = context.createGain();
    // noteGain.gain.setValueAtTime(0, 0);
    // noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + noteLength * attackTime);
    // noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + noteLength - noteLength * releaseTime);
    // noteGain.gain.linearRampToValueAtTime(0, context.currentTime + noteLength);

    // lfoGain = context.createGain();
    // lfoGain.gain.setValueAtTime(vibratoAmount, 0);
    // lfoGain.connect(osc.frequency)

    // lfo = context.createOscillator();
    // lfo.frequency.setValueAtTime(vibratoSpeed, 0);
    // lfo.start(0);
    // lfo.stop(context.currentTime + noteLength);
    // lfo.connect(lfoGain); 

    osc.type = waveform.value;
    // osc.frequency.setValueAtTime(Object.values(notes)[`${currentNotes[currentNoteIndex]}`], 0);
    osc.start(0);
    osc.stop(context.currentTime + noteLength);
    osc.connect(noteGain);

    osc.frequency.value = freq;

    oscList[freq] = osc;

    noteGain.connect(masterVolume);
    // noteGain.connect(delay);
}

const stop = (freq: number) => {
  oscList[freq]?.stop();
}
</script>

<template>
  <div class="root">
    <div v-for="w in waveforms" :key="w">
      <input type="radio" :value="w" v-model="waveform">
      <label>{{ w }}</label>
    </div>
    <div v-for="note in notes" style="display: flex;">
      <div v-for="keyList in Object.entries(note)">
        <button
          @mousedown="() => play(keyList[1])"
          @mouseup="() => stop(keyList[1])"
          @mouseleave="() => stop(keyList[1])"
        >
          {{ keyList[0] }}
        </button>
        <!-- TODO hover mode @mouseenter="() => play(keyList[1])" -->
      </div>
    </div>
    <div class="wood" style="padding: 10px 40px;">
      <div style="padding: 10px; display: flex; gap: 20px;" class="metallic">
        <Knob title="WAVE" />
        <div style="width: 1px; background: black;"></div>
        <Knob title="VOLUME" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  background: black;
  color: gray;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  user-select: none;

  font-family: 'BankGothic Md BT', sans-serif;
  font-family: 'Bank Gothic Light', sans-serif;
  font-family: 'BankGothic', sans-serif;
}

.wood {
  background: linear-gradient(
    90deg,
    #52301c 0%,
    #754224 2%,
    #52301c 5%,
    #754224 15%,
    #52301c 50%,
    #52301c 88%,
    #492814 95%,
    #6b4128 98%,
    #52301c 100%
  );
}

.metallic {
  background: linear-gradient(
    45deg,
    #999 5%,
    #fff 10%,
    #ccc 30%,
    #ddd 50%,
    #ccc 70%,
    #fff 80%,
    #999 95%
  );
  box-shadow: inset 2px 2px 0px 0px #29160a;
}
</style>
