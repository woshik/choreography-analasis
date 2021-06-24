<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Manual Exercise List</h4>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Training Name</th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Mode</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exercise, index) in exerciseData" :key="exercise.index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ exercise.trainingName }}</td>
              <td>{{ exercise.name }}</td>
              <td>{{ exercise.mode }}</td>
              <td v-if="enableAction">
                <button type="button" class="btn btn-sm btn-primary" @click="manualExercise(index)">
                  Start Exercise
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';

export default {
  data() {
    return {
      traineeService: new TraineeService(),
      exerciseData: [],
    };
  },
  props: {
    enableAction: {
      type: Boolean,
      default: true,
    },
  },
  async mounted() {
    try {
      const response = await this.traineeService.getActiveExerciseList();
      this.exerciseData = [...response];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    manualExercise(index) {
      this.$router.push({ name: 'ManualExercise', params: { id: this.exerciseData[index].index } });
    },
    automaticExercise(index) {
      this.$router.push({
        name: 'AutomaticExercise',
        params: { id: this.exerciseData[index].index },
      });
    },
  },
};
</script>
