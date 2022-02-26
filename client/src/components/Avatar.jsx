import { default as MuiAvatar } from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, sx) {
  if (name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...sx,
      },
      children: `${name[0].toUpperCase()}`,
    };
  }
}

export default function Avatar({ src, alt, sx }) {
  return <MuiAvatar src={src} alt={alt?.toUpperCase()} {...stringAvatar(alt, sx)} />;
}
