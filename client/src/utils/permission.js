import NProgress from 'nprogress';
import UserModule from '@/store/modules/user.module';
import router from '@/router';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/login/trainee', '/registration'];

// before enter every route
router.beforeEach((to, _, next) => {
  NProgress.start();
  if (UserModule.state.token) {
    if (whiteList.includes(to.path)) {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next({ name: 'TrainerLogin' });
  }
});

// after finish every route
router.afterEach((to) => {
  document.title = to.meta.title;
  NProgress.done();
});
