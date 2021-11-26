import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Banner from '../assets/banner.png';
import './home.css';
import axios from 'axios';
import MediaCard from './card';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Home() {
    const navigate = useNavigate()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        let cat = categories[newValue]
        getSelectedCategories(cat)
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [selectedCategori, setSelectedCategori] = React.useState();

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function getSelectedCategories(catName) {
        axios.get("https://fakestoreapi.com/products/category/" + catName)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setProducts(res.data);
                    console.log(res.data);
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    React.useEffect(() => {
        axios.get("https://fakestoreapi.com/products/categories")
            .then((res) => {
                // console.log(res) 
                if (res.status === 200) {
                    setCategories(res.data);
                    setSelectedCategori(res.data[0])
                    getSelectedCategories(res.data[0])
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])



    return (
        <div>
            <div className="banner"></div>
            <div>
                <p style={{ fontSize: '40px', textAlign: 'center' }}>High range of products</p>
            </div>
            <Box sx={{ bgcolor: 'background.paper'}}>
                <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">

                    {categories.map((cat, i) => {
                        return (
                            <Tab label={cat} />
                        );
                    })}
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    {categories.map((cat, i) => {
                        return (
                            <TabPanel value={value} index={i} dir={theme.direction}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        {products.map((cat, i) => {
                                            return (
                                                <Grid item key={i} lg={4}>
                                                    <MediaCard data={cat} navigate={navigate}/>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            </TabPanel>
                        );
                    })}
                </SwipeableViews>
            </Box>
        </div>
    );
}