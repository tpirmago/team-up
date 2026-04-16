import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import type { Notifications } from "../../pages/notifications/NotificationsView";
import type { Projects, User } from "../../pages/ProfileView";
import { RxCross1 } from "react-icons/rx";


interface NotificationDialogProps {
    notification: Notifications
    project: Projects
    user: User
    dialogOpen: boolean
    closeDialog: () => void
}

export default function NotificationDialog({ notification, user, project, dialogOpen, closeDialog }: NotificationDialogProps) {

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle
                    sx={{
                        margin: "20px 20px 0 20px",
                        fontFamily: "inherit",
                        fontSize: 17,
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <NotificationTitle notification={notification} />
                    <Button
                        onClick={closeDialog}
                        sx={{
                            color: "black"
                        }}
                    ><RxCross1 size={24} /></Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            fontFamily: "inherit",
                            color: "black",
                            margin: "20px 20px 0 20px",
                        }}>
                        <NotificationMessage notification={notification} project={project} user={user} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        margin: "0px 20px 0 20px"
                    }}>
                    <Button
                        variant="outlined"
                        sx={{

                            borderColor: "#000000",
                            fontFamily: "inherit",
                            color: "black",
                            margin: "10px 20px 20px 20px"
                        }}
                    >{
                            notification.type === "invite"
                                ? "View project"
                                : "View user profile"
                        }</Button>
                    <Button
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 50,
                            fontFamily: "inherit",
                            padding: "5px 20px",
                            margin: "10px 20px 20px 20px"
                        }}
                    >Accept</Button>
                    <Button
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 50,
                            fontFamily: "inherit",
                            padding: "5px 20px",
                            margin: "10px 20px 20px 20px"
                        }}
                    >Decline</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

interface NotificationTitleProps {
    notification: Notifications
}

function NotificationTitle({ notification }: NotificationTitleProps) {

    if (notification.type === "apply") {
        return "New join request"
    } else if (notification.type === "invite") {
        return "New project invitation"
    } else {
        return "Your request has been answered"
    }
}

interface NotificationMessageProps {
    notification: Notifications
    project: Projects
    user: User
}

function NotificationMessage({ notification, user, project }: NotificationMessageProps) {

    if (notification.type === "apply") {
        return `User ${user.username} wants to join your project "${project.title}". Accept or decline their request.`
    } else if (notification.type === "invite") {
        return `User ${user.username} has invited you to join their project "${project.title}". Accept or decline their invitation.`
    }

}