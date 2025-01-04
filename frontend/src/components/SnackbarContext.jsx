import React, { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Create a Snackbar context
const SnackbarContext = createContext(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider = ({ children }) => {
    const [snackPack, setSnackPack] = useState([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const showSnackbar = (message, type) => {
        setSnackPack((prev) => [...prev, { message, type, key: new Date().getTime() }]);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                key={messageInfo?.key}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right', // Updated position
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
            >
                <Alert
                    onClose={() => handleClose(new Event('Event'), 'timeout')}
                    severity={messageInfo?.type}
                    sx={{ width: '100%' }}
                >
                    {messageInfo?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
