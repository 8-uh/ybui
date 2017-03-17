/**
* Conversation UI
*/

import React, { Component } from 'react'
import autoBind from 'auto-bind'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import ReactDOM from 'react-dom'

import Container from '../primitives/Container'
import UserInput from '../primitives/UserInput'
import Message from '../components/Message'
import MessageArea from '../primitives/MessageArea'
import Loading from '../components/Loading'
import SubmitButton from '../primitives/SubmitButton'
import update from 'immutability-helper'

var lightwallet = require('eth-lightwallet')
var store = require('store')

var daContract = '0x6c63857ee0a9d93db8927a3b4af9a7ff20da0a9c'
var daContractABI = [{'constant': false, 'inputs': [{'name': 'hash', 'type': 'bytes'}], 'name': 'getAssetByHash', 'outputs': [{'name': '_created', 'type': 'uint256'}, {'name': '_active', 'type': 'bool'}, {'name': '_hashValue', 'type': 'bytes'}, {'name': '_owner', 'type': 'address'}], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'Assets', 'outputs': [{'name': 'created', 'type': 'uint256'}, {'name': 'active', 'type': 'bool'}, {'name': 'hashValue', 'type': 'bytes'}, {'name': 'owner', 'type': 'address'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'getMyAssetsIndex', 'outputs': [{'name': 'index', 'type': 'uint256[]'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_created', 'type': 'uint256'}, {'name': '_active', 'type': 'bool'}, {'name': '_hashValue', 'type': 'bytes'}], 'name': 'addAsset', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'index', 'type': 'uint256'}, {'name': '_senderAddress', 'type': 'address'}], 'name': 'getAssetsByIndex', 'outputs': [{'name': '_created', 'type': 'uint256'}, {'name': '_active', 'type': 'bool'}, {'name': '_hashValue', 'type': 'bytes'}, {'name': '_owner', 'type': 'address'}], 'payable': false, 'type': 'function'}]

import crypto from 'crypto'
const sourceCreateHash = crypto.createHash
crypto.createHash = function createHash (alg) {
  if (alg === 'ripemd160') {
    alg = 'rmd160'
  }
  return sourceCreateHash(alg)
}
var Web3 = require('web3')
var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://eth.lightrains.com'))

class Conversation extends Component {
  constructor (props) {
    super(props)
    autoBind(this)

    this.state = {
      questions: [],
      questionNumber: 0,
      userInput: '',
      userInputInit: true,
      disableUserInput: false,
      messages: [],
      answers: {},
      loadingBot: false,
      currentJson: '',
      actions: {
        'button': true,
        'wallet': true,
        'text': true,
        'digitalassets': true,
        send: true
      },
      wallets: [],
      secretSeed: ''
    }

    var initailState = store.get('state')
    if (typeof initailState !== 'undefined') {
      this.state = initailState
    } else {
      store.set('state', this.state)
    }
  }

  // componentWillMount () {
  //   const { questions, questionNumber } = this.state
  // }

  componentDidMount () {
    this.userInput.focus()
    this.scrollToBottom()
  }
  componentDidUpdate () {
    store.set('state', this.state)
    this.scrollToBottom()
  }

  createWalletInit () {
    var secretSeed = lightwallet.keystore.generateRandomSeed()
    this.setState({
      messages: [
        ...this.state.messages,
        {
          'text': 'Copy the string for future reference',
          'status': secretSeed,
          'flash': true,
          'sender': 'BOT'
        }
      ],
      secretSeed: secretSeed,
      userInputInit: false
    }, () => {
      this.nextQuestion()
    })
  }

  createWallet (password) {
    var secretSeed = this.state.secretSeed

    var opts = {
      password: password,
      seedPhrase: secretSeed
    }
    var $this = this
    lightwallet.keystore.createVault(opts, function (err, vault) {
      vault.keyFromPassword(opts.password, function (err, pwDerivedKey) {
        if (err) throw err

        vault.generateNewAddress(pwDerivedKey, 1)
        var addr = vault.getAddresses()

        $this.setState({
          messages: [
            ...$this.state.messages,
            {
              'text': 'Wallet created Successfully!',
              'flash': true,
              'sender': 'BOT'
            }
          ],
          wallets: [
            ...$this.state.wallets,
            {
              'seed': secretSeed,
              'ks': vault.serialize(),
              'address': addr
            }
          ],
          userInputInit: true,
          questionNumber: 1
        }, () => {
          $this.nextQuestion()
        })
      })
    })
  }

  listWallet () {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          'text': 'Wallet List',
          'list_data': this.state.wallets,
          'flash': true,
          'sender': 'BOT'
        }
      ]
    })
  }

  scrollToBottom () {
    const node = ReactDOM.findDOMNode(this.messagesEnd)
    node.scrollIntoView({behavior: 'smooth'})
  }

  handleUserInput (e) {
    e.preventDefault()
    this.setState({
      userInput: e.target.value
    })
  }

  handleIconClick (select) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text: select.text,
          type: 'USER'
        }
      ],
      answers: this.state.questions[this.state.questionNumber].key ? {
        ...this.state.answers,
        [this.state.questions[this.state.questionNumber].key]: select.icon
      } : {
        ...this.state.answers
      },
      disableUserInput: false
    }, () => {
      this.userInput.focus()
    })
  }

  handleButtonSelect (select) {
    var state_object = this.loadJsonData(select.value)
    this.setState(state_object, () => {
      this.nextQuestion()
    })
  }

  onListSelect (select) {
    switch (select.value) {
      case 'wallet_create_new':
        this.createWalletInit()
        break
      case 'wallet_list':
        this.listWallet()
        break

      default:
        console.log(select)
    }
  }

  finalMessage () {
    return {
      text: 'Thank you!',
      type: 'final',
      sender: 'BOT'
    }
  }

  nothingFound () {
    return {
      text: 'This feature is not implemeted yet!',
      type: 'flash',
      sender: 'BOT'
    }
  }

  loadJsonData (key) {
    console.log('--- Loading json: ' + key)
    var state_object = {}
    if (key in this.state.actions) {
      const questions = require('../questions/' + key + '.json')
      state_object = {
        questionNumber: 0,
        currentJson: key,
        loadingBot: false,
        questions: questions.map(question => {
          return {
            ...question,
            sender: 'BOT'
          }
        })
      }
    } else {
      state_object = {
        questionNumber: 0,
        currentJson: '',
        questions: [],
        loadingBot: false,
        disableUserInput: false,
        messages: [
          ...this.state.messages,
          this.nothingFound()
        ]
      }
      this.userInput.focus()
    }
    return state_object
  }

  nextQuestion () {
    this.setState({
      loadingBot: true,
      questionNumber: this.state.questionNumber + 1
    }, () => {
      if (this.state.questions[this.state.questionNumber].flash === true) {
        this.setState({
          messages: [
            ...this.state.messages,
            this.state.questions[this.state.questionNumber]
          ]
        }, () => {
          this.nextQuestion()
        })
      }

      if (this.state.questionNumber < this.state.questions.length) {
        // setTimeout(() => {
        console.log(this.state.questions[this.state.questionNumber])
        this.setState({
          messages: [
            ...this.state.messages,
            this.state.questions[this.state.questionNumber]
          ],
          loadingBot: false
        })

        if (this.state.questions[this.state.questionNumber].buttons ||
          this.state.questions[this.state.questionNumber].icons ||
          this.state.questions[this.state.questionNumber].lists) {
          this.setState({
            disableUserInput: true
          })
        } else {
          this.setState({
            disableUserInput: false
          })
          this.userInput.focus()
        }
        // }, 500)
      } else {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.finalMessage()
            ],
            loadingBot: false,
            disableUserInput: true
          })
          this.props.onEnded(this.state.answers)
        }, 500)
      }
    })
  }

  logicalAction (key) {
    switch (key) {
      case 'wallet_pass':
        var password = this.state.userInput
        this.setState({
          userInput: ''
        }, () => {
          this.createWallet(password)
        })
        break
      default:

    }
  }

  handleFiles (files) {
    this.scrollToBottom()
    var res = JSON.parse(files.xhr.response)

    console.log(res.hash)

    var MyContract = web3.eth.contract(daContractABI)
    var myContractInstance = MyContract.at(daContract)
    console.log(myContractInstance)
    var result = myContractInstance.addAsset(123, 1, res.hash, {from: web3.eth.coinbase})
    console.log(this.state.messages)
    console.log((this.state.messages.length - 1))

    this.setState((prevState) => ({
      data: update(prevState.messages, {$splice: [[(this.state.messages.length - 1), 1]]})
    }))
  }

  initialHandler (action) {
    const questions = require('../questions/initial.json')
    if (action === 'button') {
      this.setState({
        messages: [
          ...this.state.messages,
          questions[0]
        ],
        loadingBot: false,
        disableUserInput: true
      })
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: this.state.userInput,
            type: 'USER'
          },
          questions[1]
        ],
        userInput: '',
        disableUserInput: true
      })
    }
  }

  submitUserInput (e) {
    e.preventDefault()
    if (this.state.userInput.length > 0) {
      console.log('length', this.state)
      if (this.state.userInputInit) {
        this.initialHandler('text')
      } else {
        this.logicalAction(this.state.messages[this.state.messages.length - 1].key)
      }
    } else {
      console.log(this.state)
      this.initialHandler('button')
    }
  }

  render () {
    const { messages, userInput, answers, disableUserInput } = this.state
    return (
      <ThemeProvider theme={this.props.theme || theme}>
        <Container>
          <MessageArea
            innerRef={div => this.messageArea = div}
          >
            {messages.map((message, index) =>
              <Message
                key={index}
                message={message}
                answers={answers}
                onButtonSelect={this.handleButtonSelect}
                onIconClick={this.handleIconClick}
                onListClick={this.onListSelect}
                onFilesUpload={this.handleFiles}
                active={messages.length === index + 1}
            />
          )}
            {this.state.loadingBot && <Loading bot />}
            {this.state.userInput.length > 0 && <Loading user />}
            <div style={{float: 'left', clear: 'both'}}
              ref={(el) => { this.messagesEnd = el }} />
          </MessageArea>
          <div className='userInputForm'>
            <form onSubmit={e => this.submitUserInput(e)}>
              <UserInput
                type='text'
                value={userInput}
                autofocus='autofocus'
                innerRef={input => this.userInput = input}
                onChange={e => this.handleUserInput(e)}
                disabled={disableUserInput}
              />
              <SubmitButton><i className='material-icons md-48'>add</i></SubmitButton>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Conversation
