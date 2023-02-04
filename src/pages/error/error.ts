import tpl from './error.hbs';
import './error.scss';
import Block, { Props } from '../../core/block';

export type ErrorProps = Props & {
  title: string;
  subtitle: string;
};

export class ErrorPage extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    props.className = [...(props.className || []), 'error-page'];
    super({
      ...props,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const error404 = new ErrorPage({
  title: '404',
  subtitle: 'Не туда попали',
});

export const error500 = new ErrorPage({
  title: '500',
  subtitle: 'Мы уже фиксим',
});
