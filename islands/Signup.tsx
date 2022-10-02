import { useRef, useState } from "preact/hooks";
import { fetchCors } from "../shared/fetch.ts";

export default function Signup() {
  const email = useRef<HTMLInputElement>(null);
  const passwd1 = useRef<HTMLInputElement>(null);
  const passwd2 = useRef<HTMLInputElement>(null);

  const [msgError, setError] = useState("");
  const [msgEmail, setEmail] = useState("");
  const [msgPass1, setPass1] = useState("");
  const [msgPass2, setPass2] = useState("");
  const [disabled, setDisabled] = useState(true);

  const buttonDisabled = () => {
    setEmail(!email.current?.value ? "必須入力です" : "");
    setPass1(!passwd1.current?.value ? "必須入力です" : "");
    setPass2(
      passwd1.current?.value !== passwd2.current?.value ? "パスワードが一致しません" : "",
    );
    setDisabled(
      !email.current?.value || !passwd1.current?.value ||
        passwd1.current?.value !== passwd2.current?.value,
    );
  };

  const onSignUp = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: email.current?.value,
      passwd: passwd1.current?.value,
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
        <span class="error">{msgError}</span>
        <input
          ref={email}
          onInput={buttonDisabled}
          autocomplete="username"
          placeholder="jane@example.com"
        />
        <span class="error">{msgEmail}</span>
        <input
          ref={passwd1}
          onInput={buttonDisabled}
          type="password"
          autocomplete="new-password"
          placeholder="password"
        />
        <span class="error">{msgPass1}</span>
        <input
          ref={passwd2}
          onInput={buttonDisabled}
          type="password"
          autocomplete="new-password"
          placeholder="password confirm"
        />
        <span class="error">{msgPass2}</span>
      </div>
      <hr />
      <button onClick={onSignUp} disabled={disabled}>Sign up</button>
    </form>
  );
}
