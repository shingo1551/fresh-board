import { ComponentChildren } from "preact";

export function Error(props: { children: ComponentChildren }) {
  return props.children ? <div>{props.children}</div> : null;
}
