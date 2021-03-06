import React from 'react';
import PropTable from "./components/propTable";
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import { Banner, Link, TextDisplay } from '../components';
import { IconIdeaMediumOutline } from '@teamleader/ui-icons';

const colors = ['white', 'neutral', 'mint', 'violet', 'ruby', 'gold', 'aqua'];

storiesOf('Banner', module)
  .addDecorator((story, context) => withInfo({TableComponent: PropTable})(story)(context))
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Banner
      color={select('Color', colors, 'white')}
      fullWidth={boolean('Full width', false)}
      icon={<IconIdeaMediumOutline />}
    >
      <TextDisplay>
        {text('Banner text', 'I am a banner and contain text that appears across multiple lines depending on how wide I am.')}
      </TextDisplay>
    </Banner>
  ))
  .add('With link inside', () => (
    <Banner
      color={select('Color', colors, 'white')}
      fullWidth={boolean('Full width', false)}
      icon={<IconIdeaMediumOutline />}
    >
      <TextDisplay>
        I am a banner with an <Link href="http://teamleader.eu">optional link</Link> inside.
      </TextDisplay>
    </Banner>
  ));
