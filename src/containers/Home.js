import React, {Component} from "react";
import RushieList from "../components/RushieList";
import Grid from "@material-ui/core/Grid";
import "./Home.css";

export default class Home extends Component {
    static renderBanner() {
        return(
            <div className={"lander"}>
                <h1>The Name List</h1>
                <p>The best way to choose the best people</p>
            </div>
        )
    }

    static renderMemberList() {
        return (
            <div className={"memberList"}>
                <h1>The Rushies:</h1>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <RushieList childProps={this.props.childProps}/>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        return (
            <div className={"Home"}>
                {this.props.isAuthenticated
                    ? Home.renderMemberList()
                    : Home.renderBanner()
                }
            </div>
        )

    }
}