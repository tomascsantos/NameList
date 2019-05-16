import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Applicant from './Applicant';
import AddApplicant from "./AddApplicant";
import Amplify, {API} from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

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

        this.state = {
            isLoading: true,
            applicants:[]
        };
    }

    render() {
        const { classes } = this.props;
        console.log("load applicants");
        this.loadApplicants();
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

    async loadApplicants() {
        try {
            const applicants = await API.get("namelistAPI", "/applicants/asdf", {});
            console.log("applicants are: ", applicants);
        } catch (e) {
            console.log("Our error", e.response);
        }
    }


}

export default withStyles(styles)(ApplicantList);