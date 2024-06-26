"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Calendar,
  Captions,
  ChevronRight,
  File,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageCircle,
  University,
  Users,
  UsersRound,
} from "lucide-react";
import Nav from "./Nav";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="bg-[#333238] text-white relative min-w-14 lg:min-w-20 h-full border-r px-3 pb-10 pt-8">
      {!isMobile && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 pb-4">
        <Image className="w-10 flex-none" src={Logo} alt="" />
        {/* {!isCollapsed && !mobileWidth && (
          <h1 className="text-xl font-bold">Manager</h1>
        )} */}
      </div>
      <Nav
        isCollapsed={isMobile ? true : isCollapsed}
        links={[
          {
            title: "Home",
            href: "/",
            icon: Home,
            variant: "ghost",
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Calendar",
            href: "/calendar",
            icon: Calendar,
            variant: "default",
          },
          {
            title: "Documents",
            href: "/documents",
            icon: File,
            variant: "default",
          },
          {
            title: "Chat",
            href: "/chat",
            icon: MessageCircle,
            variant: "default",
          },
          {
            title: "Etudiants",
            href: "/etudiants",
            icon: GraduationCap,
            variant: "default",
          },
          {
            title: "Enseignants",
            href: "/enseignants",
            icon: University,
            variant: "default",
          },
          {
            title: "Sujets",
            href: "/sujets",
            icon: Captions,
            variant: "default",
          },
          {
            title: "Groupes",
            href: "/groupes",
            icon: Users,
            variant: "default",
          },
        ]}
      />
    </div>
  );
};

export default SideBar;
