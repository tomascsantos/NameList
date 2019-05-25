import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from "../Routes"
import {cyan} from "@material-ui/core/colors";
import MenuBar from "../components/MenuBar";
import Auth from '@aws-amplify/auth';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#43a047',
        },
        secondary: cyan,
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App rushieList">
                    <MenuBar/>
                    <Routes/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withAuthenticator(App, {
    includeGreetings: true,
});

