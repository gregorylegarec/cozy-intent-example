/* global cozy */
import styles from '../styles/app'

import React, { Component } from 'react'
import { translate } from '../lib/I18n'
import classNames from 'classnames'

function getQueryStringParam (key) {
  const queryString = window.location.search.substring(1)

  return queryString ? queryString.split('&').reduce((accumulator, param) => {
    const keyValue = param.split('=')
    return keyValue.length && keyValue[0] === key
      ? keyValue[1]
      : accumulator
  }, null) : null
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      handshaking: false,
      handshaked: false
    }
  }

  componentDidMount () {
    const id = getQueryStringParam('intent')

    this.setState({handshaking: true})

    cozy.client.intents
      .createService(id, window)
      .then(service => {
        this.setState({
          handshaking: false,
          hanshaked: false,
          terminating: false
        })
        console.debug('handshake success ! data : ', service.getData())

        setTimeout(() => {
          this.setState({
            terminating: true
          })

          setTimeout(() => {
            console.debug('Terminating !')
            service.terminate({
              type: 'io.cozy.files',
              name: 'example'
            })
          }, 1000)
        }, 2000)
      })
  }

  render ({ t }) {
    const { handshaking, handshaked, terminating } = this.state
    return (
      <div>
        <h1 className={classNames(styles['title'])}>{ t('App.welcome') }</h1>
        <ul>
          { handshaking &&
            <li>Handshake started</li> }
          { handshaked &&
            <li>Handshake done</li> }
          { terminating &&
            <li>Terminating intent in 1s</li> }
        </ul>
      </div>
    )
  }
}

export default translate()(App)
