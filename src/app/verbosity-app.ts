import { VerbosityDom, VerbosityTemplate, VerbosityTemplateHydrater } from "verbosity-dom";

import { VerbosityRegistry } from "../registry/verbosity-registry";
import { VerbosityRouter } from "../router/verbosity-router";
import { VerbosityTemplateDefinition } from "../template/verbosity-template-definition";

interface SimpleMount {
  mountId: string,
  template: VerbosityTemplate<HTMLElement>
}

export class VerbosityApp {
  router: VerbosityRouter;
  registry: VerbosityRegistry;
  dom: VerbosityDom;

  private simpleMounts : SimpleMount[];
  private templateHydrater: VerbosityTemplateHydrater;

  constructor() {
    this.simpleMounts = [];

    this.dom = new VerbosityDom(this.hydrateTemplate.bind(this));
    this.registry = new VerbosityRegistry();
    this.router = new VerbosityRouter(this.dom);
  }

  addSimpleMount(mountId: string, template: VerbosityTemplate<HTMLElement>) {
    this.simpleMounts.push({mountId, template});
  }

  addRoute(path: string, componentDefintion : VerbosityTemplateDefinition<HTMLElement>) : void {
    this.router.addRoute(path, componentDefintion);
  }

  setTemplateHydrater(templateHydrater: VerbosityTemplateHydrater) {
    this.templateHydrater = templateHydrater;
  }

  start() : void {
    this.simpleMounts.forEach((simpleMount: SimpleMount) => {
      const mount = document.getElementById(simpleMount.mountId);
      this.dom.replaceElementWithTemplate(mount, simpleMount.template);
    });

    this.router.goTo(window.location.pathname);
  }

  private hydrateTemplate(template: VerbosityTemplate<HTMLElement>) : void {
    if (!this.templateHydrater) return;

    this.templateHydrater(template);
  }
}
