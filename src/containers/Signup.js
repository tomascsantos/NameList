import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/es/Typography/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Auth } from "aws-amplify";



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
            });
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({ isLoading: false });
    };

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});
        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/")
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    renderConfirmationForm() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <cssBaseline/>
                <paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography>
                        Confirm Your Email
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleConfirmationSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="confimationcode">Confirmation Code</InputLabel>
                            <Input value={this.state.confirmationCode} onChange={this.handleChange} type="tel" id="confirmationCode" name="confirmationCode" autoComplete="off" autoFocus/>
                        </FormControl>
                        <LoaderButton
                            fullWidth
                            variant={"contained"}
                            type="submit"
                            disabled={!this.validateConfirmationForm()}
                            isLoading={this.state.isLoading}
                            text={"Verify"}
                            loadingText={"Verifying..."}
                            color="primary"
                            className={classes.submit}
                        />
                    </form>
                </paper>
            </main>
        );
    }

    renderForm() {
        const { classes } = this.props;

        return (

            <main className={classes.main}>
                <cssBaseline/>
                <paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography>
                        Sign Up!
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input value={this.state.email} onChange={this.handleChange} id="email" name="email" autoComplete="email" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input value={this.state.password} onChange={this.handleChange} name="password" type="password" id="password" autoComplete="current-password"/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                            <Input value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword" type="password" id="confirmPassword" autoComplete="current-password"/>
                        </FormControl>
                        <LoaderButton
                            fullWidth
                            variant={"contained"}
                            type="submit"
                            disabled={!this.validateForm()}
                            isLoading={this.state.isLoading}
                            text={"Signup"}
                            loadingText={"Signing up..."}
                            color="primary"
                            className={classes.submit}
                        />
                    </form>
                </paper>
            </main>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}

export default withStyles(styles)(Signup);