import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/es/Paper/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/es/Button/Button";
import AttributeSelector from "./AttributeSelector";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        minWidth: 200,
        marginRight: 20,
        marginLeft: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});

class AddRushie extends Component {
    constructor(props) {
        super(props);

        //Any 1-10 attributes will be added when attribute selectors are added.
        this.state = {
            name: '',
            contact: '',
            open: false,
            year: '',
            major: '',
            recruiter: '',
            //Number ones
            pull: '',
            looks: '',
            intelligence: '',
        };

        console.log("this si the state at start: ", this.state);

    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
        console.log("on modal close the state was: ", this.state)
    };

    handleChange = name => event => {
        //nicer formatting :)
        console.log("event name", event.target.name);
        let text = event.target.value;
        text = text.slice(0,1).toUpperCase() + text.slice(1, text.length);
        this.setState({
            [name] : text,
        });
    };

    handleSubmit = () => {
        this.setState({open: false});
        console.log("We submitted with: ", this.state)
    };


    setAttribute = event => {
        console.log("name: ", event.target.name, "value", event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    buildSelect()  {
        var arr = [];
        for (var i = 1; i < 10; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }
        return arr
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
                        <form className={classes.container}>
                            <TextField
                                className={classes.textField}
                                id="name"
                                label="Rushie Name"
                                margin="normal"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                variant={"outlined"}
                            />
                            <TextField
                                className={classes.textField}
                                id="Contact"
                                label="Contact Name (YOU)"
                                margin="normal"
                                variant={"outlined"}
                                value={this.state.contact}
                                onChange={this.handleChange('contact')}
                            />
                            <FormControl className={classes.yearselect}>
                                <InputLabel htmlFor="year">Year</InputLabel>
                                <Select
                                    value={this.state.year}
                                    onChange={this.setAttribute}
                                    inputProps={{
                                        name: 'year',
                                        id: 'year-select',
                                    }}
                                >
                                    <MenuItem value={"Freshman"}>Freshman</MenuItem>
                                    <MenuItem value={"Sophomore"}>Sophomore</MenuItem>
                                    <MenuItem value={"Junior"}>Junior</MenuItem>
                                    <MenuItem value={"Senior"}>Senior</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                id="intelligence"
                                select
                                label="Intelligence"
                                className={classes.textField}
                                value={this.state.intelligence}
                                onChange={this.handleChange('intelligence')}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                variant="outlined"
                            >
                                {this.buildSelect()}
                            </TextField>
                            <AttributeSelector
                                value={this.state.Looks}
                                attributeID={{
                                    name: "Looks",
                                    id: "looks-attribute"
                                }}
                                setAttribute={this.setAttribute}
                            />
                            <AttributeSelector
                                value={this.state.Pull}
                                attributeID={{
                                    name: "Pull",
                                    id: "pull-attribute"
                                }}
                                setAttribute={this.setAttribute}
                            />
                            <AttributeSelector
                                value={this.state.Intelligence}
                                attributeID={{
                                    name: "Intelligence",
                                    id: "Intelligence-attribute"
                                }}
                                setAttribute={this.setAttribute}
                            />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                        <Button onClick={this.handleClose} color="Secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddRushie);
