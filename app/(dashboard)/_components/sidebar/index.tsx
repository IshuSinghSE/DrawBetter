import React from "react";
import { NewButton } from "./new-button";
import { List } from "./list";

const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white shadow-strong border-r border-blue-800/30">
      <List />
      <NewButton />
    </aside>
  );
};

export default Sidebar;
