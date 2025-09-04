import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setUserRole,  setPage } from "../Redux/Features/tempSlice";
import toastService from "../helper/toastService";

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

interface TeamSwitcherProps {
  teams: Team[];
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const dispatch = useAppDispatch();
  const currRole = useAppSelector((state) => state.temp.currRole);
  const currteam = useAppSelector((state) => state.temp.currteam);
 
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState<Team | null>(
    teams[0] || null
  );

  React.useEffect(() => {
    if (activeTeam?.name.toLowerCase() === "admin") {
      // console.log("Do something for admin");
    }
  }, [activeTeam]);
  
  

  const changeRole = (team: Team) => {
    setActiveTeam(team);
    dispatch(setPage("NoTeam"))
    dispatch(setUserRole(team?.name))
    
    setTimeout(()=>{
      toastService.success(`Switched to ${team.name} role`);
    },2000)
  };

  if (!teams.length || !activeTeam) {
    return (
      <div className="text-muted-foreground text-sm px-4">
        No teams available
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name.charAt(0).toUpperCase() + activeTeam.name.slice(1)}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Role Teams {currRole} {currteam}
            </DropdownMenuLabel>

            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => changeRole(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
