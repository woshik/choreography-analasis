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
            :max="exerciseDetails.duration"
            :tooltip="'always'"
            :process="false"
            disabled
          />
        </div>
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
        track: 0,
        keyboardCode: [],
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
    };
  },
  async mounted() {
    try {
      const { details, ...activeExerciseData } = await this.traineeService.getExerciseData(
        this.$route.params.id,
      );
      this.exerciseDetails = details;
      this.activeExerciseData = activeExerciseData;

      this.exerciseMode = this.activeExerciseData.mode === 'single' ? 1 : 2;
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
      this.buttonDisableState.start = true;
      this.buttonDisableState.stop = false;
      this.inputFieldDisable = true;

      this.timer = setInterval(() => {
        if (this.trainingData.track < this.exerciseDetails.duration) {
          this.trainingData.track += 1;
        }

        if (this.trainingData.track === this.exerciseDetails.duration) {
          console.log(this.trainingData.track === this.exerciseDetails.duration);
          setTimeout(() => {
            clearInterval(this.timer);
            this.buttonDisableState.start = false;
            this.buttonDisableState.stop = true;
            document.removeEventListener('keyup', this.keyBoardEvent);

            this.activitiesSubmit();
          }, 1000);
        }
      }, 1000);

      document.addEventListener('keyup', this.keyBoardEvent);
    },
    stopExercise() {
      clearInterval(this.timer);
      this.buttonDisableState.start = false;
      this.buttonDisableState.stop = true;
      this.inputFieldDisable = false;

      document.removeEventListener('keyup', this.keyBoardEvent);
    },
    restartExercise() {
      this.trainingData.track = 0;
      this.trainingData.personOne.breakPoints = [];
      this.trainingData.personTwo.breakPoints = [];
    },
    keyBoardEvent(e) {
      if (this.trainingData.personOne && e.code === 'Enter') {
        this.trainingData.personOne.breakPoints.push(this.trainingData.track);
      }

      if (this.trainingData.personTwo && e.code === 'Space') {
        this.trainingData.personTwo.breakPoints.push(this.trainingData.track);
      }

      this.trainingData.keyboardCode.push(e.code);
    },
    async activitiesSubmit() {
      try {
        await this.traineeService.exercisePerformed(this.$route.params.id, this.trainingData);

        this.showMessage({
          success: true,
          message: 'Exercise successfully completed',
        });

        setTimeout(() => {
          this.$router.push({ name: 'Dashboard' });
        }, 3000);
      } catch (e) {
        this.showMessage({
          message: e?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
  computed: {
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
