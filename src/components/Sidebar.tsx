
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="w-64 border-r border-border overflow-y-auto bg-sidebar">
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
