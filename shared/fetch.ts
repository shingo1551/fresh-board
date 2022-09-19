import { Profile, signIn, state } from './store.ts';

const baseUrl = 'http://localhost:8000/api/';

// deno-lint-ignore no-explicit-any
export async function fetchCors(url: string, method: string, body: any = undefined) {
  const jwt = state.value.jwt;
  const headers = jwt ? [['Authorization', 'Bearer ' + jwt]] : undefined;

  const o = body ? JSON.stringify(body) : undefined;
  const req = {
    method: method,
    headers: headers,
    mode: 'cors' as RequestMode,
    cache: 'no-cache' as RequestCache,
    body: o
  } as RequestInit;

  const res = (await fetch(baseUrl + url, req));
  if (!res.headers.get('content-type')?.startsWith('application/json'))
    throw await res.text();

  const json = await res.json() as { jwt: string; profile: Profile };
  if ('sign-in' === url)
    signIn(json);

  // deno-lint-ignore no-explicit-any
  return json as any;
}
