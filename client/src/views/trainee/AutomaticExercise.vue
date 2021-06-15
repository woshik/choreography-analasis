<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <div v-if="!report">
        <h4 class="tittle-w3-agileits mb-4">
          Perform Automatic Exercise: {{ exerciseDetails.name }}
        </h4>

        <div class="form-group">
          <label>Person Name: {{ getUserFullName }}</label>
          <br />
          <label>Timer: {{ getTrackInSecond }} sec</label>
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
          <button
            class="btn btn-sm btn-info mr-2"
            @click="exerciseFinish"
            :disabled="buttonDisableState.finish"
          >
            Finish
          </button>
        </div>
      </div>
      <div v-else>
        <h4 class="tittle-w3-agileits mb-4">{{ exerciseDetails.name }} Exercise Report</h4>
        <div class="form-group">
          <label>Person Name: {{ getUserFullName }}</label>
          <br />
          <label>Break Points: {{ trainingData.personOne.breakPoints.join(", ") }}</label>
          <br />
          <label>Time Conflict: {{ timeConflictResult }}</label>
        </div>
        <div class="form-group mt-5">
          <button
            class="btn btn-sm btn-info mr-2"
            @click="backToDashBoard"
          >
            Back To Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import FromValidation from '@/mixins/FormValidation';
import { mapGetters } from 'vuex';
import BeepSound from '@/assets/beep.mp3';

export default {
  mixins: [FromValidation],
  data() {
    return {
      traineeService: new TraineeService(),
      exerciseDetails: {},
      trainingData: {
        track: 0,
        personOne: { name: '', breakPoints: [] },
      },
      timer: null,
      buttonDisableState: {
        start: false,
        stop: true,
        finish: true,
      },
      audio: null,
      report: false,
    };
  },
  async mounted() {
    try {
      this.audio = new Audio(BeepSound);

      const response = await this.traineeService.getAutomaticExercise(this.$route.params.id);
      this.exerciseDetails = response;
      this.trainingData.personOne.name = this.getUserFullName;
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
      this.buttonDisableState.finish = false;

      this.timer = setInterval(() => {
        this.trainingData.track += 1;

        if (this.exerciseDetails.breakPoints.includes(this.trainingData.track / 1000)) {
          this.audio.play();
          // eslint-disable-next-line no-unused-expressions
          this.trainingData?.personOne?.breakPoints?.push(this.getTrackInSecond);
        }
      }, 1);
    },
    stopExercise() {
      clearInterval(this.timer);
      this.buttonDisableState.start = false;
      this.buttonDisableState.stop = true;
      this.buttonDisableState.finish = true;
    },
    restartExercise() {
      this.stopExercise();
      this.trainingData.track = 0;
      this.trainingData.personOne.breakPoints = [];
    },
    formatToolTipLabel(v) {
      return ((v ?? 0) / 1000).toFixed(2);
    },
    exerciseFinish() {
      this.stopExercise();
      this.report = true;
    },
    backToDashBoard() {
      this.$router.push({ name: 'Dashboard' });
    },
  },
  computed: {
    getTrackInSecond() {
      return Number((this.trainingData.track / 1000).toFixed(2));
    },
    getDurationInMinisecond() {
      return (this.exerciseDetails?.duration ?? 0) * 1000;
    },
    timeConflict() {
      return this.trainingData.track - this.getDurationInMinisecond;
    },
    timeConflictResult() {
      // eslint-disable-next-line no-nested-ternary
      return this.timeConflict < 0
        ? `Stop before ${(Math.abs(this.timeConflict) / 1000).toFixed(2)} sec`
        : this.timeConflict === 0
        ? 'Stop at 0 sec'
        : `Stop after ${(Math.abs(this.timeConflict) / 1000).toFixed(2)} sec`;
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
