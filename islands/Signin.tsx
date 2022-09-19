import { useRef, useState } from 'preact/hooks';
import { IS_BROWSER } from "$fresh/runtime.ts";

import { Error } from '../components/Error.tsx';
import { fetchCors } from '../shared/fetch.ts';

export default function Signin() {
  const email = useRef<HTMLInputElement>(null);
  const passwd = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(null);

  const onSignIn = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: email.current?.value,
      passwd: passwd.current?.value
    }
    try {
      await fetchCors('sign-in', 'post', body);
      location.href = '/board';
    } catch (e) {
      setError(e);
    }
  }

  return (
    <form class="signin">
      <h1>Sign in</h1>
      <div>
        <Error>{error}</Error>
        <input ref={email} autocomplete="username" placeholder="jane@example.com" />
        <input ref={passwd} type="password" autocomplete="new-password" placeholder="password" />
      </div>
      <hr />
      <button onClick={onSignIn} disabled={!IS_BROWSER}>Sign in</button>
    </form>
  );
}
