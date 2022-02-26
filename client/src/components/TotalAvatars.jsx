import { AvatarGroup } from "@mui/material";
import Avatar from "./Avatar";

export default function TotalAvatars({
  setLike,
  likers,
  loggedInUser,
  handleExpandClick,
  like,
  handleNavigate,
}) {
  const avatarStyle = {
    width: 33,
    height: 33,
  };
  return (
    <AvatarGroup
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      total={likers.length}
      max={4}
      onClick={() => {
        handleNavigate("likers");
        handleExpandClick("likers");
      }}
    >
      {like && (!likers.length || likers === undefined) && (
        <Avatar sx={avatarStyle} alt={loggedInUser.username} src={loggedInUser.avatar} />
      )}
      {likers.map((liker, i) => {
        return (
          <Avatar
            key={(liker.id, i)}
            sx={avatarStyle}
            alt={liker.username}
            src={liker.avatar}
          />
        );
      })}
    </AvatarGroup>
  );
}
