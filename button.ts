import EventEmitter = require("events");
import { E } from "./factory";
import { Ref, assign } from "@selfage/ref";

export interface CustomButton {
  enable: (element: HTMLButtonElement) => void;
  disable: (element: HTMLButtonElement) => void;
  hover: (element: HTMLButtonElement) => void;
  down: (element: HTMLButtonElement) => void;
  up: (element: HTMLButtonElement) => void;
  leave: (element: HTMLButtonElement) => void;
}

export class Button {
  private static CLICK = "click";

  private eventEmitter = new EventEmitter();
  private displayStyle: string;

  public constructor(
    private customButton: CustomButton,
    private element: HTMLButtonElement
  ) {}

  public static create(
    customButton: CustomButton,
    attributeStr: string,
    ...childNodes: Node[]
  ): Button {
    let element = E.button(attributeStr, ...childNodes);
    let button = new Button(customButton, element);
    button.init();
    return button;
  }

  public static createRef(
    ref: Ref<Button>,
    customButton: CustomButton,
    attributeStr: string,
    ...childNodes: Node[]
  ): Button {
    return assign(
      ref,
      Button.create(customButton, attributeStr, ...childNodes)
    );
  }

  public init(): void {
    this.element.type = "button";
    this.displayStyle = this.element.style.display;
    this.enable();
  }

  public onClick(callback: () => Promise<void> | void): void {
    this.eventEmitter.on(Button.CLICK, callback);
  }

  public offClick(callback: () => Promise<void> | void): void {
    this.eventEmitter.off(Button.CLICK, callback);
  }

  private enable(): void {
    this.element.style.cursor = "pointer";
    this.customButton.enable(this.element);
    this.element.onclick = this.click;
    this.element.onmouseenter = this.hover;
    this.element.onmousedown = this.down;
    this.element.onmouseup = this.up;
    this.element.onmouseleave = this.leave;
  }

  private click = async (): Promise<void> => {
    this.disable();
    try {
      await Promise.all(
        this.eventEmitter.listeners(Button.CLICK).map((callback) => callback())
      );
    } finally {
      this.enable();
    }
  };

  private disable(): void {
    this.element.style.cursor = "not-allowed";
    this.customButton.disable(this.element);
    this.element.onclick = undefined;
    this.element.onmouseenter = undefined;
    this.element.onmousedown = undefined;
    this.element.onmouseup = undefined;
    this.element.onmouseleave = undefined;
  }

  private hover = (): void => {
    this.customButton.hover(this.element);
  };

  private down = (): void => {
    this.hover();
    this.customButton.down(this.element);
  };

  private up = (): void => {
    this.customButton.up(this.element);
  };

  private leave = (): void => {
    this.up();
    this.customButton.leave(this.element);
  };

  public show(): void {
    this.element.style.display = this.displayStyle;
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public triggerClick(): void {
    this.element.click();
  }
}
