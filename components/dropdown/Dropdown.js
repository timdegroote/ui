import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FontIcon from '../font_icon';

const keys = {
  DOWN: 40,
  UP: 38,
  RETURN: 13,
  TAB: 9,
  BACKSPACE: 8,
  ESCAPE: 27,
};

class Dropdown extends Component {
  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    listItems: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      image: PropTypes.string,
    })),
    placeholder: PropTypes.string,
    theme: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string,
    initialValue: PropTypes.string,
    initialValueText: PropTypes.string,
    emptyListLabel: PropTypes.string.isRequired,
    action: PropTypes.shape({
      label: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    placeholder: '',
    listItems: [],
  };

  state = {
    active: true,
    selectedListItemIndex: -1,
    value: undefined,
    valueText: undefined,
    inputValue: '',
  };

  constructor (props) {
    super(...arguments);
    this.handleButtonClick = ::this.handleButtonClick;
    this.handleInputFocus = ::this.handleInputFocus;
    this.handleInputBlur = ::this.handleInputBlur;
    this.handleInputChange = ::this.handleInputChange;
    this.handleInputKeyDown = ::this.handleInputKeyDown;
    this.handleListItemMouseEnter = ::this.handleListItemMouseEnter;
    this.handleListItemMouseLeave = ::this.handleListItemMouseLeave;
    this.handleListItemMouseDown = ::this.handleListItemMouseDown;

    this.state.value = props.initialValue;
    this.state.valueText = props.initialValueText;
  }

  handleButtonClick () {
    const active = this.state.active;

    this.setState({
      active: !active,
    });

    if (!active) {
      setTimeout(() => {
        this.refs.input.focus();
      });
    } else {
      // we also want it to do the blur action,
      // because if we "deactivate" the dropdown (e.g. by clicking the button),
      // it will not render the input field anymore and it doesn't trigger a blur event either
      this.handleInputBlur();
    }
  }

  handleInputFocus () {
    if (this.props.onFocus) {
      this.props.onFocus();
    }

    this.setState({
      active: true,
    });
  }

  handleInputBlur () {
    if (this.props.onBlur) {
      this.props.onBlur();
    }

    this.setState({
      active: false,
      inputValue: '',
      selectedListItemIndex: -1,
    });
  }

  handleInputChange (event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleInputKeyDown (event) {
    switch (event.keyCode) {
    case keys.DOWN: {
      event.preventDefault();

      let selectedListItemIndex = this.state.selectedListItemIndex + 1;
      if (selectedListItemIndex >= this.props.listItems.length) {
        selectedListItemIndex = 0;
      }

      this.setState({
        selectedListItemIndex,
      });

      break;
    }

    case keys.UP: {
      event.preventDefault();
      let selectedListItemIndex = this.state.selectedListItemIndex - 1;
      if (selectedListItemIndex <= -1) {
        selectedListItemIndex = this.props.listItems.length - 1;
      }

      this.setState({
        selectedListItemIndex,
      });

      break;
    }

    case keys.RETURN: {
      event.preventDefault();
      const selectedListItemIndex = this.state.selectedListItemIndex;
      if (selectedListItemIndex > -1) {
        const listItem = this.getListItemByIndex(selectedListItemIndex);
        if (!listItem) {
          return;
        }

        this.submitListItem(listItem);
        this.refs.input.blur();
      }
      break;
    }
    }
  }

  handleListItemMouseEnter (index) {
    if (index === this.state.selectedListItemIndex) {
      return;
    }

    this.setState({
      selectedListItemIndex: index,
    });
  }

  handleListItemMouseLeave (index) {
    setTimeout(() => {
      if (index !== this.state.selectedListItemIndex) {
        return;
      }

      this.setState({
        selectedListItemIndex: -1,
      });
    });
  }

  handleListItemMouseDown (listItem) {
    this.submitListItem(listItem);
  }

  submitListItem (listItem) {
    this.setState({
      value: listItem.value,
      valueText: listItem.title || listItem.value,
      selectedListItemIndex: -1,
    });
  }

  getListItemByIndex (index) {
    if (typeof this.props.listItems[index] === 'undefined') {
      return null;
    }

    return this.props.listItems[index];
  }

  renderList () {
    if (!this.props.listItems || this.props.listItems.length === 0) {
      return this.renderEmptyList();
    }

    const { listItems } = this.props;

    return (
      <div>
        {listItems.map((listItem, index) => this.renderListItem(listItem, index))}
      </div>
    );
  }

  renderListItem (listItem, index) {
    const { theme } = this.props;
    const {
      value,
      title,
      subtitle,
      image,
    } = listItem;

    const isSelected = index === this.state.selectedListItemIndex;

    const classNames = cx(theme['list-item'], {
      [theme['selected']]: isSelected,
    });

    return (
      <div
        className={classNames}
        key={value}
        onMouseEnter={() => this.handleListItemMouseEnter(index)}
        onMouseLeave={() => this.handleListItemMouseLeave(index)}
        onMouseDown={() => this.handleListItemMouseDown(listItem)}
      >
        {image &&
        <div className={theme.image}>
          <img src={image} />
        </div>
        }
        <div className={theme.label}>
          <span className={theme.title}>{title || value}</span>
          {subtitle &&
          <span className={theme.subtitle}>{subtitle}</span>
          }
        </div>
      </div>
    );
  }

  renderEmptyList () {
    const {
      theme,
      emptyListLabel,
    } = this.props;

    const classNames = cx(theme['list-item'], theme['empty']);

    return (
      <div className={classNames}>
        <div className={theme.subtitle}>{emptyListLabel}</div>
      </div>
    );
  }

  renderAction() {
    const {
      action,
      theme,
    } = this.props;

    return (
      <div className={theme.action} onMouseDown={action.callback}>
        {action.label}
      </div>
    );
  }

  render () {
    const {
      name,
      className,
      theme,
      placeholder,
      action,
    } = this.props;

    const {
      active,
      value,
      valueText,
      inputValue,
    } = this.state;

    const hasValue = value !== undefined;

    const buttonClassNames = cx(theme.button, {
      [theme.placeholder]: !hasValue,
    });

    return (
      <div className={cx(theme.container, className)}>
        <input type="hidden" name={name} value={value} onChange={() => {}} />
        <a className={buttonClassNames} onMouseDown={this.handleButtonClick}>
          {hasValue ? (valueText || value) : placeholder}
          <span className={theme.arrow}><FontIcon className={theme.icon} value="chevron_down" /></span>
        </a>
        {active &&
        <div className={theme.dropdown}>
          <div className={theme['input-container']}>
            <input
              ref="input"
              className={theme.input}
              type="text"
              value={inputValue}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
            />
          </div>
          <div className={theme['list-container']}>
            {this.renderList()}
            {action &&
              <div>
                {this.renderAction()}
              </div>
            }
          </div>
        </div>
        }
      </div>
    );
  }
}

export default Dropdown;
export { Dropdown };
