import React from 'react';
import { Button, IconButton } from '../../components';

const handleItemClick = () => {
  console.log('This item is so special that has a special handler');
};

const ButtonTest = () => (
  <section>
    <h2>Buttons</h2>

    <h3>Different button types</h3>
    <p>
      <Button primary onClick={handleItemClick}>Primary</Button>&nbsp;
      <Button secondary>Secondary</Button>&nbsp;
      <Button secondary bordered>Secondary bordered</Button>
    </p>

    <h3>Different button sizes</h3>
    <p>
      <Button primary>Small</Button>&nbsp;
      <Button primary medium>Medium</Button>&nbsp;
      <Button primary large>Large</Button>
    </p>
    <p>
      <Button secondary>Small</Button>&nbsp;
      <Button secondary medium>Medium</Button>&nbsp;
      <Button secondary large>Large</Button>
    </p>
    <p>
      <Button secondary bordered>Small</Button>&nbsp;
      <Button secondary medium bordered>Medium</Button>&nbsp;
      <Button secondary large bordered>Large</Button>
    </p>

    <h3>Icons</h3>
    <p>
      <Button primary icon="search">Primary</Button>&nbsp;
      <Button secondary icon="search">Secondary with icon</Button>&nbsp;
      <Button secondary bordered icon="search">Secondary bordered with icon</Button>
    </p>

    <h3>Icon only</h3>
    <p>
      <Button primary icon="search" />&nbsp;
      <Button primary medium icon="search" />&nbsp;
      <Button primary large icon="search" />
    </p>

    <h3>Processing</h3>
    <p>
      <Button primary processing>Primary processing</Button>&nbsp;
      <Button primary processing icon="search">Primary processing with icon</Button>&nbsp;
      <Button primary processing />
    </p>

    <h3>Disabled</h3>
    <p>
      <Button primary disabled>Primary  disabled</Button>&nbsp;
      <Button primary disabled icon="search">Primary disabled with icon</Button>&nbsp;
      <Button primary disabled icon="search" />
    </p>
    <p>
      <Button disabled>Secondary disabled</Button>&nbsp;
      <Button disabled icon="search">Secondary disabled with icon</Button>&nbsp;
      <Button disabled icon="search" />
    </p>
    <p>
      <Button bordered disabled>Secondary bordered disabled</Button>&nbsp;
      <Button bordered disabled icon="search">Secondary disabled with icon</Button>&nbsp;
      <Button bordered disabled icon="search" />
    </p>

    <h3>Processing</h3>
    <p>
      <Button processing>Secondary processing</Button>&nbsp;
      <Button processing icon="search">Secondary processing with icon</Button>&nbsp;
      <Button processing />
    </p>
    <p>
      <Button bordered processing>Secondary bordered processing</Button>&nbsp;
      <Button bordered processing icon="search">Secondary processing with icon</Button>&nbsp;
      <Button bordered processing />
    </p>

    <h3>Icon button</h3>

    <p><IconButton icon="search" /></p>
  </section>
);

export default ButtonTest;
