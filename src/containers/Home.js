import React, {Component} from "react";
import RushieList from "../components/RushieList";
import Grid from "@material-ui/core/Grid";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className={"Home"}>
                <div className={"lander"}>
                    <h1>The Name List</h1>
                    <p>The best way to choose the best people</p>


                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <RushieList/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )

    }
}