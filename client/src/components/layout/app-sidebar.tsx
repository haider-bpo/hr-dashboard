"use client";
import { ChevronsUpDown, FileUser, LogOut, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLogoutUser, useUser } from "@/features/auth/authSelectors";

//company details
const company = {
  name: "Rank BPO",
  logo: "/images/png/Rank-BPO-LOGO.png",
  smallLogo: "/images/png/Rank-BPO-LOGO-small.png",
  plan: "Manage Jobs",
};

// Menu items
const items = [
  {
    title: "Jobs",
    url: "/jobs",
    icon: FileUser,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: User,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { open } = useSidebar();
  const logoutUser = useLogoutUser();
  const navigate = useNavigate();
  const user = useUser();

  const signOut = () => {
    logoutUser();
    navigate("/signin");
  };

  return (
    <Sidebar collapsible="icon">
      {/* side header  */}
      <SidebarHeader className="dark:bg-[#08060F]">
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="w-40 h-10 relative">
            <Link to={"/"}>
              <img
                src={open ? company.logo : company.smallLogo}
                alt={company.name}
                className="w-full h-full object-contain object-start"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </SidebarHeader>

      {/* side menu  */}
      <SidebarContent className="dark:bg-[#08060F]">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link
                      to={item.url}
                      className={`${
                        pathname === item.url ? "!text-[#005BEA]" : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* side footer  */}
      <SidebarFooter className="dark:bg-[#08060F]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  {/* user avatar  */}
                  <Avatar className={`${!open ? "h-8 w-8 rounded-lg" : ""}`}>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>
                      {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>

                  {/* user detail  */}
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    {/* <span className="truncate text-xs">{user?.email}</span> */}
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* user avatar  */}
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>
                        {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>

                    {/* user detail  */}
                    <div className="grid text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name}
                      </span>
                      {/* <span className="truncate text-xs">{user?.email}</span> */}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
