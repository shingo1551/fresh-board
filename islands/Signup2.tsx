import { Component } from "preact";
import { fetchCors } from "../shared/fetch.ts";

interface _State {
  value: string;
  error: string;
  dirty: boolean;
}

// useStateの代わり
interface State {
  error: string;
  email: _State;
  pass1: _State;
  pass2: _State;
}

// deno-lint-ignore ban-types
export default class Signup extends Component<{}, State> {
  constructor() {
    super();

    const value = sessionStorage.getItem("email");
    const email = value
      ? { value, error: "", dirty: true }
      : { value: "", error: "", dirty: false };

    // constructorで初期値設定、this.setStateを使用しない
    this.state = {
      error: "",
      email,
      pass1: { value: "", error: "", dirty: false },
      pass2: { value: "", error: "", dirty: false },
    };
  }

  // 最初の1回だけ呼ばれる(reloadとかも)
  componentDidMount() {
    console.log("componentDidMount");
    this.validation();
  }

  // event handler
  onEmail = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    sessionStorage.setItem("email", value);
    this.emailValidation(value, true);
  };

  onPass1 = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.setState({
      pass1: { value, error: value ? "" : "必須入力です", dirty: true },
    });
    this._setPass2(value, this.state.pass2.value, this.state.pass2.dirty);
  };

  onPass2 = (e: Event) => {
    this._setPass2(
      this.state.pass1.value,
      (e.target as HTMLInputElement).value,
      true,
    );
  };

  //
  _setPass2 = (value1: string, value2: string, dirty: boolean) => {
    if (dirty) {
      this.setState({
        pass2: {
          value: value2,
          error: value1 === value2 ? "" : "パスワードが一致しません",
          dirty,
        },
      });
    }
  };

  //
  emailValidation = (value: string, dirty: boolean) => {
    if (dirty) {
      const regex =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

      let error = "";
      if (!value) {
        error = "必須入力です";
      } else if (!regex.test(value)) {
        error = "正しい形式で入力してください";
      }

      this.setState({ email: { value, error, dirty: true } });
    }
  };

  validation = () => {
    const state = this.state;

    // 入力項目が多い場合、ここに追加
    this.emailValidation(state.email.value, state.email.dirty);
  };

  // button disabled用
  isValid = (state: { value: string; error: string; dirty: boolean }) => {
    return !state.error && state.dirty;
  };

  disabled = () => {
    let valid = true;
    const state = this.state;
    [state.email, state.pass1, state.pass2].forEach((state) =>
      valid &&= this.isValid(state)
    );
    return !valid;
  };

  // API呼び出し
  onSignUp = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: this.state.email.value,
      passwd: this.state.pass1.value,
    };
    try {
      await fetchCors("sign-up", "post", body);
      location.href = "/signin";
    } catch (e) {
      this.setState({ error: e });
    }
  };

  //
  render() {
    const state = this.state;

    return (
      <form class="signup">
        <h1>Sign up</h1>
        <div>
          <span class="error">{state.error}</span>
          <input
            onInput={this.onEmail}
            value={state.email.value}
            autocomplete="username"
            placeholder="jane@example.com"
          />
          <span class="error">{state.email.error}</span>
          <input
            onInput={this.onPass1}
            type="password"
            autocomplete="new-password"
            placeholder="password"
          />
          <span class="error">{state.pass1.error}</span>
          <input
            onInput={this.onPass2}
            type="password"
            autocomplete="new-password"
            placeholder="password confirm"
          />
          <span class="error">{state.pass2.error}</span>
        </div>
        <hr />
        <button onClick={this.onSignUp} disabled={this.disabled()}>
          Sign up
        </button>
      </form>
    );
  }
}
