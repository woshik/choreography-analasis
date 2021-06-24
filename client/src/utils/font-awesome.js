import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faTachometerAlt,
  faUser,
  faWalking,
  faEdit,
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faAddressBook,
  faCalendarAlt,
  faBookOpen,
  faWrench,
  faRedo,
  faClock,
  faTimes,
  faCheck,
  faCopy,
  faSignInAlt,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faBars,
  faTachometerAlt,
  faUser,
  faWalking,
  faEdit,
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faAddressBook,
  faCalendarAlt,
  faBookOpen,
  faWrench,
  faRedo,
  faClock,
  faTimes,
  faCheck,
  faCopy,
  faSignInAlt,
  faLongArrowAltLeft,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
