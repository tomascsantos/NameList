import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {

    }
});

/* Example Props
this.props = {
    stat = "looks"
    type = "scale"
    textSize = h1
}
 */

class ApplicantStat extends Component {
    renderScale() {
        return (
            <div className={"applicantStat-" + this.props.stat}>
                <Typography>
                    {this.props.stat}
                </Typography>
                <LinearProgress variant="determinate" value={this.props.value * 10}/>
            </div>
        )
    };

    renderString(textSize) {
        return (
            <Typography variant={"h5"}>
                {this.props.value}
            </Typography>
        )
    }

    render() {
        switch(this.props.type) {
            case "scale":
                return this.renderScale();
            case "string":
                return this.renderString();
            default:
                console.log("Unknown type for applicant stat");
                return null;
        }
    }
}

export default withStyles(styles)(ApplicantStat);
