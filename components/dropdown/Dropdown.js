import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const keys = {
  DOWN: 40,
  UP: 38,
  RETURN: 13,
  TAB: 9,
  BACKSPACE: 8,
  ESCAPE: 27,
};

class DropDown extends Component {
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
    initialInputValue: PropTypes.string,
    emptyListLabel: PropTypes.string.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    listItems: [],
  };

  state = {
    active: true,
    selectedListItemIndex: -1,
    value: '',
    inputValue: '',
  };

  constructor (props) {
    super(...arguments);
    this.handleInputFocus = ::this.handleInputFocus;
    this.handleInputBlur = ::this.handleInputBlur;
    this.handleInputChange = ::this.handleInputChange;
    this.handleInputKeyDown = ::this.handleInputKeyDown;
    this.handleListItemMouseEnter = ::this.handleListItemMouseEnter;
    this.handleListItemMouseDown = ::this.handleListItemMouseDown;

    this.state.value = props.initialValue;
    this.state.inputValue = props.initialInputValue;
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
      const selectedListItemIndex = this.state.selectedListItemIndex + 1;
      if (selectedListItemIndex < this.props.listItems.length) {
        this.setState({
          selectedListItemIndex,
        });
      }
      break;
    }

    case keys.UP: {
      event.preventDefault();
      const selectedListItemIndex = this.state.selectedListItemIndex - 1;
      if (selectedListItemIndex >= -1) {
        this.setState({
          selectedListItemIndex,
        });
      }
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

  handleListItemMouseDown (listItem) {
    this.submitListItem(listItem);
  }

  submitListItem (listItem) {
    this.setState({
      value: listItem.value,
      inputValue: listItem.title || listItem.value,
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

    return(
      <div className={classNames}>
        <div className={theme.subtitle}>{emptyListLabel}</div>
      </div>
    );
  }

  render () {
    const {
      name,
      className,
      theme,
      placeholder,
    } = this.props;

    const {
      active,
      value,
      inputValue,
    } = this.state;

    return (
      <div className={cx(theme.container, className)}>
        <input type="hidden" name={name} value={value} onChange={() => {}} />
        <input
          ref="input"
          className={theme.input}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        {active &&
        <div className={theme['list-container']}>
          {this.renderList()}
        </div>
        }
      </div>
    );
  }
}

export default DropDown;
export { DropDown };
