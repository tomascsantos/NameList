import React, {Component} from 'react';
import './Rushie.css';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/Card";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";


class Rushie extends Component {
    render() {
        return (
            <Card className="root">
                <CardHeader
                    action={
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title="Brandon Griffen"
                    subheader="Recruited By: Tomas Santos"
                    />
                <CardContent>
                    <Grid container>
                        <Grid item xs={5}>
                            <Avatar className="picture" src={"https://lh3.googleusercontent.com/2zHacJqe2qQ8Nt9vI4oc_-4oKGKBe1unSVtzvhthUdl06UfmhwpYiFd1CsqN7mZ6a7-DGNU7Z5PpVAjAP-Wn5joOm--EOUEdVyvaFv_z-MQzXiHYnGjF3zH23NE5-NRwHqVh_Dq-bA=w300-h200"}/>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography>
                                Attractiveness
                            </Typography>
                            <LinearProgress variant="determinate" value="90"/>
                            <Typography>
                                Intelligence
                            </Typography>
                            <LinearProgress variant="determinate" value="30"/>
                            <Typography>
                                Pull
                            </Typography>
                            <LinearProgress variant="determinate" value="70"/>
                        </Grid>
                    </Grid>
                    <Typography variant="h5">
                        Bio
                    </Typography>
                    <Typography>
                        This is some information about the rushie and how much of a loser they are.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Rushie;