import { Outlet } from "react-router-dom";
import SettingsSidebar from "../sidebar/UserSettingsSidebar";

const UserSettingsLayout = () => {
  return (
    <SettingsSidebar>
      <Outlet />
    </SettingsSidebar>
  );
};
export default UserSettingsLayout;
