import { useState } from "react"
import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { RiDeleteBin6Line } from "react-icons/ri"
import styles from "./ConfirmDialog.module.css"

interface ConfirmDialogProps {
    onDelete: (id: number) => void
    id: number
}

export default function ConfirmDialog({ onDelete, id }: ConfirmDialogProps) {

    const [open, setOpen] = useState(false)

    function openDialog() {
        setOpen(true)
    }

    function closeDialog() {
        setOpen(false)
    }

    function handleConfirm() {
        setOpen(false)
        onDelete(id)
    }

    return (
        <React.Fragment>
            <button className={styles.deleteButton} onClick={openDialog} ><RiDeleteBin6Line size={25} /></button>
            <Dialog
                open={open}
                onClose={closeDialog}
            >
                <DialogTitle
                    sx={{ 
                        margin: "20px 20px 0 20px",
                        fontFamily: "inherit",
                        fontSize: 17
                        }}
                >Are you sure you want to delete this project?</DialogTitle>
                <DialogActions>
                    <Button
                        variant="outlined" onClick={closeDialog}
                        sx={{
                            border: 0,
                            fontFamily: "inherit",
                            color: "black",
                            margin: "10px 10px 20px 20px"
                        }}
                    >Cancel</Button>
                    <Button
                        variant="contained" onClick={handleConfirm}
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 50,
                            fontFamily: "inherit",
                            padding: "5px 20px",
                            margin: "10px 20px 20px 20px"
                        }}
                    >Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}