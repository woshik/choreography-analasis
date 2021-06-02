<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">
        Perform Exercise: {{ activeExerciseData.trainingName }}
      </h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <div class="form-group">
        <label for="courseCode">Exercise Time Slot</label>
        <div class="mt-5">
          <vue-slider
            v-model="exerciseDetails.breakPoints"
            :min="0"
            :max="exerciseDetails.duration"
            :tooltip="'always'"
            :process="false"
            :marks="true"
            disabled
          />
        </div>
      </div>

      <div class="form-group mt-5 mb-5">
        <label for="courseCode">Training Time Slot</label>
        <div class="mt-5">
          <vue-slider
            v-model="trainingData.track"
            :min="0"
            :max="getDurationInMinisecond"
            :tooltip="'always'"
            :tooltip-formatter="formatToolTipLabel"
            :process="false"
            disabled
          />
        </div>
      </div>

      <div class="form-group">
        <label>Body Position: {{ activeExerciseData.bodyPosition }}</label>
      </div>

      <div class="form-group">
        <label>Eyes Activity: {{ activeExerciseData.eyesActivity }}</label>
      </div>

      <div class="form-group">
        <label>Exercise Mode: {{ activeExerciseData.mode }}</label>
      </div>

      <div class="form-group">
        <label>First Person Name: {{ getUserFullName }}</label>
        <br />
        <label>Break Points: {{ trainingData.personOne.breakPoints.join(", ") }}</label>
      </div>

      <div class="form-group" v-if="exerciseMode === 2">
        <label>
          Second Person Name:
          <input
            type="text"
            class="form-control text-input"
            v-model="trainingData.personTwo.name"
            :disabled="inputFieldDisable"
          />
        </label>
        <br />
        <label>Break Points: {{ trainingData.personTwo.breakPoints.join(", ") }}</label>
      </div>

      <div class="form-group mt-5">
        <button
          class="btn btn-sm btn-info mr-2"
          @click="startExercise"
          :disabled="buttonDisableState.start"
        >
          Start
        </button>
        <button
          class="btn btn-sm btn-info mr-2"
          @click="stopExercise"
          :disabled="buttonDisableState.stop"
        >
          Stop
        </button>
        <button class="btn btn-sm btn-info mr-2" @click="restartExercise">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import VueSlider from 'vue-slider-component';
import FromValidation from '@/mixins/FormValidation';

import { mapGetters } from 'vuex';

import 'vue-slider-component/theme/default.css';

import BeepSound from '@/assets/beep.mp3';

export default {
  components: {
    VueSlider,
  },
  mixins: [FromValidation],
  data() {
    return {
      traineeService: new TraineeService(),
      exerciseDetails: {},
      activeExerciseData: {},
      trainingData: {
        type: 'automatic',
        track: 0,
        eventCode: [],
        personOne: { name: '', breakPoints: [] },
        personTwo: { name: '', breakPoints: [] },
      },
      exerciseMode: 1,
      timer: null,
      buttonDisableState: {
        start: false,
        stop: true,
      },
      inputFieldDisable: false,
      checker: true,
      audio: null,
    };
  },
  async mounted() {
    try {
      this.audio = new Audio(BeepSound);

      const { details, ...activeExerciseData } = await this.traineeService.getExerciseData(
        this.$route.params.id,
      );
      this.exerciseDetails = details;
      this.activeExerciseData = activeExerciseData;

      this.exerciseMode = this.activeExerciseData.mode?.toLowerCase() === 'single' ? 1 : 2;
      this.trainingData.personOne.name = this.getUserFullName;
      this.trainingData.details = details;
      this.trainingData = { ...this.trainingData, ...activeExerciseData };

      if (this.exerciseMode === 1) {
        delete this.trainingData.personTwo;
      }
    } catch (error) {
      console.log(error);
    }
  },
  destroyed() {
    this.stopExercise();
    this.restartExercise();
  },
  methods: {
    startExercise() {
      if (this.exerciseMode === 2 && this.trainingData.personTwo.name === '') {
        this.showMessage({
          message: 'Please, fillup second person name',
        });
        return;
      }

      this.buttonDisableState.start = true;
      this.buttonDisableState.stop = false;
      this.inputFieldDisable = true;

      this.timer = setInterval(() => {
        if (this.trainingData.track < this.getDurationInMinisecond) {
          this.trainingData.track += 1;

          if (
            this.exerciseDetails.breakPoints.includes(this.getTrackInSecond)
          ) {
            console.log(this.exerciseDetails.breakPoints);
            this.audio.play();
            // eslint-disable-next-line no-unused-expressions
            this.trainingData?.personOne?.breakPoints?.push(this.getTrackInSecond);
            // eslint-disable-next-line no-unused-expressions
            this.trainingData?.personTwo?.breakPoints?.push(this.getTrackInSecond);
          }
        }

        if (this.trainingData.track === this.getDurationInMinisecond) {
          clearInterval(this.timer);
          this.buttonDisableState.start = false;
          this.buttonDisableState.stop = true;

          this.activitiesSubmit();
        }
      }, 1);
    },
    stopExercise() {
      clearInterval(this.timer);
      this.buttonDisableState.start = false;
      this.buttonDisableState.stop = true;
      this.inputFieldDisable = false;
    },
    restartExercise() {
      this.trainingData.track = 0;
      this.trainingData.personOne.breakPoints = [];
      this.trainingData.personTwo.breakPoints = [];
    },
    async activitiesSubmit() {
      try {
        if (!this.checker) {
          return;
        }

        this.checker = false;
        await this.traineeService.exercisePerformed(this.$route.params.id, this.trainingData);

        this.showMessage({
          success: true,
          message: 'Exercise successfully completed',
        });

        setTimeout(() => {
          this.$router.push({ name: 'ActiveExercise' });
        }, 3000);
      } catch (e) {
        this.showMessage({
          message: e?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    formatToolTipLabel(v) {
      return ((v ?? 0) / 1000).toFixed(2);
    },
  },
  computed: {
    getTrackInSecond() {
      return (this.trainingData.track / 1000).toFixed(2);
    },
    getDurationInMinisecond() {
      return (this.exerciseDetails?.duration ?? 0) * 1000;
    },
    ...mapGetters('user', ['getUserFullName']),
  },
};
</script>

<style>
.vue-slider-disabled {
  opacity: 1 !important;
}

.text-input {
  display: inline-block;
  width: auto;
}
</style>
