import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './theme.css';

class LinkButton extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    element: PropTypes.element,
    icon: PropTypes.element,
    iconPlacement: PropTypes.oneOf(['left', 'right']),
    inverse: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };

  static defaultProps = {
    className: '',
    iconPlacement: 'left',
    inverse: false,
    size: 'medium',
  };

  handleMouseUp = event => {
    this.buttonNode.blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  handleMouseLeave = event => {
    this.buttonNode.blur();
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  render() {
    const { children, className, disabled, element, icon, iconPlacement, inverse, label, size, ...others } = this.props;

    const Element = element || 'button';

    const classNames = cx(
      theme['link-button'],
      {
        [theme['has-icon-only']]: !label && !children,
        [theme['is-disabled']]: disabled,
        [theme['is-inverse']]: inverse,
        [theme[size]]: theme[size],
      },
      className,
    );

    const props = {
      ...others,
      ref: node => {
        this.buttonNode = node;
      },
      className: classNames,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      'data-teamleader-ui': 'link-button',
    };

    return React.createElement(
      Element,
      props,
      icon && iconPlacement === 'left' && icon,
      (label || children) && (
        <span className={theme['children']}>
          {label}
          {children}
        </span>
      ),
      icon && iconPlacement === 'right' && icon,
    );
  }
}

export default LinkButton;
export { LinkButton };
