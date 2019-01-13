import React, { Component } from 'react';
import './App.css';

//components
import RushieList from '../components/RushieList';

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


class App extends Component {

    constructor(props) {
        super(props);
    }




  render() {
    return (
      <div className="App rushieList">
          <Grid container spacing={24}>
              <Grid item xs={12}>
                <RushieList/>
              </Grid>

          </Grid>
      </div>
    );
  }
}

export default App;
