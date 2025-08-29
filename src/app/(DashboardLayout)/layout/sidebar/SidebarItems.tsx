import { Box } from "@mui/material";
import { IconPoint } from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import Menuitems from "./MenuItems";
import { Upgrade } from "./Updrade";


const renderMenuItems = (items: any, pathDirect: any) => {

  return items.map((item: any) => {

    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return (
        <Menu
          subHeading={item.subheader}
          key={item.subheader}
        />
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius='7px'
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <Box px={3} key={item.id}>
        <MenuItem
          key={item.id}
          isSelected={pathDirect === item?.href}
          borderRadius='8px'
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem >
      </Box>

    );
  });
};


const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    < >
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#2c7873"} themeSecondaryColor={'#2c7873'} >

        <Box display="flex" alignItems="center">
          <Logo
            img='/images/logos/logo-dark.png'
            component={Link}
            to="/"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ml: 1,
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '22px',
                lineHeight: 1.1,
                fontFamily: '"EB Garamond", serif', // Correct font family
              }}
            >
              Sustain Aim
            </Box>
            <Box
              component="span"
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginTop: '-1px',
                textDecoration: 'overline',
                color: 'inherit',
                letterSpacing: 0.5,
              }}
            >
              CLIMATE SOLUTION
            </Box>
          </Box>
        </Box>

        {renderMenuItems(Menuitems, pathDirect)}
        <Box px={2}>
          <Upgrade />
        </Box>
      </MUI_Sidebar>

    </>
  );
};
export default SidebarItems;
