'use client'

import {
  IconBinaryTree,
  IconCards,
  IconCategory,
  IconChartAreaLine,
  IconContract,
  IconDeviceAnalytics,
  IconHistory,
  IconHome2,
  IconNotebook,
  IconPictureInPictureTop,
  IconReceipt,
  IconSettings,
  IconTableShare,
  IconUser,
  IconUsers,
  IconVideo,
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
    url: '/webinar/mini-courses',
    icon: IconPictureInPictureTop,
  },
]

const navWebinarPrivate = [
  {
    title: 'Webinar Batch',
    url: '/settings/webinar-batch',
    icon: IconTableShare,
  },
  {
    title: 'Private Plan',
    url: '/webinar/private-plan',
    icon: IconPictureInPictureTop,
  },
  {
    title: 'Private Courses',
    url: '/webinar/private-courses',
    icon: IconDeviceAnalytics,
  },
  {
    title: 'Membership',
    url: '/webinar/private-membership',
    icon: IconUsers,
  },
]

const navCourses = [
  {
    title: 'Data Analyst',
    url: '/courses/data-analyst',
    icon: IconDeviceAnalytics,
  },
  {
    title: 'Smart Contracts',
    url: '/courses/smart-contracts',
    icon: IconContract,
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
    url: '/transaction/payout',
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
]

const navSettings = [
  {
    title: 'Category',
    url: '/settings/category',
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
    title: 'Courses',
    items: navCourses,
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
