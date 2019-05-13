import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Attribute from "./Attribute";
import MenuItem from "@material-ui/core/MenuItem";
import {DropzoneArea} from "material-ui-dropzone";
import Amplify, {API, Auth} from "aws-amplify";
import {s3Upload} from "../libs/awsLibs";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        marginRight: 20,
        marginLeft: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    yearselect: {
        width: 200,
        marginRight: 20,
        marginLeft: 20,
    }
});

class AddRushie extends Component {
    constructor(props) {
        super(props);

        //Any 1-10 attributes will be added when attribute selectors are added.
        this.state = {
            isLoading: null,
            open: false,
            name: "",
            intelligence: "",
            looks: "",
            social: "",
            contact: "",
            year: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkState = this.checkState.bind(this);
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleFileChange = event => {
        console.log("file cahnge event: ", event)
        this.file = event[0];
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true,});

        try {
            const attachment = this.file
            ? await s3Upload(this.file)
            : null

            console.log(Auth.currentUserInfo())
            await AddRushie.createMember();
            this.setState({open: false})
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    static createMember(userid) {
        //TODO change to name that makes sense.
        return API.post("namelist", "/members", {
            headers: {
            },
            body: {
                content: "this is the content"
            }
        }).catch(er => {
            console.log("Our error: ", er)
        })
    }

    validForm() {
        return this.state.name && this.state.contact
    }

    buildSelect()  {
        var arr = [];
        for (var i = 1; i <= 10; i++) {
            arr.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return arr
    }
    checkState() {
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.handleOpen}>Add Rushie </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    disableEnforceFocus={true}
                    disableBackdropClick={true}
                >
                    <DialogTitle id="form-dialogue-title"> Add New Rushie </DialogTitle>
                    <DialogContent>
                        <Attribute
                            name={"contact"}
                            value={this.state.contact}
                            handleChange={this.handleChange("contact")}
                            label={"Your Name (You are his contact!)"}
                            type={"string"}
                        />
                        <Attribute
                            name={"name"}
                            value={this.state.name}
                            handleChange={this.handleChange("name")}
                            label={"Rushie Name"}
                            type={"string"}
                        />
                        <Attribute
                            name={"intelligence"}
                            value={this.state.intelligence}
                            handleChange={this.handleChange("intelligence")}
                            label={"Intelligence"}
                            type={"scale"}
                        />
                        <Attribute
                            name={"looks"}
                            value={this.state.looks}
                            handleChange={this.handleChange("looks")}
                            label={"Looks"}
                            type={"scale"}
                        />
                        <Attribute
                            name={"social"}
                            value={this.state.social}
                            handleChange={this.handleChange("social")}
                            label={"Social"}
                            type={"scale"}
                        />
                        <Attribute
                            name={"year"}
                            value={this.state.year}
                            handleChange={this.handleChange("year")}
                            label={"Year"}
                            type={"menu"}
                            selectors={
                                [
                                    {
                                        value: 'freshman',
                                        label: 'Freshman',
                                    },
                                    {
                                        value: 'sophomore',
                                        label: 'Sophomore',
                                    },
                                    {
                                        value: 'junior',
                                        label: 'Junior',
                                    },
                                    {
                                        value: 'senior',
                                        label: 'Senior',
                                    },
                                ]
                            }
                        />
                        <DropzoneArea
                            margin={"normal"}
                            acceptedFiles={['image/jpeg', 'image/png']}
                            onChange={this.handleFileChange}
                            filesLimit={1}
                        />
                        <Button onClick={this.checkState}>Check state</Button>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleSubmit}
                            color="primary"
                            disabled={!this.validForm()}
                        >
                            Submit
                        </Button>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddRushie);
