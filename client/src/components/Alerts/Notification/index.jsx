import { Snackbar } from "@mui/material";

const Notification = (props) => (
    <Snackbar
        open={props.open}
        autoHideDuration={props.duration || 6000}
        onClose={props.onClose}
        message={props.message}
    />
);

export default Notification;