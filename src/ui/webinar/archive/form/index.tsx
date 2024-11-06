'use client'

import { FormWebinarAdd, FormWebinarEdit } from '~/ui/webinar/partials/Form'

export function FormAdd() {
  return FormWebinarAdd({
    redirect_uri: '/webinar?tabs=archive',
  })
}

export function FormEdit() {
  return FormWebinarEdit({
    redirect_uri: '/webinar?tabs=archive',
  })
}
