import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import {
  IconListCheck,
  IconMail,
  IconTag,
  IconUser,
} from "@tabler/icons-react";

const profileMenuItems = [
  {
    href: "/user-profile",
    title: "My Profile",
    icon: <IconUser width={20} />,
  },
  {
    href: "/apps/email",
    title: "My Account",
    icon: <IconMail width={20} />,
  },
  {
    href: "/apps/notes",
    title: "My Tasks",
    icon: <IconListCheck width={20} />,
  },
  {
    href: "/Pricing",
    title: "Pricing",
    icon: <IconTag width={20} />,
  },
];

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {profileMenuItems.map((item) => (
          <MenuItem key={item.title} component={Link} href={item.href} onClick={handleClose2}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            component={Link}
            fullWidth
            sx={{
              color: "#2c7873",
              borderColor: "#2c7873",
              "&:hover": {
                backgroundColor: "#e0f2f1",
                borderColor: "#256d63",
                color: "#256d63",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
