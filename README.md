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
  `class="parent" style="display: absolute;"`,
  E.div(
    `class="childA" style="display: block; font-size: 24px;"`,
    E.text("The first child")
  ),
  E.div(
    `class="childB"`,
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
  `class="parent" style="display: absolute;"`,
  E.divRef(
    childDivA,
    `class="childA" style="display: block; font-size: 24px;"`,
    E.text("The first child")
  ),
  E.divRef(
    childDivB,
    `class="childB"`,
    E.div(
      `class="deepChildB" style="font-size: 14px;"`,
      E.text("The second deep child")
    )
  )
);

childDivA.val.className; // childA
childDivB.val.className; // childB
```

Note the use of `E.divRef()` which can then take `childDivA` and `childDivB` as the first arguments.

## Button controller

It provides a common feature on top of `<button type="button">` that when a button is clicked, it will be disabled until the all callbacks, especially including async callbacks, finished.

```TypeScript
import { E } from '@selfage/element/factory';
import { ButtonController } from '@selfage/element/button_controller';

let buttonEle = E.Button(`class="buttonA"`, E.text('Learn more'));
let buttonController = ButtonController.create(buttonEle);
```

There are 6 events emiited from it: `enable`, `disable`, `click`, `hover`, `down`, `up`, and `leave`.

More precsily, when the button is clicked, it will first emit `disable` event, then wait for the executions of listeners on `click` event, including `async` listeners, and finally emit `enable` event. It makes sure that `click` event will not be emitted again until re-enabled. Each callback on `click` event also needs to return a boolean indicating whether it wants to keep the button disabled. And if any of the callbacks returns true, the button will keep disabled until explicitly enabled, i.e. by calling `enable()`.

`hover` event corresponds to `mouseenter` event. `down` to `mousedown`. `up` to `mouseup`. `leave` to `mouseleave`. The difference is that when `mousedown` happens, `hover` and `down` happen in sequence, and when `mouseleave` happens, `up` and `leave` happen in sequence.

All events can be triggered from corresponding public functions.

You can still add event listeners directly on the button element itself `buttonEle`.

## Text input controller

It simply provides an `enter` event on top of `<input type="text">` whenever the enter key is pressed in the input box.

```TypeScript
import { E } from '@selfage/element/factory';
import { TextInputController } from '@selfage/element/text_input_controller';

let inputEle = E.input(`class="inputA"`);
let inputController = TextInputController.create(inputEle);
```

## Hideable element controller

It simply keeps track of the `display` style when `hide()` and restores it when `show()`.

```TypeScript
import { E } from '@selfage/element/factory';
import { HideableElementController } from '@selfage/element/hideable_element_controller';

let ele = E.div(`class="inputA" style="display: flex;"`);
let hideableElement = new HideableElementController(ele);
hideableElement.hide();
hideableElement.show();
```

