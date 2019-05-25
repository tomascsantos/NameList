import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Attribute from "./Attribute";
import {DropzoneArea} from "material-ui-dropzone";
import Amplify, {API, Auth} from "aws-amplify";
import {s3Upload} from "../libs/awsLibs";
import awsconfig from "../aws-exports";
import jwtDecode from "jwt-decode";

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

class AddApplicant extends Component {
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
            bids: "",
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
        this.file = event[0];
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true,});

        try {
            const attachment = this.file
            ? await s3Upload(this.file)
            : null;

            const sessionIdInfo = await Auth.currentSession().then((session) => {
                return jwtDecode(session.getIdToken().jwtToken);
            });
            let group = sessionIdInfo["cognito:groups"][0];
            let userId = sessionIdInfo["cognito:username"];
            await this.createMember(group, userId, attachment);
            this.setState({
                isLoading: null,
                open: false,
                name: "",
                intelligence: "",
                looks: "",
                social: "",
                contact: "",
                year: "",
                bids: "",
            });
            this.file = null;
        } catch (e) {
            alert(e);
        }
        this.setState({isLoading: false});
        this.props.reload();
    };

     createMember(groupId, userId, photo) {
        //TODO change to name that makes sense.
        let uniqueId = this.state.name + "-" + userId;

        let original = true;

        console.log("is original? ", original)
        return API.post("namelistAPI", "/applicants", {
            headers: {
            },
            body: {
                "userId": uniqueId,
                "name": this.state.name,
                "groupId": groupId,
                "intelligence": this.state.intelligence,
                "looks": this.state.looks,
                "social": this.state.social,
                "contact": this.state.contact,
                "year": this.state.year,
                "bids": this.state.bids,
                "contactId": userId,
                "image": photo,
                "original": original,
            }
        }).catch(er => {
            console.log("Our error: ", er)
        })
    }

    validForm() {
        return this.state.name &&
            this.state.contact &&
            this.state.intelligence &&
            this.state.looks &&
            this.state.social &&
            this.state.year &&
            this.file
    }

    checkState() {
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.handleOpen} variant={"contained"} color={"primary"}>Add Rushie </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    disableEnforceFocus={true}
                    disableBackdropClick={true}
                >
                    <DialogTitle id="form-dialogue-title"> Add New Rushie </DialogTitle>
                    <DialogContent>
                        <Attribute
                            name={"name"}
                            value={this.state.name}
                            handleChange={this.handleChange("name")}
                            label={"Rushie Name"}
                            type={"string"}
                        />
                        <Attribute
                            name={"contact"}
                            value={this.state.contact}
                            handleChange={this.handleChange("contact")}
                            label={"Your Name (You are his contact!)"}
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
                            name={"bids"}
                            value={this.state.bids}
                            handleChange={this.handleChange("bids")}
                            label={"Would you bid?"}
                            type={"menu"}
                            selectors={
                                [
                                    {
                                        value: 1,
                                        label: "Yes"
                                    },
                                    {
                                        value: 0,
                                        label: "Not Sure"
                                    },
                                    {
                                        value: -1,
                                        label: "No"
                                    }
                                ]
                            }
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
                                        value: 'Freshman',
                                        label: 'Freshman',
                                    },
                                    {
                                        value: 'Sophomore',
                                        label: 'Sophomore',
                                    },
                                    {
                                        value: 'Junior',
                                        label: 'Junior',
                                    },
                                    {
                                        value: 'Senior',
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleSubmit}
                            color="primary"
                            //disabled={!this.validForm()}
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

export default withStyles(styles)(AddApplicant);
