<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Assign Automatic Exercise</h4>
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
          <label for="courseName">Select User</label>
          <VSelect
            multiple
            :options="traineeData"
            :filterable="false"
            v-model="selectedValue"
            @search="fetchTraineeData"
          >
            <template slot="no-options">
              type to search user...
            </template>
          </VSelect>
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
      traineeData: [],
      selectedValue: [],
      traineeService: new TraineeService(),
      exerciseService: new ExerciseService(),
      timer: null,
    };
  },
  async mounted() {
    try {
      const response = await this.exerciseService.getAutomaticExercise(this.$route.params.id);
      const result = [...response];
      this.selectedValue = result?.map((trainee) => ({
        _id: trainee._id,
        label: `${trainee.fullName} (${trainee.username})`,
        username: trainee.username,
      }));
    } catch (error) {
      this.selectedValue = [];
    }
  },
  methods: {
    fetchTraineeData(search, loading) {
      if (!search) {
        return;
      }

      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        try {
          loading(true);
          const response = await this.traineeService.get({ perPage: 5, search_keyword: search });
          this.traineeData = response.data.map((item) => ({
            _id: item._id,
            label: `${item.fullName} (${item.username})`,
            username: item.username,
          })) ?? [];
          loading(false);
        } catch (error) {
          this.traineeData = [];
          loading(false);
        }
      }, 500);
    },
    async submitForm() {
      try {
        const ids = this.selectedValue.map((i) => i._id);
        await this.exerciseService.assignAutomaticExercise(this.$route.params.id, { ids });
        this.showMessage({
          success: true,
          message: 'Students Successfully Assigned',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
      console.log(this.selectedValue);
    },
  },
};
</script>
