import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    root: {

    },
    form: {
        minWidth: 300,
        margin: 20,
    }
});

class AttributeSelector extends Component {
    constructor(props) {
        super(props);

        console.log("our props are: ", this.props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        const attributeName = this.props.attributeID["name"];

        //this.props will have an attribute value tag
        //this.props will have attribute name tag
        //this.props will have a setAttribute function
        return (
            <div className={classes.root}>
                <FormControl className={classes.form} variant="outlined">
                    <InputLabel htmlFor="input">{attributeName}</InputLabel>
                    <Select
                        value={this.props.value}
                        onChange={this.props.setAttribute}
                        inputProps={this.props.attributeID}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(AttributeSelector);
