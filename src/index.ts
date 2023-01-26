import navigation from './pages/navigation';
import baseLayout from './layout/base-layout';
import signUp from './pages/sign-up';
import signIn from './pages/sign-in';
import error from './pages/error';
import chats from './pages/chats';
import profileEdit from './pages/profile-edit';
import profile from './pages/profile';
import passwordUpdate from './pages/password-update';

import './styles/styles.scss';

const root = document.getElementById('root');
const routes: { [key: string]: () => unknown } = {
  '/': navigation,
  '/sign-up': signUp,
  '/sign-in': signIn,
  '/chats': chats,
  '/profile': profile,
  '/profile-edit': () => profileEdit,
  '/password-update': passwordUpdate,
  '/404': () => error({ title: '404', subtitle: 'Не туда попали' }),
  '/500': () => error({ title: '500', subtitle: 'Мы уже фиксим' }),
};

function resolveRoute(route: string) {
  if (routes[route]) {
    return routes[route];
  }
  return routes['/404'];
}

function router() {
  const url = window.location.hash.slice(1) || '/';
  const route = resolveRoute(url);
  const page = route();
  root!.innerHTML = baseLayout({ page });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
