import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import {TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

const styles = theme => ({
    root: {

    }
});
/* GONNA PUT THIS ON HOLD UNTIL WE HAVE A STATIC VERSION WORKING, THEN WE CAN CONSIDER MAKING IT CUSTOMIZABLE*/
/* AttributeProps = {
        name={the_value_of_the_state_and_label}
   }

*/
class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    buildSelect()  {
        var arr = [];
        for (var i = 1; i <= 10; i++) {
            arr.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return arr
    }

    //Return this if the type is string
    generateString() {
        const class_name = this.props.name + "_class";
        return (
            <TextField
                className={class_name}
                fullWidth
                id={this.props.name}
                label={this.props.label}
                margin="normal"
                value={this.props.value}
                onChange={this.props.handleChange}
                variant={"outlined"}
            />
        )
    }

    generateMenu() {
        const class_name = this.props.name + "_class";
        return (
            <TextField
                className={class_name}
                fullWidth
                id={this.props.name}
                label={this.props.label}
                margin={"normal"}
                value={this.props.value}
                onChange={this.props.handleChange}
                variant={"outlined"}
                select
            >
                {this.props.selectors.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )
    }

    //Generate a scale from 1-10
    generateScale() {
        const class_name = this.props.name + "_class";
        return(
            <TextField
                className={class_name}
                fullWidth
                select
                id={this.props.name}
                label={this.props.label}
                margin="normal"
                value={this.props.value}
                onChange={this.props.handleChange}
                SelectProps={{
                    native: false,
                    MenuProps: {
                        className: "test?",
                    },
                }}
                variant="outlined"
            >
                {this.buildSelect()}
            </TextField>
        )
    }


    render() {
        switch(this.props.type) {
            case "string":
                return this.generateString();
            case "scale":
                return this.generateScale();
            case "menu":
                return this.generateMenu();
            default:
                console.error("Attribute.js received an invalid type")
        }
    };
}

export default withStyles(styles)(Attribute);