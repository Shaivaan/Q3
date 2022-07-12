import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


type PostProp = {
    title:string,
    url:string,
    tags:string[],
    author:string,
    date:string 
}

   
export const  Post=({title,url,tags,author,date}:PostProp)=> {
  return (
    <>
<Card style= {{width:"30vh"}}>
      <CardContent>

            <div className='bord title'>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        </div>

            <div className='bord'>
        <Typography variant="h6" component="div">
          {author || "Unknown"}
        </Typography>
        </div>


        <div className='tags'>
            {tags?.map((el,i)=>{
                return  < Typography key={i} sx={{ mb: 1.5 }} color="text.secondary">
                #{el}ㅤ
              </Typography>
            })}
        </div>
       
            <div className='bord'>
        <Typography variant="body2">
          Created at :
          <br />
          {date?.slice(0,10)}
        </Typography>
        </div>


      </CardContent>
      <CardActions>
        <a href = {`${url}`}><Button size="small" >Read the Post</Button></a>
      </CardActions>
    </Card>
    </>
  )
}


