import React, { Component } from "react";
import {Grommet, Box, Button} from 'grommet'
import {StartView, MainView} from './components/Views'
import "./style/Main.css"
import { deepMerge } from 'grommet/utils'
import { grommet} from 'grommet/themes'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { storeFactory } from './store/store'
import theme from './theme'

const store = storeFactory()
console.log(store.getState())
function App() {
  return (
    <Grommet theme={theme} full={true}>
      <Provider store={store}>
        <Box fill background='dark'>
          {
            <Router>
                <Route exact path="/" component={() => <StartView store={store}/>}/>
                <Route path="/edit" component={MainView}/>
            </Router>
          }
        </Box>
      </Provider>
    </Grommet>
  );
}

export default App;
