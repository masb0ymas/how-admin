'use client'

import { Avatar, Center, Stack, Text } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import cx from 'clsx'
import { env } from '~/config/env'
import classes from './partials/Loader.module.css'

type IProps = {
  loading: boolean
}

export default function VerifyPage(props: IProps) {
  const [colorScheme] = useLocalStorage({
    key: `${env.APP_PREFIX}-color-scheme`,
    defaultValue: 'light',
  })

  const logoSource = '/static/logo-how.png'
  const loadingText = 'Loading...'

  return (
    <div className={classes.wrapper}>
      <Center>
        <Stack gap={'xs'} align="center">
          <Avatar
            src={logoSource}
            alt="Logo"
            className={cx(classes.avatar, { [classes.anim]: props.loading })}
          />
          <Text
            lts={2}
            size="xl"
            fw={500}
            className={classes.text_writer}
            c={colorScheme === 'dark' ? 'white' : 'dark'}
          >
            {loadingText}
          </Text>
        </Stack>
      </Center>
    </div>
  )
}
