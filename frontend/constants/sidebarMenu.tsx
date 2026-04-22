import { FaHome } from "react-icons/fa";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { FaUserCog } from "react-icons/fa";
import { GiTabletopPlayers } from "react-icons/gi";
import menu from "../Assets/menu 1.png";
import table from "../Assets/dining-table (1) 1.png";
import chef from "../Assets/chef (1) 1.png";
import rocket from "../Assets/sharp.png";
import { FaUser } from "react-icons/fa";
import { BsPersonAdd } from "react-icons/bs";
import { BsBuildingFillAdd } from "react-icons/bs";

export const sidebarMenu = [
  {
    title:"",
    items:[
  {
    title: "Dashboard",
    icon: FaHome,
    href: "/",
  },
  {
    title: "Pos",
    icon: HiMiniClipboardDocumentList,
    href: "/pos",
  },
   {
    title: "Branch",
    icon: BsBuildingFillAdd,
    href: "/branch",
  },{
    title:"Employees",
    icon:BsPersonAdd,
    href:"/Employees"
  },
  {
    title: "User",
    icon: FaUserCog,
    href: "/users",
  },
  {
    title: "Tables&Floors",
    type: "image",
    icon: table,

    href: "/tables",
  },
  {
    title: "Menu Setup",
    icon: menu,

    type: "image",
    href: "/menu",
  },
  {
    title: "Kitchen Setup",
    icon: chef,
    type: "image",
    href: "/kitchen",
  },
]
},
{ 
  title:"ACCOUNT PAGES",
  items:[
  {
    title: "Profile",
    icon: FaUser,
    href: "/profile",
  },
  {
    title: "Logout",
    icon: rocket,
    type: "image",
    href: "/logout",
  },
]
}
];

