<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <h4 class="tittle-w3-agileits mb-4">{{ formLabel }} Exercise</h4>
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="name">Exercise Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Exercise Name"
            autocomplete="off"
            v-model.trim="name"
          />
        </div>

        <div class="form-group">
          <label for="duration">Exercise Duration (In Seconds)</label>
          <input
            type="text"
            class="form-control"
            id="duration"
            placeholder="Exercise Duration"
            autocomplete="off"
            v-model.number="duration"
            @input="clearBreakPoints"
          />
        </div>

        <div class="form-group" v-if="duration">
          <label for="courseCode">Time Slot</label>
          <vue-slider
            v-model="breakPoints"
            :min="0"
            :max="duration"
            :interval="1"
            :process="false"
          />
          <button type="button" class="btn btn-primary btn-sm mt-4" @click="addBreakPoint">
            Add Breakpoint
          </button>
          <button type="button" class="btn btn-primary btn-sm mt-4 ml-2" @click="clearBreakPoints">
            Clear All Breakpoint
          </button>
        </div>

        <div class="form-group">
          <label for="description">Exercise Description (Optional)</label>
          <textarea
            class="form-control"
            id="description"
            placeholder="Exercise Description"
            autocomplete="off"
            v-model.trim="description"
          />
        </div>

        <button type="submit" class="btn btn-primary">{{ formLabel }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import ExerciseService from '@/services/exercise.service';
import FromValidation from '@/mixins/FormValidation';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'exerciseForm',
  components: {
    VueSlider,
  },
  mixins: [FromValidation],
  data() {
    return {
      name: '',
      duration: 0,
      breakPoints: [],
      description: '',
      exerciseService: new ExerciseService(),
    };
  },
  formFields: ['name', 'duration', 'breakPoints', 'description'],
  async mounted() {
    if (this.$route.params.id) {
      const { data } = await this.exerciseService.getById(this.$route.params.id);
      if (data.length) {
        const exercise = data[0];
        this.name = exercise.name;
        this.duration = exercise.duration;
        this.breakPoints = exercise.breakPoints;
        this.description = exercise.description;
      }
    }
  },
  methods: {
    async submit() {
      try {
        if (typeof this.breakPoints === 'number') {
          this.breakPoints = [this.breakPoints];
        }
        console.log(this.breakPoints);
        if (this.$route.params.id) {
          await this.exerciseService.update(this.$route.params.id, this.formData);
          this.$router.push({ name: 'Exercise' });
        } else {
          await this.exerciseService.add(this.formData);
          this.resetAll();
          this.showMessage({
            success: true,
            message: 'Exercise successfully added.',
          });
        }
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    addBreakPoint() {
      if (typeof this.breakPoints === 'number') {
        this.breakPoints = [this.breakPoints];
      }
      this.breakPoints.push(0);
    },
    clearBreakPoints() {
      this.breakPoints = [];
    },
  },
  computed: {
    formLabel() {
      return this.$route.params.id ? 'Edit' : 'Add';
    },
  },
};
</script>
