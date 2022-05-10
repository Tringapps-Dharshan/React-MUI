import { React, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import fruits from '../asserts/fruits.webp'
import { Grid, Dialog, DialogActions, DialogTitle, Button, Card, Menu, MenuItem, Typography, CardHeader, CardMedia,IconButton, CardContent  } from '@mui/material';

function DisplayProductDetails({ data, setData, setProductName, setProductPrice }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openPop, setOpenPop] = useState(false);
    const [clickId, setCurrentId] = useState(null);
    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setCurrentId(id);
        console.log(id);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const cancelClosePop = () => {
        setOpenPop(false);
    }
    const yesClosePop = () => {
        deleteCard();
        setOpenPop(false);
    }
    const deleteCard = () => {
        setData(data.filter((product) => {
            return product.productId !== clickId;
        }));
        console.log(data);
        handleClose();
    }
    const editCard = () => {
        data.forEach(product => {
            if (product.productId === clickId) {
                setProductName(product.productName)
                setProductPrice(product.productPrice)
            }
        });
        setData(data.filter((product) => {
            console.log(product.productId);
            console.log(clickId);
            return product.productId !== clickId
        }));
        console.log(data);
        handleClose();
    }
    const handlePop = () => {
        setOpenPop(true);
    }
    return (
        <>
        <Grid container spacing={1}>
            {
                data.map((product) => {
                    return (
                        <Grid item xs={2} key={product.productId}>
                        <Card sx={{ maxWidth: 200, maxHeight: 350 }}>
                            <CardHeader
                                action={
                                    <IconButton id="options-menu" onClick={(event) => { handleClick(event, product.productId) }}
                                        aria-controls={open ? 'options-menu' : undefined}
                                        aria-haspopup='true'
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={product.productName}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={fruits}
                                alt="fruits"
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    Rps:{product.productPrice}/Kg
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    );
                })}
            < Menu id="option-menu" anchorEl={anchorEl} open={open}
                MenuListProps={{
                    'aria-labelledby': 'options-button',
                }
                }
                onClose={handleClose}
            >
                <MenuItem onClick={editCard}>Edit</MenuItem>
                <MenuItem onClick={handlePop}>Delete</MenuItem>
            </Menu>
            <Dialog
                open={openPop}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this product?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={cancelClosePop} autoFocus>Cancel</Button>
                    <Button onClick={yesClosePop}>Yes</Button>
                </DialogActions>
            </Dialog>
            </Grid>
        </>
    )
}



export default DisplayProductDetails