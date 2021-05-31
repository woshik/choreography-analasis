<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <vue-table
        ref="vuetable"
        :fields="tableFields"
        :table-data="tabeleData"
        :total-row="totalRow"
        :action-button-show="false"
        @api-call="callToAPi"
      >
        <template v-slot:default="{ rowData }">
          <button class="btn btn-success btn-sm m-1" @click="showReport(rowData)">
            <font-awesome-icon icon="copy" /> Report
          </button>
        </template>
      </vue-table>
    </div>
  </div>
</template>

<script>
import TraineeService from '@/services/trainee.service';
import FromValidation from '@/mixins/FormValidation';
import VueTable from '@/components/Table.vue';
import VuetableFieldSequence from 'vuetable-2/src/components/VuetableFieldSequence.vue';

export default {
  mixins: [FromValidation],
  components: {
    VueTable,
  },

  data() {
    return {
      index: 1,
      traineeService: new TraineeService(),
      tableFields: [
        { name: VuetableFieldSequence, title: 'No.' },
        { name: 'fullName', title: 'Full Name' },
        {
          name: 'dob',
          title: 'Date of Birth',
          formatter(value) {
            const d = new Date(value);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
          },
        },
        { name: 'username', title: 'Username' },
        {
          name: 'actions',
          title: 'Actions',
        },
      ],
      tabeleData: [],
      totalRow: 0,
      showModal: {
        deleteModal: false,
        resetModal: false,
      },
      selectedId: '',
    };
  },
  methods: {
    async callToAPi(reqData) {
      try {
        const response = await this.traineeService.get(reqData);
        this.tabeleData = response.data;
        this.totalRow = response.total;
        this.$nextTick(() => {
          this.$refs.vuetable.updateTable();
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },

    showReport({ _id }) {
      this.$router.push({ name: 'ExerciseList', params: { traineeId: _id } });
    },
  },
};
</script>
