import React, { Component } from 'react';
import './App.css';
import Rushie from './Rushie/Rushie';
import Grid from "@material-ui/core/Grid";

class App extends Component {
  render() {
    return (
      <div className="App rushieList">
          <Grid container spacing={24}>
              <Grid item xs={12}>
                  <Grid container justify="center" spacing={24}>
                      <Grid item>
                          <Rushie/>
                      </Grid>
                      <Grid item>
                          <Rushie/>
                      </Grid>
                      <Grid item>
                          <Rushie/>
                      </Grid>
                      <Grid item>
                          <Rushie/>
                      </Grid>
                      <Grid item>
                          <Rushie/>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;
