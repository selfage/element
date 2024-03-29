# @selfage/element

## Install

`npm install @selfage/element`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides a simple factory to create HTML elements/tags, and a few simple components built with the factory, promoting a type-safe pattern to build single page applications (SPA) using pure JavaScript/TypeScript without transpiling HTML-like syntax.

## Create elements with HTML-like structure/indents

One reason people like writing HTML-like code is because the tree structure can be easily visualized with indents. The vanilla JavaScript API `document.createElement()` is not only verbose but also hardly visually structured. This packages provides a simple factory to solve the problem as shown below.

```TypeScript
import { E } from "@selfage/element/factory";

let div = E.div(
  { class: "parent", style: "display: absolute;" },
  E.div(
    { class: "childA", style: "display: block; font-size: 24px;" },
    E.text("The first child")
  ),
  E.div(
    { class: "childB" },
    E.div(
      `class="deepChildB" style="font-size: 14px;"`,
      E.text("The second deep child")
    )
  )
);
```

The above code snippet is formatted by `prettier`.

The returned elements are exactly the same as you would get from calling `document.createElement()`. See the [definition](https://github.com/selfage/element/blob/main/factory.ts) for all available methods.

## Create elements with output references

Usually, we not only need a reference to the top-level element but also need to manipulate elements dynamically. It can be done without breaking the visual structure, with the help of `@selfage/ref` installed as the dependency of this package.

```TypeScript
import { E } from "@selfage/element/factory";
import { Ref } from "@selfage/ref";

let childDivA = new Ref<HTMLDivElement>();
let childDivB = new Ref<HTMLDivElement>();
let div = E.div(
  { class: "parent", style: "display: absolute;" },
  E.divRef(
    childDivA,
    { class: "childA", style: "display: block; font-size: 24px;" },
    E.text("The first child")
  ),
  E.divRef(
    childDivB,
    { class: "childB" },
    E.div(
      { class: "deepChildB", style: "font-size: 14px;" },
      E.text("The second deep child")
    )
  )
);

childDivA.val.className; // childA
childDivB.val.className; // childB
```

Note the use of `E.divRef()` which can then take `childDivA` and `childDivB` as the first arguments.
