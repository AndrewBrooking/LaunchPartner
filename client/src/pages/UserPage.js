import React, { useState, useEffect } from "react";
import API from "../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        border: "2px solid #000",
        margin: "1rem auto",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: "#23395B",
        color: "#FAFAFA"
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15)
    },
    textLeft: {
        textAlign: "left"
    },
    gridItem1: {
        padding: theme.spacing(3)
    },
    gridItem2: {
        width: "75%",
        paddingLeft: theme.spacing(4)
    },
    gridItem3: {
        width: "100%",
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    desc: {
        width: "100%",
        border: "2px solid #000",
        padding: theme.spacing(2)
    }
}));

export default function UserPage(props) {
    const classes = useStyles();
    
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [joined, setJoined] = useState("");

    useEffect(() => {
        API.getUser(props.match.params.uuid).then(res => {
            setUsername(res.data.user.username);
            setDescription(res.data.user.description);
            setPhoto(res.data.user.photo);
            setJoined(res.data.user.joined);
        }).catch(err => {
            console.log(err);
        });
    });

    return (
        <Grid
            container
            className={classes.root}
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
        >
            
            <Grid item container>
                {/* User Photo */}
                <Grid item className={classes.gridItem1}>
                    <Avatar className={classes.avatar} src={`./${photo}`} alt={username} />
                </Grid>

                {/* Username and Join Date */}
                <Grid item className={classes.gridItem2}>
                    <Typography variant="h3">{username}</Typography>
                    <Typography variant="subtitle2">{`Joined: ${new Date(joined).toDateString()}`}</Typography>

                    {/* User Description */}
                    <Grid item className={classes.gridItem3}>
                        <Typography variant="h5">About</Typography>
                        <Typography variant="body1" className={classes.desc}>{description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}