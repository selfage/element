import { Ref, assign } from "@selfage/ref";

export interface ElementAttributeMap {
  [index: string]: string;
}

export class ElementFactory {
  private static appendChildren(parent: Node, childNodes: Array<Node>): void {
    for (let childNode of childNodes) {
      parent.appendChild(childNode);
    }
  }

  private static setAttributes(
    ele: Element,
    attributes: ElementAttributeMap
  ): void {
    for (let [key, value] of Object.entries(attributes)) {
      ele.setAttribute(key, value);
    }
  }

  public div(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLDivElement {
    let ele = document.createElement("div");
    ElementFactory.setAttributes(ele, attributes);
    ElementFactory.appendChildren(ele, childNodes);
    return ele;
  }

  public divRef(
    ref: Ref<HTMLDivElement>,
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLDivElement {
    return assign(ref, this.div(attributes, ...childNodes));
  }

  public text(content = ""): Text {
    return document.createTextNode(content);
  }

  public textRef(ref: Ref<Text>, content = ""): Text {
    return assign(ref, this.text(content));
  }

  public label(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLabelElement {
    let ele = document.createElement("label");
    ElementFactory.setAttributes(ele, attributes);
    ElementFactory.appendChildren(ele, childNodes);
    return ele;
  }

  public labelRef(
    ref: Ref<HTMLLabelElement>,
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLabelElement {
    return assign(ref, this.label(attributes, ...childNodes));
  }

  public image(attributes: ElementAttributeMap): HTMLImageElement {
    let ele = document.createElement("img");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public imageRef(
    ref: Ref<HTMLImageElement>,
    attributes: ElementAttributeMap
  ): HTMLImageElement {
    return assign(ref, this.image(attributes));
  }

  public input(attributes: ElementAttributeMap): HTMLInputElement {
    let ele = document.createElement("input");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public inputRef(
    ref: Ref<HTMLInputElement>,
    attributes: ElementAttributeMap
  ): HTMLInputElement {
    return assign(ref, this.input(attributes));
  }

  public textarea(attributes: ElementAttributeMap): HTMLTextAreaElement {
    let ele = document.createElement("textarea");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public textareaRef(
    ref: Ref<HTMLTextAreaElement>,
    attributes: ElementAttributeMap
  ): HTMLTextAreaElement {
    return assign(ref, this.textarea(attributes));
  }

  public button(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLButtonElement {
    let ele = document.createElement("button");
    ElementFactory.setAttributes(ele, attributes);
    ElementFactory.appendChildren(ele, childNodes);
    return ele;
  }

  public buttonRef(
    ref: Ref<HTMLButtonElement>,
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLButtonElement {
    return assign(ref, this.button(attributes, ...childNodes));
  }

  public a(attributes: ElementAttributeMap, text: Text): HTMLAnchorElement {
    let ele = document.createElement("a");
    ElementFactory.setAttributes(ele, attributes);
    ElementFactory.appendChildren(ele, [text]);
    return ele;
  }

  public aRef(
    ref: Ref<HTMLAnchorElement>,
    attributes: ElementAttributeMap,
    text: Text
  ): HTMLAnchorElement {
    return assign(ref, this.a(attributes, text));
  }

  public svg(
    attributes: ElementAttributeMap,
    ...svgPaths: Array<SVGPathElement>
  ): SVGSVGElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ElementFactory.setAttributes(ele, attributes);
    ElementFactory.appendChildren(ele, svgPaths);
    return ele;
  }

  public svgRef(
    ref: Ref<SVGSVGElement>,
    attributes: ElementAttributeMap,
    ...svgPaths: Array<SVGPathElement>
  ): SVGSVGElement {
    return assign(ref, this.svg(attributes, ...svgPaths));
  }

  public path(attributes: ElementAttributeMap): SVGPathElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public pathRef(
    ref: Ref<SVGPathElement>,
    attributes: ElementAttributeMap
  ): SVGPathElement {
    return assign(ref, this.path(attributes));
  }

  public linearGradient(
    attributes: ElementAttributeMap
  ): SVGLinearGradientElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public linearGradientRef(
    ref: Ref<SVGLinearGradientElement>,
    attributes: ElementAttributeMap
  ): SVGLinearGradientElement {
    return assign(ref, this.linearGradient(attributes));
  }

  public iframe(attributes: ElementAttributeMap): HTMLIFrameElement {
    let ele = document.createElement("iframe");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public iframeRef(
    ref: Ref<HTMLIFrameElement>,
    attributes: ElementAttributeMap
  ): HTMLIFrameElement {
    return assign(ref, this.iframe(attributes));
  }

  public video(attributes: ElementAttributeMap): HTMLVideoElement {
    let ele = document.createElement("video");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public videoRef(
    ref: Ref<HTMLVideoElement>,
    attributes: ElementAttributeMap
  ): HTMLVideoElement {
    return assign(ref, this.video(attributes));
  }

  public canvas(attributes: ElementAttributeMap): HTMLCanvasElement {
    let ele = document.createElement("canvas");
    ElementFactory.setAttributes(ele, attributes);
    return ele;
  }

  public canvasRef(
    ref: Ref<HTMLCanvasElement>,
    attributes: ElementAttributeMap
  ): HTMLCanvasElement {
    return assign(ref, this.canvas(attributes));
  }
}

// Use abbreviation only to boost productivity.
export let E = new ElementFactory();
