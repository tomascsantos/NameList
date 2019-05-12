import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import HttpService from '../services/http-service';
import Rushie from './Rushie';
import AddRushie from "./AddRushie";

const http = new HttpService();

const styles = theme => ({
    root: {
        padding: 24,
    },
    rushcard: {
        padding: 24,
    }
});

class RushieList extends Component {
    constructor(props) {
        super(props);

        this.state = {rushies:[]};

        this.loadData = this.loadData.bind(this);
        this.rushieList = this.rushieList.bind(this);
        this.addRushie = this.addRushie.bind(this);

        this.loadData();
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid className={classes.root} container justify="center" spacing={24}>
                {this.rushieList()}
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={24}>
                    <AddRushie childProps={this.props.childProps}/>
                  </Grid>
                </Grid>
            </Grid>

        );
    }

    addRushie = () => {

    }

    loadData = () => {
        http.getProducts().then(data => {
            console.log(data);
            this.setState({rushies: data})
        }, err => {
            console.log("load data failed");
        });
    };

    rushieList = () => {
            const list = this.state.rushies.map((rushieJson) =>
                <Grid className={this.props.rushcard} key={rushieJson._id}>
                    <Rushie rushie={rushieJson}/>
                </Grid>
            );
            return (list);
    };


}

export default withStyles(styles)(RushieList);