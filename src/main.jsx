/* global cozy */
import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { I18n } from './lib/I18n'

import App from './components/App'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  const applicationElement = document.querySelector('[role=application]')

  cozy.client.init({
    cozyURL: `//${applicationElement.dataset.cozyDomain}`,
    token: applicationElement.dataset.cozyToken
  })

  render((
    <I18n context={context} lang={lang}>
      <App />
    </I18n>
  ), applicationElement)
})
