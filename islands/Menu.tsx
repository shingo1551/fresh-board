import A from '../components/A.tsx';
import { signOut, state } from '../shared/store.ts';

export default function Menu() {
  const onSignOut = (evt: Event) => {
    evt.preventDefault();
    signOut();
    location.href = '/signin';
  }

  const menu1 = () => (
    <ul class="menu">
      <A href='/signup'>Sign up</A>
      <A href='/signin'>Sign in</A>
      <A href='/board'>Board</A>
    </ul>
  );

  const menu2 = () => (
    <ul class="menu">
      <A href='/signout' onClick={onSignOut}>Sign out</A>
      <A href='/profile'>Profile</A>
      <A href='/board'>Board</A>
    </ul>
  );

  return !state.value.isSignIn ? menu1() : menu2();
}
