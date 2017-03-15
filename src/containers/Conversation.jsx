/**
* Conversation UI
*/

import React, { Component } from 'react'
import autoBind from 'auto-bind'
import { ThemeProvider } from 'styled-components'
import { generateMnemonic } from 'bip39'
import theme from '../theme'
import ReactDOM from 'react-dom'

import Container from '../primitives/Container'
import UserInput from '../primitives/UserInput'
import Message from '../components/Message'
import MessageArea from '../primitives/MessageArea'
import Loading from '../components/Loading'
import SubmitButton from '../primitives/SubmitButton'

var hdkey = require('ethereumjs-wallet/hdkey')
// var Web3 = require('web3')
// var web3 = new Web3()

class Conversation extends Component {
  constructor (props) {
    super(props)
    autoBind(this)
    this.state = {
      questions: [],
      questionNumber: 0,
      userInput: '',
      disableUserInput: false,
      messages: [],
      answers: {},
      loadingBot: false,
      currentJson: '',
      actions: {
        'button': true,
        'wallet': true,
        'text': true,
        'digitalassets': true
      },
      wallets: []
    }
    // console.log(web3)
  }

  // componentWillMount () {
  //   const { questions, questionNumber } = this.state
  // }

  componentDidMount () {
    this.userInput.focus()
    this.scrollToBottom()
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }

  createWallet () {
    var seed = generateMnemonic()
    var wallet = hdkey.fromMasterSeed(seed).getWallet()
    this.setState({
      messages: [
        ...this.state.messages,
        {
          'text': seed,
          'flash': true,
          'sender': 'BOT'
        }
      ],
      wallets: [
        ...this.state.wallets,
        wallet
      ]
    })
    console.log(this.state)
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
      }
    })
  }

  handleButtonSelect (select) {
    console.log(select)
    var state_object = this.loadJsonData(select.value)
    this.setState(state_object, () => {
      this.nextQuestion()
    })
  }

  onListSelect (select) {
    switch (select.value) {
      case 'wallet_create_new':
        const wallet = this.createWallet()
        console.log(wallet)
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
      type: 'nothing',
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
        messages: [
          ...this.state.messages,
          this.nothingFound()
        ]
      }
    }
    return state_object
  }

  nextQuestion () {
    console.log(this.state)
    this.setState({
      loadingBot: true,
      questionNumber: this.state.questionNumber + 1
    }, () => {
      if (this.state.questions[this.state.questionNumber].flash === true) {
        this.nextQuestion()
      }

      if (this.state.questionNumber < this.state.questions.length) {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.state.questions[this.state.questionNumber]
            ],
            loadingBot: false
          })

          if (this.state.questions[this.state.questionNumber].buttons ||
          this.state.questions[this.state.questionNumber].icons) {
            this.setState({
              disableUserInput: true
            })
          } else {
            this.setState({
              disableUserInput: false
            })
            this.userInput.focus()
          }
        }, 500)
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
      // this.setState({
      //   questionNumber: this.state.questionNumber + 1
      // })
    })
  }

  nextOldQuestion () {
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      loadingBot: true
    }, () => {
      if (this.state.questions[this.state.questionNumber].flash === true) {
        this.nextQuestion()
      }

      if (this.state.questionNumber < this.state.questions.length) {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.state.questions[this.state.questionNumber]
            ],
            loadingBot: false
          })

          if (this.state.questions[this.state.questionNumber].buttons ||
          this.state.questions[this.state.questionNumber].icons) {
            this.setState({
              disableUserInput: true
            })
          } else {
            this.setState({
              disableUserInput: false
            })
            this.userInput.focus()
          }
        }, 500)
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

  initialHandler (action) {
    const questions = require('../questions/initial.json')
    if (action === 'button') {
      this.setState({
        messages: [
          ...this.state.messages,
          questions[0]
        ],
        loadingBot: false
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
        userInput: ''
      })
    }
  }

  submitUserInput (e) {
    e.preventDefault()
    if (this.state.userInput.length > 0) {
      this.initialHandler('text')
    } else {
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
