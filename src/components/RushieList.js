import React, {Component} from 'react';
import { withStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import HttpService from '../services/http-service';
import Rushie from './Rushie';
import Button from "@material-ui/core/Button";

const http = new HttpService();

const styles = theme => ({
    root: {

    }
});

class RushieList extends Component {
    constructor(props) {
        super(props);

        this.state = {rushies:[]};

        this.loadData = this.loadData.bind(this);
        this.rushieList = this.rushieList.bind(this);

        this.loadData();
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" spacing={24}>
                {this.rushieList()}
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={24}>
                      <Button variant="contained" color="primary" size="large" onClick={() => this.props.onButtonClicked()}>
                          Add Rushie
                      </Button>
                  </Grid>
                </Grid>
            </Grid>

        );
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
                <Grid key={rushieJson._id}>
                    <Rushie rushie={rushieJson}/>
                </Grid>
            );
            return (list);
    };


}

export default withStyles(styles)(RushieList);