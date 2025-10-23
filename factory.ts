import { Ref, assign } from "@selfage/ref";

export interface ElementAttributeMap {
  ref?: Ref<Node>;
  [name: string]: string | Ref<Node>;
}

export class ElementFactory {
  private static setAttributes(
    ele: Element,
    attributes: ElementAttributeMap,
  ): void {
    for (let [key, value] of Object.entries(attributes)) {
      if (key === "ref") {
        continue;
      }
      if (value != null) {
        ele.setAttribute(key, value as string);
      }
    }
  }

  public meta(attributes: ElementAttributeMap): HTMLMetaElement {
    let ele = document.createElement("meta");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public script(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLScriptElement {
    let ele = document.createElement("script");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public text(content = ""): Text {
    let node = document.createTextNode(content);
    return node;
  }

  public h1(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h1");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public h2(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h2");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public h3(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h3");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public h4(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h4");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public h5(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h5");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public h6(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h6");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public p(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLParagraphElement {
    let ele = document.createElement("p");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public br(attributes: ElementAttributeMap): HTMLBRElement {
    let ele = document.createElement("br");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public div(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLDivElement {
    let ele = document.createElement("div");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public span(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLSpanElement {
    let ele = document.createElement("span");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public ol(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLOListElement {
    let ele = document.createElement("ol");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public ul(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLUListElement {
    let ele = document.createElement("ul");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public li(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLIElement {
    let ele = document.createElement("li");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public label(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLabelElement {
    let ele = document.createElement("label");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public image(attributes: ElementAttributeMap): HTMLImageElement {
    let ele = document.createElement("img");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public form(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLFormElement {
    let ele = document.createElement("form");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public input(attributes: ElementAttributeMap): HTMLInputElement {
    let ele = document.createElement("input");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public textarea(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLTextAreaElement {
    let ele = document.createElement("textarea");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public button(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLButtonElement {
    let ele = document.createElement("button");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public a(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLAnchorElement {
    let ele = document.createElement("a");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public iframe(attributes: ElementAttributeMap): HTMLIFrameElement {
    let ele = document.createElement("iframe");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public video(attributes: ElementAttributeMap): HTMLVideoElement {
    let ele = document.createElement("video");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public canvas(attributes: ElementAttributeMap): HTMLCanvasElement {
    let ele = document.createElement("canvas");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public svg(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGSVGElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public path(attributes: ElementAttributeMap): SVGPathElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public circle(attributes: ElementAttributeMap): SVGCircleElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public ellipse(attributes: ElementAttributeMap): SVGEllipseElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public rect(attributes: ElementAttributeMap): SVGRectElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public line(attributes: ElementAttributeMap): SVGLineElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public polygon(attributes: ElementAttributeMap): SVGPolygonElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public polyline(attributes: ElementAttributeMap): SVGPolylineElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline",
    );
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public g(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGGElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "g");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public clipPath(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGClipPathElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "clipPath",
    );
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public linearGradient(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGLinearGradientElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient",
    );
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public radialGradient(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGRadialGradientElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "radialGradient",
    );
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public stop(attributes: ElementAttributeMap): SVGStopElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public defs(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGDefsElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public use(attributes: ElementAttributeMap): SVGUseElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "use");
    ElementFactory.setAttributes(ele, attributes);
    assign(attributes.ref, ele);
    return ele;
  }

  public header(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("header");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public footer(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("footer");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public nav(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("nav");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public main(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("main");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public section(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("section");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }

  public article(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("article");
    ElementFactory.setAttributes(ele, attributes);
    ele.append(...childNodes);
    assign(attributes.ref, ele);
    return ele;
  }
}

// Use abbreviation only to boost productivity.
export let E = new ElementFactory();
