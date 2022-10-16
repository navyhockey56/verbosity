import { VerbosityTemplate } from "verbosity-dom";
import { VerbosityRedirectGuard } from "../router/redirect-guard";

export interface VerbosityTemplateDefinition<T extends HTMLElement> {
  instance(params? : any) : VerbosityTemplate<T>;
  guard?: VerbosityRedirectGuard;
}
