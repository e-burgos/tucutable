import { useMemo } from 'react';
import { LucideIcons, type AppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { Introduction } from '../pages/introduction';
import { BasicUsage } from '../pages/basic-usage/index';

export const useMenuItems = () => {
  const menuItems: AppRoutesMenuItem[] = useMemo(
    () => [
      {
        name: 'Introduction',
        href: '/',
        icon: <LucideIcons.Home />,
        component: <Introduction />,
      },
      {
        name: 'Basic Usage',
        href: '/basic-usage',
        icon: <LucideIcons.Table />,
        component: <BasicUsage />,
      },
    ],
    []
  );

  return { menuItems };
};
