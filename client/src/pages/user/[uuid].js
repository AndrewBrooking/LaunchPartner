import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../../api/api";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        border: "2px solid #000"
    },
    avatar: {
        width: theme.spacing(15)
    },
    textLeft: {
        textAlign: "left"
    }
}));

export default function UserPage() {
    const classes = useStyles();
    const router = useRouter();
    const { uuid } = router.query;
    
    const [username, setUsername] = useState(null);
    const [description, setDescription] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [joined, setJoined] = useState(null);

    useEffect(() => {
        API.getUser(uuid).then(res => {
            setUsername(res.data.username);
            setDescription(res.data.description);
            setPhoto(res.data.photo);
            setJoined(new Date(res.data.joined));
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
            {/* User Photo */}
            <Grid item>
                <Avatar className={classes.avatar} src={`/uploads/${photo.data.path}`} alt={username} />
            </Grid>

            <Grid item container>

                {/* Username and Join Date */}
                <Grid item className={classes.textLeft}>
                    <Typography variant="h3">{username}</Typography>
                    <Typography variant="subtitle2">{`Joined: ${joined.toDateString()}`}</Typography>
                </Grid>

                {/* User Description */}
                <Grid item className={classes.textLeft}>
                    <Typography variant="body1">{description}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}