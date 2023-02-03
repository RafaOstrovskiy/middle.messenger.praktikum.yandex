import tpl from './formError.hbs';
import './formError.scss';
import Block, { Props } from '../../core/block';

export type FormErrorProps = Props & {
  text: string;
};

export class FormError extends Block<FormErrorProps> {
  constructor(props: FormErrorProps) {
    props.className = [...(props.className || []), 'form-error'];
    super(props, 'small');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
