import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from "../Routes"
import {cyan} from "@material-ui/core/colors";
import MenuBar from "../components/MenuBar";
import {Auth} from "aws-amplify";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#43a047',
        },
        secondary: cyan,
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            this.userHasAuthenticated(true);
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({isAuthenticating: false})
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated});
    };

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };
        return (
            !this.state.isAuthenticating &&
            <MuiThemeProvider theme={theme}>
                <div className="App rushieList">
                    <MenuBar childProps={childProps}/>
                    <Routes childProps={childProps}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
