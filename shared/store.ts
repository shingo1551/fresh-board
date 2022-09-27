import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const storage = IS_BROWSER ? sessionStorage : null;

export const state = signal({
  jwt: null as string | null,
  isSignIn: false,
  profile: {} as Profile,
});

export interface Profile {
  userId: number;
  name: string;
  birthDay: string;
  phone: string;
}

export function signIn(json: { jwt: string; profile: Profile }) {
  const profile = json.profile ? json.profile : {} as Profile;
  if (json.jwt) {
    state.value = {
      jwt: json.jwt,
      profile: profile,
      isSignIn: !!profile,
    };
    saveStorage();
  }
}

export function signOut() {
  state.value = {
    jwt: null,
    isSignIn: false,
    profile: {} as Profile,
  };
  saveStorage();
}

export function setProfile(profile: Profile) {
  state.value = {
    jwt: state.value.jwt,
    profile: profile,
    isSignIn: !!profile,
  };
  saveStorage();
}

//
function loadStorage() {
  const str = storage!.getItem("state");
  if (str) {
    state.value = JSON.parse(str);
  }
}

function saveStorage() {
  const value = state.value;
  const o = {
    jwt: value.jwt,
    profile: value.profile,
    isSignIn: value.isSignIn,
  };
  storage!.setItem("state", JSON.stringify(o));
  console.log("saveStorage", o);
}

//
if (IS_BROWSER)
  loadStorage();
