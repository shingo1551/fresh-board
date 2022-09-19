import { ComponentChildren } from "preact";

import Menu from "../islands/Menu.tsx";

export default function Body(props: { children: ComponentChildren }) {
  return (
    <div>
      <header>
        <h1 >Fresh Board</h1>
      </header>

      <main>
        <Menu />
        <div>
          {props.children}
        </div>
      </main>
    </div>
  );
}
