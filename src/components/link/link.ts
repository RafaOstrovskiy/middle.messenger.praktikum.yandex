import tpl from './link.hbs';
import { PropsWithRouter, withRouting } from '../../hocs/withRouting';
import Block, { Props } from '../../core/block';

export type LinkProps = Props &
  PropsWithRouter & {
    to: string;
    label?: string;
    events?: {
      click: () => void;
    };
  };

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    props.className = [...(props.className || []), 'link'];
    if (!props.label) {
      props.label = 'x';
    }
    super(
      {
        ...props,
        events: {
          click: () => this.navigate(),
        },
      },
      'a',
    );
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const Link = withRouting(BaseLink);
