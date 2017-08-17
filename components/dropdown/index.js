import { themr } from 'react-css-themr';
import { DROPDOWN } from '../identifiers';

import Dropdown from './Dropdown';
import theme from './theme.css';

const ThemedDropdown = themr(DROPDOWN, theme)(Dropdown);

export default ThemedDropdown;
export { ThemedDropdown as Dropdown };
