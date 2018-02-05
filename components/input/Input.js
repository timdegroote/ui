import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  IconChevronUpSmallOutline,
  IconChevronDownSmallOutline,
  IconWarningBadgedSmallFilled,
} from '@teamleader/ui-icons';
import InputMetaPropTypes from './InputMetaPropTypes';
import Counter from '../counter';
import theme from './theme.css';

export default class Input extends Component {
  static propTypes = {
    bold: PropTypes.bool,
    className: PropTypes.string,
    counter: PropTypes.number,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    iconPlacement: PropTypes.oneOf(['left', 'right']),
    id: PropTypes.string,
    meta: InputMetaPropTypes,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    step: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    iconPlacement: 'left',
    disabled: false,
    placeholder: '',
    readOnly: false,
    size: 'medium',
    step: 1,
  };

  constructor(props) {
    super(props);

    this.isNumberInput = Boolean(props.type === 'number');
    this.handleChange = ::this.onChange;
    this.handleIncreaseValue = ::this.increaseValue;
    this.handleDecreaseValue = ::this.decreaseValue;

    this.state = {
      value: this.isNumberInput ? Number(props.value) || '' : props.value || '',
    };
  }

  componentWillUpdate(props, state) {
    if (state.value) {
      this.props.onChange(state.value);
    }
  }

  onChange(event) {
    const value = event.target.value;

    this.setState(() => ({
      value: this.isNumberInput ? Number(value) : value,
    }));
  }

  increaseValue() {
    this.setState((previousState, props) => ({
      value: previousState.value ? previousState.value + props.step : props.step,
    }));
  }

  decreaseValue() {
    this.setState((previousState, props) => ({
      value: previousState.value ? previousState.value - props.step : -props.step,
    }));
  }

  renderInput() {
    const { bold, disabled, id, onBlur, onFocus, placeholder, readOnly, step, type } = this.props;
    const classNames = cx(theme['input'], {
      [theme['is-disabled']]: disabled,
      [theme['is-read-only']]: readOnly,
      [theme['is-bold']]: bold,
    });
    const props = {
      className: classNames,
      disabled: disabled,
      id,
      onBlur: onBlur,
      onChange: this.handleChange,
      onFocus: onFocus,
      placeholder,
      readOnly,
      step,
      type,
      value: this.state.value,
    };

    return <input {...props} />;
  }

  renderCounter() {
    if (this.props.counter) {
      return <Counter className={theme.counter} count={this.props.counter} color="ruby" size="small" />;
    }
  }

  renderSpinnerControls() {
    if (this.isNumberInput) {
      return (
        <div className={theme['spinner']}>
          <button className={theme['spinner-up']} onClick={this.handleIncreaseValue}>
            <IconChevronUpSmallOutline />
          </button>
          <button className={theme['spinner-down']} onClick={this.handleDecreaseValue}>
            <IconChevronDownSmallOutline />
          </button>
        </div>
      );
    }
  }

  renderErrorMessage() {
    if (this.props.meta && this.props.meta.error) {
      return <p className={theme['error']}>{this.props.meta.error}</p>;
    }
  }

  renderErrorIcon() {
    if (this.props.meta && this.props.meta.error) {
      return <IconWarningBadgedSmallFilled className={theme['feedback-icon']} />;
    }
  }

  render() {
    const { className, counter, icon, iconPlacement, size, meta } = this.props;
    const classNames = cx(theme.wrapper, theme[`is-${size}`], className, {
      [theme[`has-icon-${iconPlacement}`]]: icon,
      [theme['has-counter']]: counter,
      [theme['has-errors']]: Boolean(meta && meta.error),
      [theme['is-numeric']]: this.isNumberInput,
    });

    return (
      <div>
        <div className={classNames}>
          {icon &&
            createElement(icon, {
              className: theme.icon,
            })}

          {this.renderInput()}
          {this.renderCounter()}
          {this.renderSpinnerControls()}
          {this.renderErrorIcon()}
        </div>

        {this.renderErrorMessage()}
      </div>
    );
  }
}
