<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">
        Perform Automatic Exercise: {{ exerciseDetails.name }}
      </h4>

      <div class="form-group">
        <label>Person Name: {{ getUserFullName }}</label>
      </div>

      <label> Exercise Performed: {{ exerciseDetails.count }} Time</label>
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
      <audio :src="BeepSound" ref="playAudio"></audio>
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
      },
      report: false,
      BeepSound,
    };
  },
  async mounted() {
    try {
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
      this.$refs.playAudio.play();
      this.buttonDisableState.start = true;
      this.buttonDisableState.stop = false;

      this.timer = setInterval(() => {
        this.trainingData.track += 1;

        if (this.exerciseDetails.breakPoints.includes(this.trainingData.track)) {
          this.$refs.playAudio.play();
        }

        if (this.exerciseDetails.duration === this.trainingData.track) {
          this.automaticExerciseCount();
        }
      }, 1000);
    },
    stopExercise() {
      clearInterval(this.timer);
      this.buttonDisableState.start = false;
      this.buttonDisableState.stop = true;
    },
    restartExercise() {
      this.stopExercise();
      this.trainingData.track = 0;
      this.trainingData.personOne.breakPoints = [];
    },
    backToDashBoard() {
      this.$router.push({ name: 'Dashboard' });
    },
    async automaticExerciseCount() {
      this.stopExercise();
      this.$refs.playAudio.play();
      try {
        await this.traineeService.automaticExerciseCount(this.$route.params.id);
        this.exerciseDetails.count += 1;
        this.restartExercise();
      } catch (error) {
        console.log(error);
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
