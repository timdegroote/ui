import React from 'react';
import PropTable from "./components/propTable";
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { Store, State } from '@sambego/storybook-state';
import { Island, Link, QTip, TextBody } from '../components';
import { IconIdeaMediumOutline } from '@teamleader/ui-icons';

const store = new Store({
  closed: false,
});

const updateState = () => {
  store.set({ closed: !store.get('closed') });
};

storiesOf('Q-tip', module)
  .addDecorator((story, context) => withInfo({TableComponent: PropTable})(story)(context))
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Island paddingHorizontal={0} paddingVertical={6} style={{ width: '500px' }}>
      <State store={store}>
        <QTip highlighted={boolean('Highlighted', false)} onChange={updateState} icon={<IconIdeaMediumOutline />}>
          <TextBody color="teal">
            Lorem ipsum dolor sit amet, consectetur <Link href="#" inherit={false}>adipiscing</Link> elit.
          </TextBody>
        </QTip>
      </State>
    </Island>
  ));
