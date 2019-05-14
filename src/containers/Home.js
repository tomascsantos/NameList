import React, {Component} from "react";
import ApplicantList from "../components/ApplicantList";
import Grid from "@material-ui/core/Grid";
import "./Home.css";

export default class Home extends Component {
     render() {
        return(
            <div className={"lander"}>
                <div className={"memberList"}>
                    <h1>The Rushies:</h1>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <ApplicantList/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}