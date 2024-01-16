import { auth, signOut } from "@/auth"
import { LogOut } from "lucide-react";

const mainAdmin = async () => {
  const session = await auth;

  return (
    <div>
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <button type="submit">
          <LogOut/>
        </button>
      </form>
    </div>
  )
}
export default mainAdmin;