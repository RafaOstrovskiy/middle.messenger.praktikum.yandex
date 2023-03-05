import tpl from './form-input.hbs';
import Block, { Props } from '../../core/block';
import { FormError } from '../input-error';
import './form-input.scss';
import { Input, InputProps } from '../input';

export type FormInputProps = Props &
  InputProps & {
    label?: string;
    errorMessage?: FormError;
  };

export class FormInput extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    props.className = [...(props.className || [])];
    super(
      {
        ...props,
        label: props.label,
        input: new Input(props),
        errorMessage: new FormError({ text: '' }),
      },
      'div',
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}