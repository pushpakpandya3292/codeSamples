"use client";
import { api } from "@/axios";
import { setUser } from "@/store/user";
import { User } from "@prisma/client";
import { AxiosResponse } from "axios";
import { hasCookie } from "cookies-next";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthSync = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const loadUser = async () => {
    api.get("/api/user").then((response: AxiosResponse<{ user: User }>) => {
      dispatch(setUser(response.data.user));
    });
  };

  useEffect(() => {
    if (hasCookie("token")) {
      loadUser();
    }
  }, []);

  return children;
};

export default AuthSync;
