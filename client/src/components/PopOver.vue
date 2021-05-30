<template>
  <span
    class="popuptext"
    :class="[show ? 'show' : 'hide']"
    :style="{ top: `${positionTop}px`, left: `${positionLeft}px` }"
  >
    <font-awesome-icon icon="times" @click="close" />
    <slot />
  </span>
</template>

<script>
export default {
  name: 'popover',
  model: {
    prop: 'show',
    event: 'close',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    positionLeft: {
      type: Number,
      defatul: 0,
    },
    positionTop: {
      type: Number,
      defatul: 0,
    },
  },
  methods: {
    close() {
      this.$emit('close', false);
    },
  },
};
</script>

<style scoped>
.popuptext {
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  transform: translate(-50%, -100%);
}

.popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

.hide {
  visibility: hidden;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

svg {
  position: absolute;
  right: 8px;
  top: 4px;
  font-size: 12px;
}
</style>
