import template from './form.hbs';
import Block, { Props } from '../../core/block';
import { Button } from '../button';
import { FormInput } from '../form-input';
import { FormValidationService } from '../../services/form-validation.service';
import { LogService } from '../../services/log.service';
import {SignInRequest, SignUpRequest} from "../../api/api.types";
import {authService} from "../../services";
export type FormProps = Props & {
  inputs?: FormInput[];
  button?: Button;
  name?: string;
  handler?: (data: FormData | Record<string, string>) => void;
};

export class Form extends Block<FormProps> {
  private formValidationService: FormValidationService;
  private logService: LogService;

  constructor(props: FormProps) {
    props.className = [...(props.className || [])];
    super(props, 'form');

    this.formValidationService = new FormValidationService(this);
    this.logService = new LogService();

    this.setProps({
      events: {
        submit: (event: SubmitEvent) => {
          event?.preventDefault();
          if (this.formValidationService.isFormValid()) {
            const vals = this.logService.logFormData(this.getContent().querySelectorAll('[name]'));
            const data = Object.fromEntries(vals);
            switch (props.name) {
              case "Sign In Form":
                authService.signin(data as SignInRequest);
                break;
              case "Sign up Form":
                authService.signup(data as SignUpRequest);
                break;
              default:
                break
            }

            if (this.formValidationService.isFormValid()) {
              console.log(data)
              this.props.handler?.(data);
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
