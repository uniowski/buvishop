import { useEffect, useState } from "react";
import { getUserProfile, type UserProfile } from "../services/userService";

type SessionState = {
  uid: string | null;
  email: string;
  profile: UserProfile | null;
};

type LoginUser = {
  uid: string;
  email: string;
};

export function useUserSession() {
  const [session, setSession] = useState<SessionState>({
    uid: null,
    email: "",
    profile: null,
  });
  const [welcomeText, setWelcomeText] = useState<string | null>(null);

  useEffect(() => {
    if (!session.uid) {
      return;
    }

    let isCancelled = false;

    const loadUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(session.uid as string);

        if (isCancelled) {
          return;
        }

        if (userProfile) {
          setWelcomeText(`Witaj ${userProfile.firstName} ${userProfile.lastName}`);
          setSession((prevSession) => ({
            ...prevSession,
            profile: userProfile,
          }));
          return;
        }

        console.log("No such document!");
        setSession((prevSession) => ({
          ...prevSession,
          profile: null,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Error getting document:", errorMessage);
      }
    };

    loadUserProfile();

    return () => {
      isCancelled = true;
    };
  }, [session.uid]);

  const userStatus = session.profile
    ? `${session.profile.rank}: ${session.profile.firstName} ${session.profile.lastName}`
    : "";
  const currentUserRank = session.profile?.rank || null;

  const handleLogin = (user: LoginUser) => {
    setSession({
      uid: user.uid,
      email: user.email,
      profile: null,
    });
  };

  const logout = () => {
    setSession({
      uid: null,
      email: "",
      profile: null,
    });
  };

  return {
    session,
    userStatus,
    currentUserRank,
    welcomeText,
    hideWelcome: () => setWelcomeText(null),
    handleLogin,
    logout,
  };
}
