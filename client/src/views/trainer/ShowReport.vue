<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Perform Exercise: {{ reportData.trainingName }}</h4>

      <div class="form-group">
        <label for="courseCode">Exercise Time Slot</label>
        <div class="mt-5">
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

      <div class="form-group mt-5">
        <label>First Person: {{ getDataFromObject(reportData, 'personOne.name') }}</label>
        <br />
        <br />
        <label for="courseCode">Training Time Slot</label>
        <div class="mt-5">
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

      <div class="form-group mt-5" v-if="reportData.mode === 'double'">
        <label>Second Person: {{ getDataFromObject(reportData, 'personTwo.name') }}</label>
        <br />
        <br />
        <label for="courseCode">Training Time Slot</label>
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
</template>

<script>
import TraineeService from '@/services/trainee.service';
import VueSlider from 'vue-slider-component';
import common from '@/mixins/common';

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
