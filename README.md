# @selfage/element

A tiny, strongly-typed DOM factory that lets you write HTML-shaped trees directly in TypeScript—no template language, runtime, or compile-time transform required.

## Why @selfage/element?

- **Keep the HTML feel without JSX**: retain the pleasant tree-shaped layout people love about React, but stay in vanilla TypeScript—no Babel, VDOM, or custom syntax.
- **Ship less**: there is no runtime framework, component lifecycle, or diffing algorithm bundled here; you produce plain DOM nodes, so your bundle stays tiny.
- **Use the platform directly**: every factory call maps to `document.createElement`, letting you attach events, share nodes, or drop into existing code bases without wrappers.
- **Type safety end to end**: attributes and `Ref<T>` handles are strongly typed, so you get the safety net of modern tooling without giving up direct DOM access.
- **Fits anywhere**: because it returns native nodes, you can integrate with React, Vue, Svelte, or plain routers—perfect for islands, micro frontends, or “sprinkle” interactivity.

## Install

```bash
npm install @selfage/element
```

## Quick start: build DOM with structure

```ts
import { E } from "@selfage/element/factory";

const panel = E.div(
  { class: "panel" },
  E.h2({}, E.text("System status")),
  E.ul(
    {},
    E.li({}, E.text("API: online")),
    E.li({}, E.text("Database: online")),
    E.li({ class: "is-warning" }, E.text("Worker queue: draining"))
  )
);

document.body.append(panel);
```

The tree shape you see is the tree you get. `prettier` or any formatter keeps the indentation aligned, and each helper returns a native DOM element (or `Text`) so interop with existing code stays trivial.

## How to interact with nodes

When you need imperative access to specific nodes, pair the factory with `@selfage/ref` (installed automatically as a dependency):

```ts
import { E } from "@selfage/element/factory";
import { Ref } from "@selfage/ref";

const inputRef = new Ref<HTMLInputElement>();
const counterRef = new Ref<HTMLSpanElement>();

const form = E.form(
  { class: "name-form" },
  E.label({}, E.text("Your name"), E.input({ ref: inputRef, type: "text" })),
  E.button({ type: "submit" }, E.text("Save")),
  E.span({ ref: counterRef, class: "char-count" }, E.text("0"))
);

form.addEventListener("input", () => {
  counterRef.val.textContent = String(inputRef.val.value.length);
});
```

`ref` attributes are assigned after the element is created, so you keep a clean declarative structure without sprinkling `document.querySelector` calls throughout your code.

## Patterns the factory supports

- **Component-style functions**: export functions that return DOM trees (`export const Header = () => E.header(...)`) and compose them together.
- **Event-first UIs**: because everything is native DOM, attach listeners or mutate attributes anywhere you like—ideal for apps where state lives outside a view layer.
- **SVG authoring**: the `ElementFactory` exposes helpers for common SVG tags (`E.svg`, `E.path`, `E.g`, …) so you can mix vector graphics into the same tree.
- **Framework interop**: drop the returned elements into any container, whether it is a vanilla router outlet, an Electron window, or a larger framework expecting raw DOM nodes.

## API overview

- Import the singleton `E` from `@selfage/element/factory`.
- Call `E.<tagName>(attributes?, ...children)` where `attributes` is an `ElementAttributeMap`. `ref` is the only special attribute; everything else maps straight to `setAttribute`.
- Use `E.text(content)` for text nodes.
- For SVG, call the dedicated methods (`E.svg`, `E.path`, `E.circle`, etc.). Under the hood the factory selects the correct namespace automatically.

Refer to [`factory.ts`](factory.ts) for the full list of helpers; the TypeScript types describe the return value of each tag.
