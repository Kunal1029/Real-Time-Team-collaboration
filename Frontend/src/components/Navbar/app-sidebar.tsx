/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { NavMain } from "@/components/Navbar/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/Navbar/nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { getSidebarData } from "./MenuData";
// import { useAppSelector } from "../../hooks/reduxHooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { user } = useAppSelector((state) => state.auth);
  const [usz, setUsz] = React.useState<any>(null);

  React.useEffect(() => {
    const isUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsz(user);
        // console.log(user);
      } else {
        setUsz(null); // explicitly set null when logged out
      }
    });

    return () => isUser(); // cleanup listener
  }, []);

  const data = getSidebarData(usz);
  // console.log(data, "----> data")
  const { name, email, avatar } = data.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={name} email={email} avatar={avatar} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
