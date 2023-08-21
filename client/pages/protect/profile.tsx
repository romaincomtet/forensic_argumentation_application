import { InvitationList } from "@/app/Components/Invitations/InvitationList";
import Navbar from "@/app/Components/NavBar";

export default function Profile() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-grey-light">
      <Navbar pageName={"Profile"} />
      <div className="flex h-full w-full">
        <div className="flex h-1/2 w-1/2 flex-col rounded border bg-white p-4 shadow-lg"></div>
        <div className="flex h-1/2 w-1/2 flex-col rounded border bg-white p-4 shadow-lg">
          <InvitationList />
        </div>
      </div>
    </div>
  );
}
