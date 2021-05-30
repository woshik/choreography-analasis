<template>
  <div>
    <div class="clearfix" />
    <div v-if="searchBoxShow" class="form-group mb-3">
      <input
        type="text"
        class="form-control float-right"
        style="width: 20%"
        placeholder="Search"
        v-model.trim="searchKeyWord"
        @input="inputValue"
      />
      <div class="clearfix" />
    </div>

    <div class="table-responsive">
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :css="css.table"
        :fields="fields"
        :data-manager="dataManager"
        :per-page="perPage"
        pagination-path="pagination"
        @vuetable:pagination-data="onPaginationData"
      >
        <template v-slot:actions="{ rowData }">
          <div class="table-button-container">
            <slot :rowData="rowData"></slot>
            <div v-if="actionButtonShow" style="display:inline-block">
              <button class="btn btn-warning btn-sm m-1" @click="actionButton('edit-row', rowData)">
                <font-awesome-icon icon="edit" /> Edit
              </button>
              <button
                class="btn btn-danger btn-sm m-1"
                @click="actionButton('delete-row', rowData)"
              >
                <font-awesome-icon icon="trash-alt" /> Delete
              </button>
            </div>
          </div>
        </template>
      </vuetable>
    </div>
    <div style="padding-top: 10px">
      <vuetable-pagination
        ref="pagination"
        class="float-right"
        @vuetable-pagination:change-page="onChangePage"
      />
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2';
import VuetablePagination from './VuetablePagination.vue';

export default {
  name: 'Table',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    totalRow: {
      type: Number,
      default: 0,
    },
    actionButtonShow: {
      type: Boolean,
      default: true,
    },
    searchBoxShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hover',
        },
      },
      perPage: 15,
      searchKeyWord: '',
      timer: null,
      apiCall: true,
    };
  },
  components: {
    Vuetable,
    VuetablePagination,
  },
  methods: {
    onChangePage(page) {
      this.apiCall = true;

      this.$refs.vuetable.changePage(page);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    actionButton(actionName, rowData) {
      this.$emit(actionName, rowData._id);
    },
    // eslint-disable-next-line consistent-return
    dataManager(_, pagination) {
      if (this.apiCall) {
        this.$emit('api-call', {
          search_keyword: this.searchKeyWord,
          current_page: pagination.current_page,
          per_page: pagination.per_page,
        });
      } else {
        const paginationData = this.$refs.vuetable.makePagination(this.totalRow, this.perPage);

        return {
          pagination: paginationData,
          data: this.tableData,
        };
      }
    },
    updateTable() {
      this.apiCall = false;
      this.$refs.vuetable.reload();
    },
    inputValue() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.apiCall = true;
        this.$refs.vuetable.refresh();
      }, 500);
    },
  },
};
</script>
