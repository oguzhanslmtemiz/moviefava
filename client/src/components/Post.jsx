import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardActionArea, IconButton, Link, Menu, MenuItem } from "@mui/material";
import InteractionButtons from "./InteractionButtons";
import CardMenu from "./CardMenu";

export default function Post({ post, postOwner, user }) {
  const title = post.title ? post.title : post.fullname;
  const type = post.title ? "movie" : "actor";

  return (
    <Grid item xs={12} sm={6}>
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={
            <Link href={`/profile/${postOwner.id}`}>
              <Avatar sx={{ bgcolor: red[500] }}>
                {`${postOwner.username}`[0].toUpperCase()}
              </Avatar>
            </Link>
          }
          action={
            postOwner.id === user.id && (
              <CardMenu
                formData={{
                  title,
                  type,
                  image: post.image,
                  description: post.description,
                  shareable: post.shareable,
                }}
              />
            )
          }
          title={title}
          subheader={type}
        />
        <CardActionArea component="a" href={`/${type}s/${post.id}`}>
          <CardMedia
            component="img"
            image={post.image}
            sx={{ height: { xs: 350, sm: 300 }, width: { xs: "100%", sm: 800 } }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing>
          <InteractionButtons post={post} />
        </CardActions>
      </Card>
    </Grid>
  );
}
