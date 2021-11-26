import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
    React.useEffect(()=>{
        console.log(props)
    },[])
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.data.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom noWrap variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
          {props.data.description.toString().substr(0,100)}...
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small">{props.data.rating.rate}/5.0</Button>
        <Typography variant="body1" color="text.primary">$ {props.data.price}</Typography>
        <Button onClick={()=>{props.navigate(`/productDetails/${props.data.id}`)}} variant="contained" size="small" style={{marginLeft: 'auto'}}>Buy Now</Button>
      </CardActions>
    </Card>
  );
}
