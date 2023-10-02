import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,   
  NavbarMenu,         
  NavbarMenuItem,     
} from "@nextui-org/react";
import Recherche from "./Recherche";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Profile", "Tendance", "Populaire", "Favoris", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">AW</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Tendance
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Populaire
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/home/favourite-anime">
            Favoris
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Recherche />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "foreground"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
