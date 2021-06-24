<template>
  <div>
    <div class="row">
      <button class="btn btn-primary btn-sm" @click="goBack">
        <font-awesome-icon icon="long-arrow-alt-left" /> Back
      </button>
    </div>
    <div class="row">
      <div class="outer-w3-agile col-xl mt-3">
        <h4 class="tittle-w3-agileits mb-4">Perform Exercise: {{ reportData.trainingName }}</h4>

        <div class="form-group">
          <label>Body Position: {{ reportData.bodyPosition }}</label>
        </div>

        <div class="form-group">
          <label>Eyes Activity: {{ reportData.eyesActivity }}</label>
        </div>

        <div class="form-group">
          <label>Exercise Mode: {{ reportData.mode }}</label>
        </div>

        <div class="form-group">
          <label>Exercise Date Time: {{ getExerciseTime }}</label>
        </div>

        <div class="form-group">
          <label for="courseCode">Exercise Time Slot: </label>
          <div class="mt-5 mb-5">
            <vue-slider
              :value="getDataFromObject(reportData, 'details.breakPoints')"
              :min="0"
              :max="getDataFromObject(reportData, 'details.duration', 0)"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>

        <hr />

        <div class="form-group mt-5">
          <label>First Person: {{ getDataFromObject(reportData, "personOne.name") }}</label>
          <br />
          <label>Click Difference: {{ getFirstPersonDifference }}</label>
          <br />
          <br />
          <label for="courseCode">Training Time Slot: </label>
          <div class="mt-5 mb-5">
            <vue-slider
              :value="getDataFromObject(reportData, 'personOne.breakPoints')"
              :min="0"
              :max="getDataFromObject(reportData, 'details.duration', 0)"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>

        <hr />

        <div class="form-group mt-5" v-if="reportData.mode === 'Double'">
          <label>Second Person: {{ getDataFromObject(reportData, "personTwo.name") }}</label>
          <br />
          <label>Click Difference: {{ getFirstPersonDifference }}</label>
          <br />
          <br />
          <label for="courseCode">Training Time Slot: </label>
          <div class="mt-5">
            <vue-slider
              :value="getDataFromObject(reportData, 'personTwo.breakPoints')"
              :min="0"
              :max="getDataFromObject(reportData, 'details.duration', 0)"
              :tooltip="'always'"
              :process="false"
              :marks="true"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import VueSlider from 'vue-slider-component';
import common from '@/mixins/common';
import moment from 'moment';
import 'vue-slider-component/theme/default.css';

export default {
  components: {
    VueSlider,
  },
  mixins: [common],
  data() {
    return {
      traineeService: new TraineeService(),
      reportData: {},
    };
  },
  async mounted() {
    try {
      const response = await this.traineeService.getExerciseReport(
        this.$route.params.traineeId,
        this.$route.params.exerciseId,
      );

      this.reportData = response;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
  },
  computed: {
    getExerciseTime() {
      return moment(this.reportData?.create_at ?? '')?.format('MMMM DD, YYYY [at] h:mm:ss A');
    },
    getFirstPersonDifference() {
      return this.reportData?.details?.breakPoints
        ?.map((point, index) => (this.reportData.personOne.breakPoints[index]
            ? (this.reportData.personOne.breakPoints[index] - point).toFixed(2)
            : 'Empty'))
        .join(', ');
    },
    getSecondPersonDifference() {
      return this.reportData?.details?.breakPoints
        ?.map((point, index) => (this.reportData.personTwo.breakPoints[index]
            ? (this.reportData.personTwo.breakPoints[index] - point).toFixed(2)
            : 'Empty'))
        .join(', ');
    },
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
