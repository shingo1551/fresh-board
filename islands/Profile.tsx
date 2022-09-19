import { Component } from "preact";

import { state } from '../shared/store.ts';
import { fetchCors } from '../shared/fetch.ts';

export default class Profile extends Component {
  profile = state.value.profile;
  name: HTMLInputElement | undefined | null;
  birth: HTMLInputElement | undefined | null;
  phone: HTMLInputElement | undefined | null;

  onApply = async (ev: Event) => {
    ev.preventDefault();

    const body = {
      name: this.name?.value,
      birth: this.birth?.value,
      phone: this.phone?.value
    }
    await fetchCors('profile', 'put', body);
    location.href = '/board';
  }

  render = () => (
    <form class="profile" >
      <h1>Profile</h1>
      <div>
        <input ref={el => this.name = el} value={this.profile.name} placeholder='山田 太郎' />
        <input ref={el => this.birth = el} value={this.profile.birthDay} type='date' />
        <input ref={el => this.phone = el} value={this.profile.phone} placeholder='090-123-4567' />
      </div>
      <hr />
      <button onClick={this.onApply}>Apply</button>
    </form>
  );
}
