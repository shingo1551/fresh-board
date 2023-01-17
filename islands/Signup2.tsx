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
  onEmail = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    this.setState({
      email: { value, error: value ? "" : "必須入力です", dirty: true },
    });
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

  render() {
    const state = this.state;

    return (
      <form class="signup">
        <h1>Sign up</h1>
        <div>
          <span class="error">{state.error}</span>
          <input
            onInput={this.onEmail}
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
