<template>
  <div>
    <div
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="display:block"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><slot name="title">Modal title</slot></h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hangleModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    hangleModal() {
      this.$emit('open', false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
