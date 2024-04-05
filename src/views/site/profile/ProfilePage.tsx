import CustomTabs from "@/components/shared/common/tabs/CustomTabs";
import { profileTabs } from "@/configs/profile.config";

const ProfilePage = () => {
  return (
    <div>
      <CustomTabs tabs={profileTabs} />
    </div>
  );
};

export default ProfilePage;
