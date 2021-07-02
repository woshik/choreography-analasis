<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <div v-if="!report">
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
            class="btn btn-sm btn-info mr-2 js-not-click"
            @click="startExercise"
            :disabled="buttonDisableState.start"
          >
            Start
          </button>
          <button
            class="btn btn-sm btn-info mr-2 js-not-click"
            @click="stopExercise"
            :disabled="buttonDisableState.stop"
          >
            Stop
          </button>
          <button class="btn btn-sm btn-info mr-2 js-not-click" @click="restartExercise">
            Reset
          </button>
        </div>
      </div>
      <div v-else>
        <h4 class="tittle-w3-agileits mb-4">Perform Exercise: {{ trainingData.trainingName }}</h4>

        <div class="form-group">
          <label>Body Position: {{ trainingData.bodyPosition }}</label>
        </div>

        <div class="form-group">
          <label>Eyes Activity: {{ trainingData.eyesActivity }}</label>
        </div>

        <div class="form-group">
          <label>Exercise Mode: {{ trainingData.mode }}</label>
        </div>

        <div class="form-group">
          <label>Exercise Date Time: {{ getExerciseTime }}</label>
        </div>

        <div class="form-group">
          <label for="courseCode">Exercise Time Slot: </label>
          <div class="mt-5 mb-5">
            <vue-slider
              :value="trainingData.details.breakPoints"
              :min="0"
              :max="trainingData.details.duration"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>

        <hr />

        <div class="form-group mt-5">
          <label>First Person: {{ trainingData.personOne.name }}</label>
          <br />
          <label>Click Difference: {{ getFirstPersonDifference }}</label>
          <br />
          <br />
          <label for="courseCode">Training Time Slot: </label>
          <div class="mt-5 mb-5">
            <vue-slider
              :value="trainingData.personOne.breakPoints"
              :min="0"
              :max="trainingData.details.duration"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>

        <hr />

        <div class="form-group mt-5" v-if="trainingData.mode === 'Double'">
          <label>Second Person: {{ trainingData.personTwo.name }}</label>
          <br />
          <label>Click Difference: {{ getSecondPersonDifference }}</label>
          <br />
          <br />
          <label for="courseCode">Training Time Slot: </label>
          <div class="mt-5">
            <vue-slider
              :value="trainingData.personTwo.breakPoints"
              :min="0"
              :max="trainingData.details.duration"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>
        <br />
        <br />
        <button class="btn btn-primary btn-sm" @click="goToDashboard">Back To Dashboard</button>
      </div>
    </div>
    <audio :src="BeepSound" ref="playAudio"></audio>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import VueSlider from 'vue-slider-component';
import FromValidation from '@/mixins/FormValidation';
import { mapGetters } from 'vuex';
import moment from 'moment';
import BeepSound from '@/assets/beep.mp3';
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
        type: 'manual',
        track: 0,
        personOne: { name: '', breakPoints: [], clickCount: 0 },
        personTwo: { name: '', breakPoints: [], clickCount: 0 },
        create_at: null,
      },
      exerciseMode: 1,
      timer: null,
      buttonDisableState: {
        start: false,
        stop: true,
      },
      inputFieldDisable: false,
      startTime: null,
      report: false,
      BeepSound,
    };
  },
  async mounted() {
    try {
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

      this.$refs.playAudio.play();
      this.startTime = new Date().getTime();
      this.buttonDisableState.start = true;
      this.buttonDisableState.stop = false;
      this.inputFieldDisable = true;

      this.timer = setInterval(() => {
        if (this.trainingData.track < this.exerciseDetails.duration) {
          this.trainingData.track += 1;
        }

        if (this.trainingData.track === this.exerciseDetails.duration) {
          this.stopExercise();
          this.$refs.playAudio.play();
          this.activitiesSubmit();

          this.buttonDisableState.start = true;
          this.buttonDisableState.stop = true;
          this.inputFieldDisable = true;
        }
      }, 1000);

      document.addEventListener('keyup', this.clickEvent);
      document.addEventListener('mouseup', this.clickEvent);
    },
    stopExercise() {
      clearInterval(this.timer);
      this.buttonDisableState.start = false;
      this.buttonDisableState.stop = true;
      this.inputFieldDisable = false;

      document.removeEventListener('keyup', this.clickEvent);
      document.removeEventListener('mouseup', this.clickEvent);
    },
    restartExercise() {
      this.startTime = null;
      this.trainingData.track = 0;
      this.trainingData.personOne.clickCount = 0;
      this.trainingData.personOne.breakPoints = [];
      this.trainingData.personTwo.clickCount = 0;
      this.trainingData.personTwo.breakPoints = [];
    },
    clickEvent(e) {
      if (e.target.classList.contains('js-not-click')) {
        return;
      }

      if (
        this.trainingData.personOne
        && this.trainingData.personOne.clickCount < this.exerciseDetails.breakPoints.length
        && e.type === 'mouseup'
      ) {
        const getCurrentTimer = ((new Date().getTime() - this.startTime) / 1000).toFixed(2);
        this.trainingData.personOne.clickCount += 1;
        this.trainingData.personOne.breakPoints.push(getCurrentTimer);
      }

      if (
        this.trainingData.personTwo
        && this.trainingData.personTwo.clickCount < this.exerciseDetails.breakPoints.length
        && e.code === 'Space'
      ) {
        const getCurrentTimer = ((new Date().getTime() - this.startTime) / 1000).toFixed(2);
        this.trainingData.personTwo.clickCount += 1;
        this.trainingData.personTwo.breakPoints.push(getCurrentTimer);
      }
    },
    async activitiesSubmit() {
      try {
        this.trainingData.create_at = new Date();
        await this.traineeService.exercisePerformed(this.$route.params.id, this.trainingData);

        this.showMessage({
          success: true,
          message: 'Exercise successfully completed',
        });

        this.report = true;
      } catch (e) {
        this.showMessage({
          message: e?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    goToDashboard() {
      this.$router.push({ name: 'Dashboard' });
    },
  },
  computed: {
    getExerciseTime() {
      return moment(this.trainingData?.create_at ?? '')?.format('MMMM DD, YYYY [at] h:mm:ss A');
    },
    getFirstPersonDifference() {
      return this.trainingData.details.breakPoints
        .map((point, index) => (this.trainingData.personOne.breakPoints[index]
            ? (this.trainingData.personOne.breakPoints[index] - point).toFixed(2)
            : 'Empty'))
        .join(', ');
    },
    getSecondPersonDifference() {
      return this.trainingData.details.breakPoints
        .map((point, index) => (this.trainingData.personTwo.breakPoints[index]
            ? (this.trainingData.personTwo.breakPoints[index] - point).toFixed(2)
            : 'Empty'))
        .join(', ');
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
