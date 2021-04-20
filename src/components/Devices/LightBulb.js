import { FormControlLabel, Switch } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ThingSpeakReadAPI, ThingSpeakWriteAPI } from "../../utils/utils";
import thingSpeakAPI from "../../utils/axios";
import { withStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 62,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        "&$checked": {
            transform: "translateX(36px)",
            color: theme.palette.common.white,
            "& + $track": {
                backgroundColor: "#0abb87",
                opacity: 1,
                border: "none",
            },
        },
        "&$focusVisible $thumb": {
            color: "#52d869",
            border: "6px solid #fff",
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: red[400],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

function LightBulb() {
    const [state, setState] = useState(false);

    useEffect(() => {
        const onOff = async () => {
            try {
                const res = await thingSpeakAPI({
                    method: "get",
                    url: ThingSpeakReadAPI(3),
                });
                console.log(res.data, "lightbulb");
                setState(res?.data === 1 ? true : false);
            } catch (err) {
                console.log(err);
            }
        };
        //const interval = setInterval(async () => {
        onOff();
        // }, 10000);
        // return () => clearInterval(interval);
    }, []);

    const handleChange = async (e) => {
        var data = e.target.checked === false ? 0 : 1;
        try {
            setState(e.target.checked);
            await thingSpeakAPI({
                method: "post",
                url: ThingSpeakWriteAPI(`field3=${data}`),
            });
            console.log(e.target.checked, "status");
        } catch (err) {
            setState(!e.target.checked);
            console.log(err);
        }
    };

    return (
        <FormControlLabel
            control={
                <IOSSwitch
                    name="lightbulb"
                    id="3"
                    checked={state}
                    onChange={(e) => handleChange(e)}
                />
            }
            label="Light Bulb"
        />
    );
}

export default LightBulb;
