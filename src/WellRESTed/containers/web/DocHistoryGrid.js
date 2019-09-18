import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { assign } from 'xstate/lib/actions'
import { useMachine } from 'use-machine'

const incAction = assign(context => ({ counter: context.counter + 1 }))

const machineConfig = {
  initial: 'Off',
  context: {
    counter: 0
  },
  states: {
    Off: { on: { Tick: { target: 'On', actions: [incAction, 'sideEffect'] } } },
    On: { on: { Tick: { target: 'Off', actions: incAction } } }
  }
}

const MachineContext = React.createContext()

function App() {
  const machine = useMachine(machineConfig, {
    actions: {
      sideEffect: () => console.log('sideEffect')
    }
  })

  function sendTick() {
    machine.send('Tick')
  }

  return (
    <div className="App">
      <span
        style={{
          backgroundColor: machine.state.matches('Off') ? 'red' : 'yellow'
        }}
      >
        {machine.state.matches('Off') ? 'Off' : 'On'}
      </span>
      <button onClick={sendTick}>Tick</button>
      Pressed: {machine.context.counter} times
      <MachineContext.Provider value={machine}>
        <div className="childs">
          <Child />
        </div>
      </MachineContext.Provider>
    </div>
  )
}

function Child() {
  const machine = useContext(MachineContext)
  return (
    <div>
      <div>
        Child state: {machine.state.matches('Off') ? 'Off' : 'On'}
      </div>
      <div>Child count: {machine.context.counter}</div>
      <OtherChild />
    </div>
  )
}

function OtherChild() {
  const machine = useContext(MachineContext)

  function sendTick() {
    machine.send('Tick')
  }
  return (
    <div>
      <div>
        OtherChild state: {machine.state.matches('Off') ? 'Off' : 'On'}
      </div>
      <div>OtherChild count: {machine.context.counter}</div>
      <button onClick={sendTick}>Tick 2</button>
    </div>
  )
}