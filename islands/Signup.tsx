import { useRef, useState } from "preact/hooks";
import { fetchCors } from "../shared/fetch.ts";

export default function Signup() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState({ value: '', error: '', dirty: false });
  const [pass1, setPass1] = useState({ value: '', error: '', dirty: false });
  const [pass2, setPass2] = useState({ value: '', error: '', dirty: false });

  const onEmail = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail({ value, error: value ? '' : "必須入力です", dirty: true });
  }

  const onPass1 = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setPass1({ value, error: value ? '' : "必須入力です", dirty: true });
  }

  const onPass2 = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setPass2({ value, error: value === pass1.value ? '' : "パスワードが一致しません", dirty: true });
  }

  const isValid = (state: { value: string, error: string, dirty: boolean }) => {
    return !state.error && state.dirty;
  };

  const disabled = () => {
    return !(isValid(email) && isValid(pass1) && isValid(pass2));
  };

  const onSignUp = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: email.value,
      passwd: pass1.value,
    };
    try {
      await fetchCors("sign-up", "post", body);
      location.href = "/signin";
    } catch (e) {
      setError(e);
    }
  };

  return (
    <form class="signup">
      <h1>Sign up</h1>
      <div>
        <span class="error">{error}</span>
        <input
          onInput={onEmail}
          autocomplete="username"
          placeholder="jane@example.com"
        />
        <span class="error">{email.error}</span>
        <input
          onInput={onPass1}
          type="password"
          autocomplete="new-password"
          placeholder="password"
        />
        <span class="error">{pass1.error}</span>
        <input
          onInput={onPass2}
          type="password"
          autocomplete="new-password"
          placeholder="password confirm"
        />
        <span class="error">{pass2.error}</span>
      </div>
      <hr />
      <button onClick={onSignUp} disabled={disabled()}>Sign up</button>
    </form>
  );
}
