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

## Button component

It provides a common feature on top of `<button type="button">` that when a button is clicked, it will be disabled until the all callbacks, especially including async callbacks, finished.

```TypeScript
import { E } from '@selfage/element/factory';
import { Button } from '@selfage/element/button';
import { Ref } from '@selfage/ref';

let buttonA = Button.create(`class="buttonA"`, E.text('Learn more'));

let buttonB = new Ref<Button>();
E.div(
  `class="parent"`,
  Button.createRef(buttonB, `class="buttonB"`, E.text('Submit')).ele
);
```

There are 6 events provided: `enable`, `disable`, `click`, `hover`, `down`, `up`, and `leave`.

More precsily, when the button is clicked, it will first emit `disable` event, then wait for the executions of listeners on `click` event, including `async` listeners, and finally emit `enable` event. It makes sure that `click` event will not be emitted again until re-enabled.

`hover` event corresponds to `mouseenter` event. `down` to `mousedown`. `up` to `mouseup`. `leave` to `mouseleave`. The difference is that when `mousedown` happens, `hover` and `down` happen in sequence, and when `mouseleave` happens, `up` and `leave` happen in sequence.

Finally, you can still add event listeners directly on the exposed vanilla element `buttonA.ele`.

Other public methods include `enable()`, `disable()`, `show()`, `hide()`, and `triggerClick()`.

## Text input component

It simply provides an `enter` event on top of `<input type="text">` whenever the enter key is pressed in the input box.

```TypeScript
import { E } from '@selfage/element/factory';
import { TextInput } from '@selfage/element/text_input';
import { Ref } from '@selfage/ref';

let inputA = TextInput.create(`class="inputA"`);

let inputB = new Ref<TextInput>();
E.div(
  `class="parent"`,
  TextInput.createRef(inputB, `class="inputB"`).ele
);
```

## Pattern to create component

Note that we are only explaining a pattern that we found the most readable, testable and type-safe, while a little verbose (part of it is due to the lack of macro support). There is nothing prevents you from inventing your own approaches to create component.

We are using [text_input.ts](https://github.com/selfage/element/blob/main/text_input.ts) as the exmaple to explain. You can also refer to [button.ts](https://github.com/selfage/element/blob/main/button.ts) as another example.

### Injecting and exposing elements

```TypeScript
export class TextInput {
  public constructor(public ele: HTMLInputElement, /* Other dependencies */) {}

  public static create(attributes: string): TextInput {
    let input = new TextInput(E.input(attributes));
    // Init something
    return input;
  }

  public static createRef(ref: Ref<TextInput>, attributes: string): TextInput {
    return assign(ref, TextInput.create(attributes));
  }
}
```

A component usually consists of logic that needs to be unit tested, which is lot easier if you inject the element from a factory method, such that the element can be mocked and injected during tests.

The factory method usually comes with two version, one that simply returns the component class and the other outputs to a `Ref`. You'd also need to expose `public ele: HTMLInputElement`, which is usually the container element, such that it can be visually structured as the following.

```TypeScript
let inputB = new Ref<TextInput>();
E.div(
  `class="parent"`,
  TextInput.createRef(inputB, `class="inputB"`).ele
);
```

If the component is consisted of multiple elements but doesn't have a container element, you can expose those as an array and append to a parent element like the following.

```TypeScript
let inputB = new Ref<TextInput>();
E.div(
  `class="parent"`,
  ...TextInput.createRef(inputB, `class="inputB"`).eles
);
```
