import './styles/styles.scss';

import {
  chatsPage,
  error404,
  error500,
  navigation,
  updatePasswordPage,
  profilePage,
  profileEditPage,
  signInPage,
  signUpPage,
} from './pages';
import Router from "./core/Routing/Router";
import {BaseLayout} from "./layout/base-layout";

export enum Paths {
  NAV = '/',
  CHATS = '/messenger',
  ERROR404 = '/404',
  ERROR500 = '/500',
  PASSWORD_UPDATE = '/password-update',
  PROFILE = '/profile',
  PROFILE_EDIT = '/settings',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
}
window.addEventListener('DOMContentLoaded', async () => {
  Router
      .use(Paths.NAV, BaseLayout, {page: navigation})
      .use(Paths.CHATS, BaseLayout, {page: chatsPage})
      .use(Paths.ERROR404, BaseLayout, {page: error404})
      .use(Paths.ERROR500, BaseLayout, {page: error500})
      .use(Paths.PASSWORD_UPDATE, BaseLayout, {page: updatePasswordPage})
      .use(Paths.PROFILE, BaseLayout, {page: profilePage})
      .use(Paths.PROFILE_EDIT, BaseLayout, {page: profileEditPage})
      .use(Paths.SIGN_IN, BaseLayout, {page: signInPage})
      .use(Paths.SIGN_UP, BaseLayout, {page: signUpPage})
      .start()
  // let isProtectedRoute = true;
  //
  // switch (window.location.pathname) {
  //   case Paths.NAV:
  //   case Paths.SIGN_UP:
  //     isProtectedRoute = false;
  //     break;
  // }
  //
  // try {
  //   await AuthController.fetchUser();
  //
  //   Router.start();
  //
  //   if (!isProtectedRoute) {
  //     Router.go(Paths.PROFILE)
  //   }
  // } catch (e) {
  //   Router.start();
  //
  //   if (isProtectedRoute) {
  //     Router.go(Paths.NAV);
  //   }
  // }

});
