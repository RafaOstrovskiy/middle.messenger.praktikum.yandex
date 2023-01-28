import { EventBus } from './event-bus';
import { nanoid } from 'nanoid';



class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6)
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any;};
  private eventBus: () => EventBus;
  protected props: Record<string, unknown>
  private children: Record<string, Block>

  constructor(tagName = "div", propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren)

    this._meta = {
      tagName,
      props
    };

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props : Record<string, any>= {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value
      }
    })

    return { props, children };
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _addEvents() {
    const { events = {}} = this.props as { events: Record<string, () => void>};

    Object.keys(events).forEach( eventName => {
      this._element?.addEventListener(eventName, events[eventName])
    })

  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

// Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate(oldProps: any, newProps: any):boolean {
    let isNeedUpdate:boolean = false;

    for (let key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        isNeedUpdate = true
      }
    }
    return isNeedUpdate;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this._element!.append(block);

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = {...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs)

    // template wich has document.fragment
    const temp = document.createElement('template');

    temp.innerHTML = html

    Object.entries(this.children).forEach(([name, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)


      if (!stub) {
        return;
      }
      stub.replaceWith(component.getContent()!)
    })

    return temp.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props:any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName:string) {
    return document.createElement(tagName);
  }

  show() {
    this.element!.style.display = "block";
  }

  hide() {
    this.element!.style.display = "none";
  }
}

export default Block;

