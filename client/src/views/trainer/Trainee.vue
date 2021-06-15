<template>
  <div class="row">
    <div class="outer-w3-agile col-xl mt-3">
      <div
        v-if="messageDisplay"
        class="alert"
        :class="[isSuccessful ? 'alert-success' : 'alert-danger']"
        role="alert"
      >
        {{ messageDisplay }}
      </div>
      <button class="btn btn-primary mb-3 float-right" @click="addTrainee">
        Add Trainee
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
          <button class="btn btn-success btn-sm m-1" @click="assignExercise(rowData)">
            <font-awesome-icon icon="sign-in-alt" /> Assign Manual Exercise
          </button>
          <button class="btn btn-info btn-sm m-1" @click="resetPassword(rowData)">
            <font-awesome-icon icon="redo" /> Reset Password
          </button>
        </template>
      </vue-table>
    </div>

    <modal-window v-if="showModal.deleteModal" @open="handleModal">
      <template v-slot:title> Delete Trainee </template>
      Do you want to really delete this trainee?
      <template v-slot:footer>
        <button class="btn btn-danger" @click="deleteRow(null)">Delete</button>
      </template>
    </modal-window>

    <modal-window v-if="showModal.resetModal" @open="handleModal">
      <template v-slot:title> Reset Acount Password </template>
      Do you want to really change account passwrd?<br />
      Reset password will be: 123456
      <template v-slot:footer>
        <button class="btn btn-danger" @click="resetPassword(null)">Change</button>
      </template>
    </modal-window>
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
    ModalWindow: () => import('@/components/Modal.vue'),
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
            console.log(value);
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
    addTrainee() {
      this.$router.push({ name: 'AddTrainee' });
    },
    editRow(id) {
      this.$router.push({ name: 'EditTrainee', params: { id } });
    },
    async deleteRow(id) {
      if (id) {
        this.selectedId = id;
        this.handleModal(true, 'deleteModal');
        return;
      }

      try {
        await this.traineeService.delete({ id: this.selectedId });
        this.callToAPi();
        this.handleModal(false, 'deleteModal');
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },

    async resetPassword(traineeData) {
      if (traineeData) {
        this.selectedId = traineeData._id;
        this.handleModal(true, 'resetModal');
        return;
      }

      try {
        await this.traineeService.resetPassword({ id: this.selectedId });
        this.handleModal(false, 'resetModal');
        this.showMessage({
          success: true,
          message: 'Password Successfully Reset. New Password: 123456',
        });
      } catch (error) {
        this.showMessage({
          message: error?.response?.data?.message ?? 'Something Wrong!!!',
        });
      }
    },
    handleModal(open, modalName) {
      if (modalName) {
        this.showModal[modalName] = open;
      } else {
        this.showModal.deleteModal = open;
        this.showModal.resetModal = open;
      }
    },

    assignExercise(traineeData) {
      this.$router.push({ name: 'AssignExercise', params: { id: traineeData._id } });
    },
  },
};
</script>
