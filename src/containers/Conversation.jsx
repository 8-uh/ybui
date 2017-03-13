/**
* Conversation UI
*/

import React, { Component } from 'react'
import autoBind from 'auto-bind'
import { ThemeProvider } from 'styled-components'
import { generateMnemonic } from 'bip39'
import theme from '../theme'

import Container from '../primitives/Container'
import UserInput from '../primitives/UserInput'
import Message from '../components/Message'
import MessageArea from '../primitives/MessageArea'
import Loading from '../components/Loading'
import SubmitButton from '../primitives/SubmitButton'

var hdkey = require('ethereumjs-wallet/hdkey')
var Web3 = require('web3')
var web3 = new Web3()

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
      currentJson: ''
    }
    console.log(web3)
  }

  // componentWillMount () {
  //   const { questions, questionNumber } = this.state
  // }

  componentDidMount () {
    this.userInput.focus()
  }

  createWallet (e) {
    e.preventDefault()
    var seed = generateMnemonic()
    return hdkey.fromMasterSeed(seed).getWallet()
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
    }, () => {
      this.nextQuestion()
    })
  }

  handleButtonSelect (select) {
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
        [this.state.questions[this.state.questionNumber].key]: select.value
      } : {
        ...this.state.answers
      }
    }, () => {
      this.nextQuestion()
    })
  }

  finalMessage () {
    return {
      text: 'Thank you!',
      type: 'final',
      sender: 'BOT'
    }
  }

  loadJsonData (key) {
    const questions = require('../questions/' + key + '.json')
    this.setState({
      questions: questions.map(question => {
        return {
          ...question,
          sender: 'BOT'
        }
      })
    })
  }

  nextQuestion () {
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

  submitUserInput (e) {
    e.preventDefault()
    if (this.state.userInput.length > 0) {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: this.state.userInput,
            type: 'USER'
          }
        ],
        userInput: '',
        currentJson: 'text',
        questionNumber: 0
      }, () => {
        this.loadJsonData(this.state.currentJson)
        this.nextQuestion()
      })
    } else {
      this.setState({
        currentJson: 'button',
        questionNumber: 0
      }, () => {
        this.loadJsonData(this.state.currentJson)
        this.nextQuestion()
      })
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
                active={messages.length === index + 1}
            />
          )}
            {this.state.loadingBot && <Loading bot />}
            {this.state.userInput.length > 0 && <Loading user />}
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
              <SubmitButton><i className='material-icons'>blur_on</i></SubmitButton>
            </form>
          </div>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Conversation
