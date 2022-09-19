import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props {
  href: string;
  children: HTMLElement | string;
  selected?: boolean;
  onClick?: (e: Event) => void;
}

export default function A(props: Props) {
  const selected = props.href === location?.pathname ? 'selected' : undefined;

  return (
    <li class={selected}>
      <a href={props.href} onClick={props.onClick} disabled={!IS_BROWSER}>{props.children}</a>
    </li>
  );
}
