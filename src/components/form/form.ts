import template from './form.hbs';
import Block, { Props } from '../../core/block';
import { Button } from '../button';
import { FormInput } from '../form-input';
import { FormValidationService } from '../../services/form-validation.service';
import { LogService } from '../../services/log.service';

export type FormProps = Props & {
  inputs?: FormInput[];
  button?: Button;
  name?: string;
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
            this.logService.logFormData(this.getContent().querySelectorAll('[name]'), props.name);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
