<template>
 <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">Automatic Exercise List</h4>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Exercise Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Exercise Performed</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exercise, index) in exerciseData" :key="exercise.index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ exercise.name }}</td>
              <td>{{ exercise.duration }} sec</td>
              <td>{{ exercise.count || 0 }}</td>
              <td v-if="enableAction">
                <button
                  type="button"
                  class="btn btn-sm btn-primary mr-2"
                  @click="automaticExercise(index)"
                >
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
      const response = await this.traineeService.getAutomaticExerciseList();
      this.exerciseData = [...response];
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    automaticExercise(index) {
      this.$router.push({
        name: 'StartAutomaticExercise',
        params: { id: this.exerciseData[index]._id },
      });
    },
  },
};
</script>
