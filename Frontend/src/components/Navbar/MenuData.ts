/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  SquareTerminal,
  Frame,
  PieChart,
  Map,
} from "lucide-react";


export const getSidebarData = (user: any) => ({
  user: {
    name: user?.name || "Guest",
    email: user?.email || "guest@example.com",
    avatar: user?.avatar || "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "member", logo: Command, plan: "Free"},
    { name: "manager", logo: AudioWaveform, plan: "Startup" },
    { name: "admin", logo: GalleryVerticalEnd, plan: "Enterprise" },
  ],
  navMain: [
    {
      title: "Teams",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [ //needs to make dynamic
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
});
