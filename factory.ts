import { Ref, assign } from "@selfage/ref";

export class ElementFactory {
  private static appendChildren(parent: Node, childNodes: Node[]): Node {
    for (let childNode of childNodes) {
      parent.appendChild(childNode);
    }
    return parent;
  }

  public div(attributeStr: string, ...childNodes: Node[]): HTMLDivElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<div ${attributeStr}></div>`;
    return ElementFactory.appendChildren(
      ele.content.firstElementChild,
      childNodes
    ) as HTMLDivElement;
  }

  public divRef(
    ref: Ref<HTMLDivElement>,
    attributeStr: string,
    ...childNodes: Node[]
  ): HTMLDivElement {
    return assign(ref, this.div(attributeStr, ...childNodes));
  }

  public text(content = ""): Text {
    return document.createTextNode(content);
  }

  public textRef(ref: Ref<Text>, content = ""): Text {
    return assign(ref, this.text(content));
  }

  public image(attributeStr: string): HTMLImageElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<img ${attributeStr}/>`;
    return ele.content.firstElementChild as HTMLImageElement;
  }

  public imageRef(
    ref: Ref<HTMLImageElement>,
    attributeStr: string
  ): HTMLImageElement {
    return assign(ref, this.image(attributeStr));
  }

  public input(attributeStr: string): HTMLInputElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<input ${attributeStr}/>`;
    return ele.content.firstElementChild as HTMLInputElement;
  }

  public inputRef(
    ref: Ref<HTMLInputElement>,
    attributeStr: string
  ): HTMLInputElement {
    return assign(ref, this.input(attributeStr));
  }

  public button(
    attributeStr: string,
    ...childNodes: Node[]
  ): HTMLButtonElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<button ${attributeStr}/>`;
    return ElementFactory.appendChildren(
      ele.content.firstElementChild,
      childNodes
    ) as HTMLButtonElement;
  }

  public buttonRef(
    ref: Ref<HTMLButtonElement>,
    attributeStr: string,
    ...childNodes: Node[]
  ): HTMLButtonElement {
    return assign(ref, this.button(attributeStr, ...childNodes));
  }

  public a(attributeStr: string, text: Text): HTMLAnchorElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<a ${attributeStr}/>`;
    return ElementFactory.appendChildren(ele.content.firstElementChild, [
      text,
    ]) as HTMLAnchorElement;
  }

  public aRef(
    ref: Ref<HTMLAnchorElement>,
    attributeStr: string,
    text: Text
  ): HTMLAnchorElement {
    return assign(ref, this.a(attributeStr, text));
  }

  public svg(attributeStr: string, svgPath: SVGPathElement): SVGSVGElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<svg ${attributeStr}></svg>`;
    return ElementFactory.appendChildren(ele.content.firstElementChild, [
      svgPath,
    ]) as SVGSVGElement;
  }

  public svgRef(
    ref: Ref<SVGSVGElement>,
    attributeStr: string,
    svgPath: SVGPathElement
  ): SVGSVGElement {
    return assign(ref, this.svg(attributeStr, svgPath));
  }

  public path(attributeStr: string): SVGPathElement {
    let ele = document.createElement("template");
    ele.innerHTML = `<path ${attributeStr}/>`;
    return ele.content.firstElementChild as SVGPathElement;
  }

  public pathRef(
    ref: Ref<SVGPathElement>,
    attributeStr: string
  ): SVGPathElement {
    return assign(ref, this.path(attributeStr));
  }
}

// Use abbreviation only to boost productivity.
export let E = new ElementFactory();
