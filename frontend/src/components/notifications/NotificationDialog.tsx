import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import type { Notifications } from "../../pages/Notifications/NotificationsView";
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
    onOpenProject?: (id: number) => void
    onOpenUser?: (id: number) => void
}

export default function NotificationDialog({
    notification,
    user,
    project,
    dialogOpen,
    closeDialog,
    acceptRequest,
    declineRequest,
    onOpenProject,
    onOpenUser
}: NotificationDialogProps) {

    function getButtons(notification: Notifications) {
        if (notification.type === "response") {
            if (notification.status === "accepted") {
                return (
                    <Button
                        onClick={onOpenProject ? () => onOpenProject(notification.project_id) : undefined}
                        variant="outlined"
                        sx={{
                            borderColor: "#000000",
                            fontFamily: "inherit",
                            color: "black",
                            margin: "10px 20px 20px 20px"
                        }}

                    >View project page</Button>
                )
            }
            return null
        }
        if (notification.status === "pending") {
            return (
                <>
                    {
                        notification.type === "invite"
                            ? < Button
                                variant="outlined"
                                onClick={onOpenProject ? () => onOpenProject(notification.project_id) : undefined}
                                sx={{

                                    borderColor: "#000000",
                                    fontFamily: "inherit",
                                    color: "black",
                                    margin: "0 20px 0 20px"
                                }}
                            >View project page</Button >
                            : <Button
                                variant="outlined"
                                onClick={onOpenUser ? () => onOpenUser(notification.sender_user_id) : undefined}
                                sx={{

                                    borderColor: "#000000",
                                    fontFamily: "inherit",
                                    color: "black",
                                    margin: "0 20px 0 20px"
                                }}
                            >View user profile</Button>
                    }

                    <div className={styles.buttonRow}>
                        <Button
                            onClick={() => declineRequest(notification.notification_id)}
                            sx={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: 50,
                                fontFamily: "inherit",
                                padding: "10px 20px",
                                margin: "0 10px 0 10px"
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
                                margin: "0 10px 0 10px"
                            }}
                        >Accept</Button>
                    </div>
                </>
            )
        }
        return (
            <>
                {
                    notification.type === "invite"
                        ? < Button
                            variant="outlined"
                            onClick={onOpenProject ? () => onOpenProject(notification.project_id) : undefined}
                            sx={{

                                borderColor: "#000000",
                                fontFamily: "inherit",
                                color: "black",
                                margin: "0 20px 0 20px"
                            }}
                        >View project page</Button >
                        : <Button
                            variant="outlined"
                            onClick={onOpenUser ? () => onOpenUser(notification.sender_user_id) : undefined}
                            sx={{

                                borderColor: "#000000",
                                fontFamily: "inherit",
                                color: "black",
                                margin: "0 20px 0 20px"
                            }}
                        >View user profile</Button>
                }

                <p className={styles.answerText}>
                    You have already answered this request.
                </p>
            </>
        )
    }

    const isSingle = notification.type === "response"

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                slotProps={{
                    paper: {
                        sx: {
                            width: { laptop: "50%", desktop: "40%" },
                            maxWidth: "600px"
                        }
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        margin: { mobile: "5px" },
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
                            margin: { mobile: "5px", tablet: "10px" },
                        }}>
                        <NotificationMessage notification={notification} project={project} user={user} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: { mobile: "flex", tablet: "grid" },
                        flexDirection: { mobile: "column" },
                        gridTemplateColumns: isSingle ? "1fr" : "2fr 2fr",
                        margin: "0px 20px 20px 20px"
                    }}>
                    {getButtons(notification)}
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
        return `User ${user.username} wants to join your project "${project.title}". Accept or decline their request.`
    } else if (notification.type === "invite") {
        return `User ${user.username} has invited you to join their project "${project.title}". Accept or decline their invitation.`
    } else {
        if (notification.status === "declined") {
            return `User ${user.username} has declined your request regarding the project "${project.title}".`
        } else {
            return `User ${user.username} has accepted your request regarding the project "${project.title}".`
        }
    }
}