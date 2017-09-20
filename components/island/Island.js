import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';
import theme from './theme.css';

class Island extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf([ 'neutral', 'mint', 'violet', 'ruby', 'gold', 'aqua', 'white' ]),
    dark: PropTypes.bool,
  };

  static defaultProps = {
    color: 'white',
  };

  isDark (color) {
    if (color !== 'white' && color !== 'neutral') {
      return false;
    }

    return this.props.dark;
  }

  render () {
    const {
      children,
      className,
      color,
      ...others
    } = this.props;

    const isDark = this.isDark(color);

    const classes = cx(
      theme.island,
      className,
      theme[color],
      {
        [theme.dark]: isDark,
      }
    );

    const rest = omit(others, [
      'dark',
    ]);

    return (
      <div data-teamleader-ui="island" className={classes} {...rest}>
        {children}
      </div>
    );
  }
}

export default Island;
