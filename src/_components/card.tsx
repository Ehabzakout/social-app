import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "@mui/material";
import axios from "axios";
import Comment from "./comment";



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function PostCard({postInfo,token}:{postInfo:React.ReactDOM}) {
   const { user, body, image, createdAt,id } = postInfo;
  const [expanded, setExpanded] = React.useState(false);
  const [com,setCom]=React.useState(null)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
async function comment(){
  const data = await axios.request({
    method: "GET",
    url: `https://linked-posts.routemisr.com/posts/${id}/comments`,headers:{token}
  })
  let comments= data.data.comments
  setCom(comments)
  return comments;
}
async function DelCom(id){
  const { data } = await axios.request({
    method: "DELETE",
    url: `https://linked-posts.routemisr.com/comments/${id}`,
    headers:{token}
  })
  return data;
}
React.useEffect(()=>{comment()},[])
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={user.photo}></img>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo.user.name}
        subheader={new Date(createdAt).toDateString()}
      />
      <Link href={`/posts/${id}`}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {body}
        </Typography>
      </CardContent>
      <CardContent sx={{ margin: "0px", padding: "0 15px" }}>
        <Comment commentInfo={{token,id}} />
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Comments:</Typography>
          {com
            ? com.map((comment) => (
                <Typography key={comment.id} sx={{ marginBottom: 2 }}>
                  <div className="w-full p-2 flex my-2 rounded-lg bg-gray-100">
                    <Avatar  src={comment.commentCreator.photo}></Avatar>
                    <div className="ml-2 w-3/4 overflow-hidden">
                      <h1 className=" mt-1 text-xs font-semibold">
                        {comment.commentCreator.name}
                      </h1>
                    <p>{comment.content}</p>
                    </div>
                    <div className="ms-auto text-xs text-gray-500">
                      {new Date(comment.createdAt).toDateString()}
                    </div>
                  </div>
                    {/* <button className="btn" onClick={()=>DelCom(comment.id)}>Delete comment</button> */}
                </Typography>
              ))
            : ""}
        </CardContent>
      </Collapse>
    </Card>
  );
}