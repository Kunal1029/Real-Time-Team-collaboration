/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TeamModel } from "./TeamModel";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { createTeam, fetchTeams } from "../Redux/Features/teamSlice";
import { setPage, setTeamID , setTeam} from "../Redux/Features/tempSlice";
import { getUserProfile } from "../Redux/Features/authSlice";

export function NavMain() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  interface Member {
    user: { _id: string } | string;
    role: string;
  }

  interface Team {
    _id: string;
    name: string;
    members: Member[];
    // add other properties as needed
  }

  const { teams } = useAppSelector((state) => state.team) as { teams: Team[] }; // All teams
  const user = useAppSelector((state) => state.auth.user) as { name?: string; _id?: string } | null; // User with teams
  const currRole = useAppSelector((state) => state.temp.currRole);

  const [roleBT, setRoleBT] = useState<Team[]>([]);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (user && teams.length) {
      const filtered = teams.filter((team) =>
        team.members.some(
          (member) =>
            (typeof member.user === "object"
              ? member.user._id
              : member.user) === user._id && member.role === String(currRole)
        )
      );
      setRoleBT(filtered);
    }
  }, [teams, user, currRole]);

  // console.log(roleBT, currRole)

  const createNewTeam = async (data: { name: string; description: string }) => {
    const result = await dispatch(createTeam(data));

    if (createTeam.fulfilled.match(result)) {
      dispatch(getUserProfile());
      dispatch(fetchTeams());
    }
  };

  const storeTeamID = (id: string, name: string) => {
    dispatch(setPage("Team"))
    dispatch(setTeam(name))
    dispatch(setTeamID(id));
  };


  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          {typeof user === "object" && user !== null && "name" in user
            ? `${user.name}'s Space`
            : "My Space"}
        </SidebarGroupLabel>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <i className="fa-solid fa-plus text-orange-400"></i>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Team</p>
          </TooltipContent>
        </Tooltip>

        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Teams">
                  <span>
                    <i className="fa-solid fa-people-group"></i> Teams
                  </span>
                  <ChevronRight className="ml-auto transition-transform text-orange-400 duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {roleBT.map((team) => (
                    <SidebarMenuSubItem key={team._id}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={()=>storeTeamID(team._id, team.name)}
                      >
                        <div>
                          <span className="font-medium">{team.name}</span>
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>

      <TeamModel
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={createNewTeam}
      />
    </>
  );
}
