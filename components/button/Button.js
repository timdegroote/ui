import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../loadingSpinner';
import cx from 'classnames';
import theme from './theme.css';

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    level: PropTypes.oneOf(['outline', 'primary', 'secondary', 'destructive']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.element,
    iconPlacement: PropTypes.oneOf(['left', 'right']),
    inverse: PropTypes.bool,
    label: PropTypes.string,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    processing: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    fullWidth: false,
    level: 'secondary',
    iconPlacement: 'left',
    inverse: false,
    processing: false,
    size: 'medium',
    type: 'button',
  };

  getSpinnerColor() {
    const { inverse, level } = this.props;

    return level === 'secondary' || (level === 'outline' && !inverse) ? 'teal' : 'white';
  }

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
    const {
      children,
      className,
      level,
      disabled,
      fullWidth,
      href,
      icon,
      iconPlacement,
      inverse,
      label,
      size,
      type,
      processing,
      ...others
    } = this.props;

    const element = href ? 'a' : 'button';

    const classNames = cx(
      theme['button'],
      theme[level],
      {
        [theme['icon-only']]: !label && !children,
        [theme['inverse']]: inverse && level === 'outline',
        [theme['is-full-width']]: fullWidth,
        [theme['processing']]: processing,
        [theme[size]]: theme[size],
      },
      className,
    );

    const props = {
      ...others,
      href,
      ref: node => {
        this.buttonNode = node;
      },
      className: classNames,
      disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      type: !href ? type : null,
      'data-teamleader-ui': 'button',
    };

    return React.createElement(
      element,
      props,
      icon && iconPlacement === 'left' ? icon : null,
      label || children ? (
        <span className={theme['children']}>
          {label}
          {children}
        </span>
      ) : null,
      icon && iconPlacement === 'right' ? icon : null,
      processing ? (
        <LoadingSpinner
          className={theme['spinner']}
          color={this.getSpinnerColor()}
          size={size === 'small' ? 'small' : 'medium'}
        />
      ) : null,
    );
  }
}

export default Button;
export { Button };
