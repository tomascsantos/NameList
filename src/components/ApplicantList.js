import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Applicant from './Applicant';
import AddApplicant from "./AddApplicant";
import Amplify, {API, Auth} from "aws-amplify";
import awsconfig from "../aws-exports";
import jwtDecode from "jwt-decode";

Amplify.configure(awsconfig);

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class ApplicantList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            applicants:[],
            applicantNames:new Set([]),
            applicantSubmissions: new Set([])
        };
        this.rushieList = this.rushieList.bind(this);
        this.loadApplicants = this.loadApplicants.bind(this);
        this.loadApplicants();
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.root} container spacing={16}>
                <Grid item xs={12} className={"addApplicant"}>
                    <Grid container justify={"center"}>
                        <Grid item>
                            <AddApplicant
                                options={this.state.applicantNames}
                                submissions={this.state.applicantSubmissions}
                                reload={this.loadApplicants}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className={"applicants"} justify={"center"} spacing={16}>
                        {!this.state.isLoading && this.rushieList(this.state.applicants)}
                    </Grid>
                </Grid>
            </Grid>

        );
    }

    rushieList = (applicants) => {
        return (
            applicants.map(applicant => (
                <Grid key={applicant.name} item>
                    <Applicant
                        className={"applicant - " + applicant.name}
                        applicant={applicant}
                    />
                </Grid>
            ))
        );
    };

    async loadApplicants() {
        //Get the user group so only same-groups can see each other's applicants
        const sessionIdInfo = await Auth.currentSession().then((session) => {
            return jwtDecode(session.getIdToken().jwtToken);
        });
        let group = sessionIdInfo["cognito:groups"] ? sessionIdInfo["cognito:groups"][0] : "noGroup";

        //Get all of the applicants from the database
        //  Based on the lambda function will only return values submitted by ADDLodge group.
        let all = [];
        try {
            all = await API.get("namelistAPI", "/applicants", {});
        } catch (e) {
            console.log("Failed to fetch applicants", e.response);
        }

        //Initialize sets and arrays to store processed values
        let names = new Set ([]);
        let submissions = new Set([]);
        let applicants = [];

        //Only show ADDLodge info to people in the group
        all.forEach(function(value) {
            if (value["groupId"] === group) {
                applicants.push(value);
                names.add(value["name"]);
                submissions.add(value["userId"]);
            }
        });
        let processed = this.processApplicant(names, applicants);
        this.setState(
            {
                applicants: processed,
                isLoading: false,
                applicantNames: names,
                applicantSubmissions: submissions,
            }
        );
    }

    processApplicant(names, applicants) {
        let processed = [];
        //Group entries by applicant name
        names.forEach(name => {
            let apps = applicants.filter(app => {
                return app["name"] === name;
            });
            //Process all applicants with same name
            processed.push(this.combineApps(apps));
        });
        return processed;
    }

    /**
     * Combine all the applicant submissions with same name
     * @param apps
     * @returns {*}
     */
    combineApps(apps) {
        //Determine the original submission.
        //Only modify "voted" attributes.
        let original = apps.filter(app => {
            return app["original"] === true;
        })[0];
        original.intelligence = this.average(apps, "intelligence");
        original.looks = this.average(apps, "looks");
        original.social = this.average(apps, "social");
        original.bids = this.bids(apps);
        return original
    }

    /**
     *  Helper function to convert bids data to formatted bids object.
     * @param apps all applicants with same name
     * @returns {string}
     */
    bids(apps) {
        let no = 0;
        let yes = 0;
        apps.forEach(app => {
            if (app["bids"] < 0) {
                no += 1;
            }
            if (app["bids"] > 0) {
                yes += 1;
            }
        });
        return yes + ":" + no;
    }

    /**
     * Helper function to find average for voted values.
     * @param apps
     * @param value
     * @returns {number}
     */
    average(apps, value) {
        let sum = 0;
        apps.forEach(app => {
            sum += app[value];
        });
        return sum / apps.length;
    }

}

export default withStyles(styles)(ApplicantList);