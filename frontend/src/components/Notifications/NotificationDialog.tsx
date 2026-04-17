import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import type { Notifications } from "../../pages/notifications/NotificationsView";
import type { Projects, User } from "../../pages/ProfileView";
import { RxCross1 } from "react-icons/rx";
import styles from "./NotificationDialog.module.css"


interface NotificationDialogProps {
    notification: Notifications
    project: Projects
    user: User
    dialogOpen: boolean
    closeDialog: () => void
    acceptRequest: (notification_id: number) => void
    declineRequest: (notification_id: number) => void
}

export default function NotificationDialog({
    notification,
    user,
    project,
    dialogOpen,
    closeDialog,
    acceptRequest,
    declineRequest
}: NotificationDialogProps) {

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle
                    sx={{
                        margin: {xs: "5px"},
                        fontFamily: "inherit",
                        fontSize: 20,
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                    <NotificationTitle notification={notification} />
                    <Button
                        onClick={closeDialog}
                        sx={{
                            color: "black",
                        }}
                    ><RxCross1 size={24} /></Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        sx={{
                            fontFamily: "inherit",
                            color: "black",
                            margin: {xs: "5px", sm: "10px"},
                        }}>
                        <NotificationMessage notification={notification} project={project} user={user} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: {xs: "flex", md: "grid"},
                        flexDirection: {xs: "column"},
                        gridTemplateColumns: "2fr 2fr",
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
                                ? "View project page"
                                : "View user profile"
                        }</Button>
                    {notification.status === "pending"
                        ? (<div className={styles.buttonRow}>
                            <Button
                                onClick={() => declineRequest(notification.notification_id)}
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: 50,
                                    fontFamily: "inherit",
                                    padding: "10px 20px",
                                    margin: "10px 10px 20px 10px"
                                }}
                            >Decline</Button>
                            <Button
                                onClick={() => acceptRequest(notification.notification_id)}
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: 50,
                                    fontFamily: "inherit",
                                    padding: "5px 20px",
                                    margin: "10px 10px 20px 10px"
                                }}
                            >Accept</Button>
                        </div>)
                        : <p className={styles.answerText} >You have already answered this request.</p>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment >
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
        return `User ${user.name} wants to join your project "${project.title}". Accept or decline their request.`
    } else if (notification.type === "invite") {
        return `User ${user.name} has invited you to join their project "${project.title}". Accept or decline their invitation.`
    }

}