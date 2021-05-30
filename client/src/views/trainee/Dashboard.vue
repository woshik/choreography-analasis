<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Active Exercise</h4>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Training Name</th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Mode</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exercise, index) in exerciseData" :key="exercise.index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ exercise.trainingName }}</td>
              <td>{{ exercise.name }}</td>
              <td>{{ exercise.exercise.duration }} sec</td>
              <td>{{ exercise.mode }}</td>
              <td>
                <button type="button" class="btn btn-sm btn-primary" @click="startExercise(index)">
                  Start
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
  async mounted() {
    try {
      const response = await this.traineeService.getActiveExerciseList();
      this.exerciseData = [...response];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    startExercise(index) {
      this.$router.push({ name: 'traineeExercise', params: { id: this.exerciseData[index].index } });
    },
  },
};
</script>
