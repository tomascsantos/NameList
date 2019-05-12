import React, {Component} from 'react';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import { withStyles} from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
    avatar: {
        width: 150,
        height: 150,
    },
    root: {
        width: 300,
    },

});

class Rushie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            looks: props.rushie.looks * 10,
            smarts: props.rushie.smarts * 10,
            pull: props.rushie.pull * 10,
            recruiter: 'Recruited By: ' + props.rushie.recruiter,
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    action={
                        <Fab color="primary" aria-label="Edit" size="small" className={classes.editButton}>
                            <Icon>edit_icon</Icon>
                        </Fab>
                    }
                    title={this.props.rushie.name}
                    subheader={this.state.recruiter}
                    />
                <CardContent>
                    <Grid container alignItems={"center"}>
                        <Grid item xs={7}>
                            <Avatar className={classes.avatar} src={this.props.rushie.picture} />
                        </Grid>
                        <Grid item xs={5}>
                            <Typography className={classes.attributes}>
                                Looks
                            </Typography>
                            <LinearProgress variant="determinate" value={this.state.looks}/>
                            <Typography className={classes.attributes}>
                                Smarts
                            </Typography>
                            <LinearProgress variant="determinate" value={this.state.smarts}/>
                            <Typography className={classes.attributes}>
                                Pull
                            </Typography>
                            <LinearProgress variant="determinate" value={this.state.pull}/>
                        </Grid>
                    </Grid>
                    <Typography className={classes.bio} variant="h7">
                        Bio
                    </Typography>
                    <Typography component="p">
                        {this.props.rushie.bio}
                    </Typography>
                    <Typography variant="h5">
                        Bids
                    </Typography>
                    <LinearProgress variant="determinate" value={this.props.rushie.bids}/>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Rushie);