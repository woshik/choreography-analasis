<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Assign Exercise</h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="courseName">Select Exercise</label>
          <VSelect
            :options="exerciseData"
            :filterable="false"
            v-model="selectedValue"
            @search="fetchExerciseData"
          >
            <template slot="no-options">
              type to search user...
            </template>
          </VSelect>
        </div>
         <div class="form-group">
          <label for="trainingName">Training Name/Serial</label>
          <input
            type="text"
            class="form-control"
            id="trainingName"
            placeholder="Training Name/Serial"
            autocomplete="off"
            v-model.trim="trainingName"
          />
        </div>
        <div class="d-block my-3">
          <label>Select Exercise Mode</label>
          <div class="custom-control custom-radio">
            <input
              id="single"
              name="mode"
              type="radio"
              class="custom-control-input"
              v-model="exerciseMode"
              value="single"
            />
            <label class="custom-control-label" for="single">Single</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              id="debit"
              name="mode"
              type="radio"
              class="custom-control-input"
              v-model="exerciseMode"
              value="double"
            />
            <label class="custom-control-label" for="debit">Double</label>
          </div>
        </div>
        <button class="btn btn-primary">Assign</button>
      </form>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import ExerciseService from '@/services/exercise.service';
import FromValidation from '@/mixins/FormValidation';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CourseAssign',
  mixins: [FromValidation],
  components: {
    VSelect: () => import('vue-select'),
  },
  data() {
    return {
      exerciseData: [],
      selectedValue: {},
      traineeService: new TraineeService(),
      exerciseService: new ExerciseService(),
      exerciseMode: '',
      trainingName: '',
      timer: null,
    };
  },
  methods: {
    fetchExerciseData(search, loading) {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        try {
          loading(true);
          const response = await this.exerciseService.get({ perPage: 5, search_keyword: search });
          this.exerciseData = response.data.map((item) => ({
            _id: item._id,
            label: item.name,
          })) ?? [];
          loading(false);
        } catch (error) {
          this.exerciseData = [];
          loading(false);
        }
      }, 500);
    },
    async submitForm() {
      try {
        await this.traineeService.assignExercise(this.$route.params.id, {
          exerciseId: this.selectedValue._id,
          name: this.selectedValue.label,
          trainingName: this.trainingName,
          mode: this.exerciseMode,
        });
        this.showMessage({
          success: true,
          message: 'Exercise Successfully Assigned',
        });

        this.exerciseMode = '';
        this.selectedValue = {};
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
  },
};
</script>
