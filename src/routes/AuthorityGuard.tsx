import { store } from "@/store/store";
import { verifyAuthority } from "@/utils/auth.utils";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type AuthorityGuardProps = {
  pageAuth: string;
};

const AuthorityGuard: React.FC<AuthorityGuardProps> = ({ pageAuth }) => {
  const navigate = useNavigate();
  const userAuth = store.getState().auth.authorization;
  const authorized = verifyAuthority(userAuth, pageAuth);

  useEffect(() => {
    if (!authorized) {
      navigate("/access-denied");
    }
  }, [authorized, navigate, userAuth]);

  return authorized ? <Outlet /> : null;
};

export default AuthorityGuard;
