<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Complete Exercise</h4>
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
              <td>{{ exercise.details.duration }} sec</td>
              <td>{{ exercise.mode }}</td>
              <td>
                <button type="button" class="btn btn-sm btn-info" @click="showExercise(index)">
                  Show
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
      const {
        complete_exercise: completeExercise,
      } = await this.traineeService.getCompleteExerciseList(this.$route.params.traineeId);

      this.exerciseData = [...completeExercise];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    showExercise(index) {
      this.$router.push({
        name: 'ShowReport',
        params: {
          traineeId: this.$route.params.traineeId,
          exerciseId: this.exerciseData[index].index,
        },
      });
    },
  },
};
</script>
