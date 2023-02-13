import './styles/styles.scss';
import Block from './core/block';

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
import { BaseLayout } from './layout/base-layout';
import render from "./utils/renderToDOM";

export enum Paths {
  NAV = '/',
  CHATS = '/chats',
  ERROR404 = '/404',
  ERROR500 = '/500',
  PASSWORD_UPDATE = '/password-update',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profile-edit',
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
}

export const Routes: Record<Paths, Route> = {
  [Paths.NAV]: navigation,
  [Paths.CHATS]: chatsPage,
  [Paths.ERROR404]: error404,
  [Paths.ERROR500]: error500,
  [Paths.PASSWORD_UPDATE]: updatePasswordPage,
  [Paths.PROFILE]: profilePage,
  [Paths.PROFILE_EDIT]: profileEditPage,
  [Paths.SIGN_UP]: signUpPage,
  [Paths.SIGN_IN]: signInPage,
};

export type Route = Block;

function resolveRoute(route: Paths) {
  if (Routes[route]) {
    return Routes[route];
  } else {
    return Routes['/404'];
  }
}

function router() {
  let url = (window.location.hash.slice(1) as Paths) || Paths.NAV;
  let page = resolveRoute(url);
  render(new BaseLayout({ page }));
}


window.addEventListener('load', router);
window.addEventListener('hashchange', router);
