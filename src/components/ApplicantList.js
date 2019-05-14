import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import HttpService from '../services/http-service';
import Applicant from './Applicant';
import AddApplicant from "./AddApplicant";

const styles = theme => ({
    root: {
        padding: 24,
    },
    rushcard: {
        padding: 24,
    }
});

class ApplicantList extends Component {
    constructor(props) {
        super(props);

        this.state = {rushies:[]};
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.root} container justify="center" spacing={24}>
                {this.rushieList()}
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={24}>
                    <AddApplicant/>
                  </Grid>
                </Grid>
            </Grid>

        );
    }

    rushieList = () => {
        const applicant = {
            name: "Tomas",
            intelligence: 7,
            looks: 5,
            social: 7,
            contact: "Brandon",
            year: "Sophomore",
        };
                return (
            //const list = this.state.rushies.map((rushieJson) =>
                    <Grid>
                        <Applicant
                            className={"applicant - " + applicant.name}
                            applicant={applicant}
                        />
                    </Grid>
            //);
                )
    };


}

export default withStyles(styles)(ApplicantList);