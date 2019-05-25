import React, {Component} from 'react';
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Card from "@material-ui/core/Card";
import { withStyles} from "@material-ui/styles";
import ApplicantStat from "./ApplicantStat";
import ApplicantMenuButton from "./ApplicantMenuButton";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Amplify, {Storage} from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const styles = theme => ({
    avatar: {
        width: 150,
        height: 150,
    },
    root: {
        width: 300,
    },

});

class Applicant extends Component {
    constructor(props) {
        super(props);
        console.log(props)

        this.state = {
            imageUrl: "",
        }

        this.getImageUrl = this.getImageUrl.bind(this);
        this.checkState = this.checkState.bind(this);
        this.getImageUrl(props.applicant.image);
    }

    async getImageUrl(image) {
        let url = await Storage.get(image);
        console.log("urls: ", url)
        this.setState({
            imageUrl: url,
        })
    }

    checkState() {
        console.log(this.state)
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            5:4:75
                        </Avatar>
                    }
                    action={
                        <ApplicantMenuButton/>
                    }
                    title={this.props.applicant.name}
                    titleTypographyProps={{
                        variant: "h4"
                    }}
                    subheaderTypographyProps={{
                        variant: "h6"
                    }}
                    subheader={this.props.applicant.contact}
                    />
                <CardMedia
                    style={{height: 0, paddingTop: '56%'}}
                    className={classes.media}
                    image={this.state.imageUrl}
                />
                <CardContent>
                    <ApplicantStat
                        type={"string"}
                        stat={"year"}
                        value={this.props.applicant.year}
                        textSize={"h3"}
                    />
                    <ApplicantStat
                        type={"scale"}
                        stat={"Intelligence"}
                        value={this.props.applicant.intelligence}
                    />
                    <ApplicantStat
                        type={"scale"}
                        stat={"Looks"}
                        value={this.props.applicant.looks}
                    />
                    <ApplicantStat
                        type={"scale"}
                        stat={"Social"}
                        value={this.props.applicant.social}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Applicant);