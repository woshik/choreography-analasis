<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <button class="btn btn-primary mb-3 float-right" @click="addExercise">
        Add Exercise
      </button>
      <vue-table
        ref="vuetable"
        :fields="tableFields"
        :table-data="tabeleData"
        :total-row="totalRow"
        @edit-row="editRow"
        @delete-row="deleteRow"
        @api-call="callToAPi"
      >
        <template v-slot:default="{ rowData }">
          <button class="btn btn-info btn-sm m-1" @click="assign(rowData)">
            <font-awesome-icon icon="sign-in-alt" /> Assign Automatic Exercise
          </button>
        </template>
      </vue-table>
    </div>
    <modal-window v-if="showModal" @open="handleModal">
      <template v-slot:title> Delete Exercise </template>
      You want to really delete this Exercise?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="deleteRow(null)">Delete</button>
      </template>
    </modal-window>
  </div>
</template>

<script>
import ExerciseService from '@/services/exercise.service';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';

export default {
  components: {
    VueTable,
    ModalWindow: () => import('@/components/Modal.vue'),
  },

  data() {
    return {
      index: 1,
      exerciseService: new ExerciseService(),
      tableFields: [
        { name: VuetableFieldSequence, title: 'No.' },
        { name: 'name', title: 'Exercise Name' },
        { name: 'duration', title: 'Exercise Duration' },
        { name: 'breakPoints', title: 'Break Points', formatter: (value) => `${value.join(', ')} sec` },
        { name: 'actions', title: 'Actions', width: '30%' },
      ],
      tabeleData: [],
      totalRow: 0,
      showModal: false,
      selectedId: '',
    };
  },
  methods: {
    async callToAPi(reqData) {
      try {
        const response = await this.exerciseService.get(reqData);
        this.tabeleData = response.data;
        this.totalRow = response.total;
        this.$nextTick(() => {
          this.$refs.vuetable.updateTable();
        });
      } catch (error) {
        console.log(error);
      }
    },
    addExercise() {
      this.$router.push({ name: 'AddExercise' });
    },
    editRow(id) {
      this.$router.push({ name: 'EditExercise', params: { id } });
    },
    async deleteRow(id) {
      if (id) {
        this.selectedId = id;
        this.handleModal(true);
        return;
      }

      try {
        await this.exerciseService.delete({ id: this.selectedId });
        this.callToAPi();
        this.handleModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    assign(data) {
      this.$router.push({ name: 'AutomaticExercise', params: { id: data._id } });
    },
    handleModal(open) {
      this.showModal = open;
    },
  },
};
</script>
