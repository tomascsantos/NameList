import React, {Component, Fragment} from 'react';
import { withStyles} from "@material-ui/styles";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {Auth} from "aws-amplify";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleLogout = async event => {
        await Auth.signOut();
        this.props.childProps.userHasAuthenticated(false);
        this.props.history.push("/login")
    };


    render() {
        const { classes } = this.props;

        console.log(this.props.childProps);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Name List
                        </Typography>

                        {this.props.childProps.isAuthenticated
                            ?<Button onClick={this.handleLogout}>Logout</Button>
                            : <Fragment>
                                <Button component={ RouterLink } to={"/login"} color="inherit">Login</Button>
                                <Button component={ RouterLink } to={"/signup"} color="inherit">Sign Up</Button>
                              </Fragment>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(MenuBar));