import { Component } from "preact";

import { setProfile, signOut, state } from "../shared/store.ts";
import { fetchCors } from "../shared/fetch.ts";

interface State {
  error: string;
}

// deno-lint-ignore ban-types
export default class Profile extends Component<{}, State> {
  name: HTMLInputElement | undefined | null;
  birth: HTMLInputElement | undefined | null;
  phone: HTMLInputElement | undefined | null;
  profile = state.value.profile;

  componentDidMount() {
    // if (!state.value.jwt) {
    //   signOut();
    //   location.href = "/signin";
    // }
  }

  onApply = async (ev: Event) => {
    ev.preventDefault();

    try {
      const body = {
        name: this.name?.value,
        birth: this.birth?.value,
        phone: this.phone?.value,
      };
      setProfile(await fetchCors("profile", "put", body));
      location.href = "/board";
    } catch (e) {
      this.setState({ error: e });
    }
  };

  render = () => (
    <form class="profile">
      <h1>Profile</h1>
      <div>
        <p>{this.state.error}</p>
        <input
          ref={(el) => this.name = el}
          value={this.profile.name}
          placeholder="山田 太郎"
        />
        <input
          ref={(el) => this.birth = el}
          value={this.profile.birthDay}
          type="date"
        />
        <input
          ref={(el) => this.phone = el}
          value={this.profile.phone}
          placeholder="090-123-4567"
        />
      </div>
      <hr />
      <button onClick={this.onApply}>Apply</button>
    </form>
  );
}
