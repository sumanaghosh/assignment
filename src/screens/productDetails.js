import axios from 'axios';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductDetails(props) {
    const navigate = useParams()
    const [productCat, setProductCat] = React.useState()

    React.useEffect(() => {
        console.log(navigate)
        axios.get('https://fakestoreapi.com/products/'+navigate.id.toString())
            .then((res) => {
                if (res.status === 200) {
                    setProductCat(res.data);
                    console.log(res.data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])
    return (
        <div>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <img src={productCat?.image}
                                style={{ width: '30%', margin: '100px', padding: '10px' }} />
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant="h4" style={{
                                padding: '20px 20px 20px 0px',
                                width: '80%'
                            }}>
                                {productCat?.title}
                            </Typography>
                            <Typography variant="body1" style={{
                                width: '80%'
                            }}>
                                {productCat?.description}
                            </Typography>

                            <Box sx={{ flexGrow: 1 }} style={{margin: '15px auto'}}>
                                <Grid container spacing={2} style={{alignItems: 'baseline'}}>
                                    <Grid item lg={2}>
                                        <Typography variant="h5">
                                            $ {productCat?.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={1}>
                                        <Typography variant="body1">
                                            {productCat?.rating.rate}/5.0
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Typography variant="body1">
                                            {productCat?.rating.count} Reviews
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Button variant="contained" size="large">Add to cart</Button>


                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>

    )
}