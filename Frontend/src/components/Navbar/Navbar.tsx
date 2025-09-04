import { AppSidebar } from "./app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Common from "./Common";
import TeamsPage from "./TeamsPage";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import Loader from "../StyleComponent/Loader";


export default function Navbar() {
  const pageSwitch = useAppSelector((state) => state.temp.pageSwitch);
  const currRole = useAppSelector((state) => state.temp.currRole);
  const [isRoleLoaded, setIsRoleLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRoleLoaded(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      setIsRoleLoaded(false); // reset loader on role change
    };
  }, [currRole]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {!isRoleLoaded ? (
          <div className="flex justify-center mx-auto my-auto items-center h-[70vh]">
            <Loader />
          </div>
        ) : (
          <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            {pageSwitch === "Team" ? <TeamsPage /> : <Common />}
          </>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
