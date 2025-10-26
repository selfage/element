import { Ref, assign } from "@selfage/ref";

export interface ElementAttributeMap {
  ref?: Ref<Node>;
  [name: string]: string | Ref<Node> | undefined;
}

export class ElementFactory {
  private static applyAttributes(
    ele: Element,
    attributes: ElementAttributeMap,
  ): void {
    for (let [key, value] of Object.entries(attributes)) {
      if (key === "ref") {
        if (value) {
          assign(value as Ref<Node>, ele);
        }
      } else if (value != null) {
        ele.setAttribute(key, value as string);
      }
    }
  }

  public meta(attributes: ElementAttributeMap): HTMLMetaElement {
    let ele = document.createElement("meta");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public script(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLScriptElement {
    let ele = document.createElement("script");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
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
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public h2(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h2");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public h3(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h3");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public h4(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h4");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public h5(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h5");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public h6(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLHeadingElement {
    let ele = document.createElement("h6");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public p(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLParagraphElement {
    let ele = document.createElement("p");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public br(attributes: ElementAttributeMap): HTMLBRElement {
    let ele = document.createElement("br");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public div(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLDivElement {
    let ele = document.createElement("div");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public span(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLSpanElement {
    let ele = document.createElement("span");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public ol(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLOListElement {
    let ele = document.createElement("ol");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public ul(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLUListElement {
    let ele = document.createElement("ul");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public li(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLIElement {
    let ele = document.createElement("li");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public label(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLLabelElement {
    let ele = document.createElement("label");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public image(attributes: ElementAttributeMap): HTMLImageElement {
    let ele = document.createElement("img");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public form(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLFormElement {
    let ele = document.createElement("form");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public input(attributes: ElementAttributeMap): HTMLInputElement {
    let ele = document.createElement("input");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public textarea(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLTextAreaElement {
    let ele = document.createElement("textarea");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public button(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLButtonElement {
    let ele = document.createElement("button");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public a(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLAnchorElement {
    let ele = document.createElement("a");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public iframe(attributes: ElementAttributeMap): HTMLIFrameElement {
    let ele = document.createElement("iframe");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public video(attributes: ElementAttributeMap): HTMLVideoElement {
    let ele = document.createElement("video");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public canvas(attributes: ElementAttributeMap): HTMLCanvasElement {
    let ele = document.createElement("canvas");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public svg(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGSVGElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public svgTitle(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): SVGTitleElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "title");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public svgDesc(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): SVGDescElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "desc");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public path(attributes: ElementAttributeMap): SVGPathElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "path");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public circle(attributes: ElementAttributeMap): SVGCircleElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public ellipse(attributes: ElementAttributeMap): SVGEllipseElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public rect(attributes: ElementAttributeMap): SVGRectElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public line(attributes: ElementAttributeMap): SVGLineElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public polygon(attributes: ElementAttributeMap): SVGPolygonElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public polyline(attributes: ElementAttributeMap): SVGPolylineElement {
    let ele = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline",
    );
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public g(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGGElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "g");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
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
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
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
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
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
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public stop(attributes: ElementAttributeMap): SVGStopElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public defs(
    attributes: ElementAttributeMap,
    ...childNodes: Array<SVGElement>
  ): SVGDefsElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public use(attributes: ElementAttributeMap): SVGUseElement {
    let ele = document.createElementNS("http://www.w3.org/2000/svg", "use");
    ElementFactory.applyAttributes(ele, attributes);
    return ele;
  }

  public header(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("header");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public footer(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("footer");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public nav(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("nav");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public main(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("main");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public section(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("section");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }

  public article(
    attributes: ElementAttributeMap,
    ...childNodes: Array<Node>
  ): HTMLElement {
    let ele = document.createElement("article");
    ElementFactory.applyAttributes(ele, attributes);
    ele.append(...childNodes);
    return ele;
  }
}

// Use abbreviation only to boost productivity.
export let E = new ElementFactory();
