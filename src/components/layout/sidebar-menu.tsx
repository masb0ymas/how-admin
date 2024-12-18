'use client'

import {
  IconBinaryTree,
  IconCategory,
  IconChartAreaLine,
  IconDeviceAnalytics,
  IconHistory,
  IconHome2,
  IconPictureInPictureTop,
  IconReceipt,
  IconTableShare,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'

const navMain = [
  {
    title: 'Dashboard',
    url: '/',
    icon: IconHome2,
  },
]

const navWebinar = [
  {
    title: 'Mini - Courses',
    url: '/mini-courses',
    icon: IconPictureInPictureTop,
  },
]

const navWebinarPrivate = [
  {
    title: 'Webinar Batch',
    url: '/webinar-batch',
    icon: IconTableShare,
  },
  {
    title: 'Private Plan',
    url: '/private-plan',
    icon: IconPictureInPictureTop,
  },
  {
    title: 'Private Courses',
    url: '/private-courses',
    icon: IconDeviceAnalytics,
  },
  {
    title: 'Membership',
    url: '/private-membership',
    icon: IconUsers,
  },
]

const navTransaction = [
  {
    title: 'Transaction',
    url: '/transaction',
    icon: IconHistory,
  },
  {
    title: 'Payout',
    url: '/payout',
    icon: IconReceipt,
  },
]

const navAnalytics = [
  {
    title: 'Analytics',
    url: '/analytics',
    icon: IconChartAreaLine,
  },
]

const navAccount = [
  {
    title: 'User Management',
    url: '/user-management',
    icon: IconUser,
  },
  {
    title: 'Role Permissions',
    url: '/role-permissions',
    icon: IconBinaryTree,
  },
  {
    title: 'Sessions',
    url: '/sessions',
    icon: IconHistory,
  },
]

const navSettings = [
  {
    title: 'Category',
    url: '/category',
    icon: IconCategory,
  },
]

// This is sample data.
export const sidebarMenu = [
  {
    title: 'Main',
    items: navMain,
  },
  {
    title: 'Webinar',
    items: navWebinar,
  },
  {
    title: 'Webinar Private',
    items: navWebinarPrivate,
  },
  {
    title: 'Transaction',
    items: navTransaction,
  },
  {
    title: 'Analytics',
    items: navAnalytics,
  },
  {
    title: 'Account',
    items: navAccount,
  },
  {
    title: 'Settings',
    items: navSettings,
  },
]
