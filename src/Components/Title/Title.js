import Typography from "@mui/material/Typography";
import * as React from "react";

export default function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
};
