import { ComponentChildren } from "preact";
import { useRef } from 'preact/hooks';
import { signal } from "@preact/signals";

import { fetchCors } from '../shared/fetch.ts';

const err = signal({
  error: null,
  email: false,
  pass1: false,
  pass2: false,
  disabled: true
});

export default function Signup() {
  const email = useRef<HTMLInputElement>(null);
  const passwd1 = useRef<HTMLInputElement>(null);
  const passwd2 = useRef<HTMLInputElement>(null);

  const onEmail = () => {
    err.value.email = !email;
    onPasswd1();
  };

  const onPasswd1 = () => {
    err.value.pass1 = !passwd1.current?.value;
    onPasswd2();
  };

  const onPasswd2 = () => {
    err.value.pass2 = passwd1.current?.value !== passwd2.current?.value;
    buttonDisabled();
  };

  const buttonDisabled = () => {
    const value = err.value;
    err.value = {
      ...value,
      error: null,
      disabled: value.email || value.pass1 || value.pass2 || !email.current?.value
    }
  };

  const onSignUp = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: email.current?.value,
      passwd: passwd1.current?.value
    }
    try {
      await fetchCors('sign-up', 'post', body);
      location.href = '/signin';
    } catch (e) {
      err.value = { ...err.value, error: e };
    }
  }

  return (
    <form class="signup">
      <h1>Sign up</h1>
      <div>
        <Error>{err.value.error}</Error>
        <input ref={email} onInput={onEmail} autocomplete="username" placeholder="jane@example.com" />
        {/* <span class='error'>This field is required.</span> */}
        <input ref={passwd1} onInput={onPasswd1} type="password" autocomplete="new-password" placeholder="password" />
        {/* <span class='error'>This field is required.</span> */}
        <input ref={passwd2} onInput={onPasswd2} type="password" autocomplete="new-password" placeholder="password confirm" />
        {/* <span class='error'>This field is required.</span> */}
      </div>
      <hr />
      <button onClick={onSignUp} disabled={err.value.disabled}>Sign up</button>
    </form>
  );
}

function Error(props: { children: ComponentChildren }) {
  return props.children ? <div>{props.children}</div> : null;
}
