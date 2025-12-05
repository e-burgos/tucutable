import React, { useEffect, useState } from 'react';
import tucuTheme from './themes/TucuTheme';
import {
  Title,
  Subtitle,
  Description,
  Controls,
  Meta,
  Primary,
} from '@storybook/addon-docs/blocks';
import { ReactRenderer, Preview, StoryContext } from '@storybook/react-vite';
import { PartialStoryFn } from 'storybook/internal/types';
import '../src/assets/css/index.css';

const ThemeDecorator = (
  Story: PartialStoryFn<ReactRenderer, object>,
  context: StoryContext
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_mode, setMode] = useState<'dark' | 'light'>('dark');
  const { theme } = context.globals;
  const htmlTag = document.documentElement;
  const storybookRoot = document.getElementById('storybook-root');

  useEffect(() => {
    if (storybookRoot) {
      storybookRoot.style.width = '100%';
      storybookRoot.style.height = '100%';
      storybookRoot.style.display = 'flex';
      storybookRoot.style.justifyContent = 'center';
      storybookRoot.style.alignItems = 'center';
    }
    if (htmlTag) {
      if (theme === 'dark') {
        setMode('dark');
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        setMode('light');
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, theme, setMode, storybookRoot]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Story />
    </div>
  );
};

const decorators = [ThemeDecorator];

const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'Theme',
    description: 'Tucutable theme',
    defaultValue: 'dark',
    toolbar: {
      dynamicTitle: true,
      items: [
        { value: 'light', title: '☀️ Light Mode' },
        { value: 'dark', title: '🌙 Dark Mode' },
      ],
    },
  },
};

const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
  docs: {
    theme: tucuTheme,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Controls />
        <Meta />

        <Primary />
      </>
    ),
  },
  layout: 'centered',
  chromatic: {
    autodocs: true,
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '900px',
        },
      },
    },
  },
  expanded: false,
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview: Preview = {
  decorators,
  globalTypes,
  parameters,
  tags: ['autodocs'],
};

export default preview;
