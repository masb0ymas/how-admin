'use client'

import {
  IconBinaryTree,
  IconCategory,
  IconChartAreaLine,
  IconContract,
  IconDeviceAnalytics,
  IconHistory,
  IconHome2,
  IconNotebook,
  IconPictureInPictureTop,
  IconSettings,
  IconTableShare,
  IconUser,
  IconUsers,
  IconVideo,
} from '@tabler/icons-react'

// This is sample data.
export const sidebarMenu = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: IconHome2,
    },
    {
      title: 'Webinar',
      url: '#',
      icon: IconVideo,
      items: [
        {
          title: 'Mini - Courses',
          url: '/webinar/mini-courses',
          icon: IconPictureInPictureTop,
        },
        {
          title: 'Private - Courses',
          url: '/webinar/private-courses',
          icon: IconDeviceAnalytics,
        },
      ],
    },
    {
      title: 'Courses',
      url: '#',
      icon: IconNotebook,
      items: [
        {
          title: 'Smart Contracts',
          url: '/courses/smart-contracts',
          icon: IconContract,
        },
        {
          title: 'Data Analyst',
          url: '/courses/data-analyst',
          icon: IconDeviceAnalytics,
        },
      ],
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: IconChartAreaLine,
    },
    {
      title: 'Account',
      url: '#',
      icon: IconUsers,
      items: [
        {
          title: 'User Management',
          url: '/account/user-management',
          icon: IconUser,
        },
        {
          title: 'Role Permissions',
          url: '/account/role-permissions',
          icon: IconBinaryTree,
        },
        {
          title: 'Sessions',
          url: '/account/sessions',
          icon: IconHistory,
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
      items: [
        {
          title: 'Category',
          url: '/settings/category',
          icon: IconCategory,
        },
        {
          title: 'Webinar Batch',
          url: '/settings/webinar-batch',
          icon: IconTableShare,
        },
      ],
    },
  ],
}
