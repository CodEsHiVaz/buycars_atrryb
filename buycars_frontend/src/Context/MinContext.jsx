import { createContext, useEffect, useState } from "react";
import { AuthApi, MainApi, NonFormApi } from "../Utils/Api/instance";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../Utils/storeToken";
import axios from "axios";
export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [token, settoken] = useState(null);
  const [inventry, setInventry] = useState([]);
  const [savedforCurd, setSavedforCurd] = useState({});
  const [oemSpecList, setOemSpecsList] = useState([]);
  const navigate = useNavigate();
  const signin = async (payload) => {
    AuthApi.post("/auth/login", payload)
      .then((response) => {
        // console.log(".then  response:", response.data.user);

        storeToken(
          "user",
          JSON.stringify({
            userId: response.data.user.userId,
            name: response.data.user.name,
          })
        );
        storeToken("token", response.data.user.token);
        setisAuth(true);
        navigate("/");
      })
      .catch((err) => {
        console.log("signin  err:", err.response);
      });
  };
  const signup = async (payload) => {
    //     });
    AuthApi.post("/auth/signup", payload)
      .then((response) => {
        storeToken(
          "user",
          JSON.stringify({
            userId: response.data.user.userId,
            name: response.data.user.name,
          })
        );
        storeToken("token", response.data.user.token);
        setisAuth(true);
        navigate("/");
      })
      .catch((err) => {
        console.log("signup  err:", err);
      });
  };
  const postInventry = (payload) => {
    MainApi.post(`/inventry/create`, payload)
      .then((res) => {
        console.log(".then  res:", res);
        navigate("/inventry");
      })
      .catch((err) => {
        console.log("MainApi.post  err:", err);
      });
  };
  const getInventry = () => {
    NonFormApi.get("/inventry")
      .then((res) => {
        setInventry(res.data.data);
      })
      .catch((err) => {
        console.log("MainApi.get  err:", err);
      });
  };
  const editInventry = (id, payload) => {
    MainApi.patch(`/inventry/update/${id}`, payload)
      .then((res) => {
        console.log(".then  res:", res);
        // navigate("/inventry");
        // setInventry(res.data.data);
      })
      .catch((err) => {
        console.log("MainApi.update  err:", err);
      });
  };
  const deleteInventry = (ids) => {
    NonFormApi.post("/inventry/delete", ids)
      .then((res) => {
        const filteredArray = inventry.filter(
          (item) => !ids.ids.some((id) => id === item._id)
        );
        setInventry(filteredArray);

        console.log(".then  res:", res);
      })
      .catch((err) => {
        console.log("MainApi.delete  err:", err);
      });
  };
  const getSingleInventry = (id) => {
    NonFormApi.get(`/inventry/${id}`)
      .then((res) => {
        console.log(".then  res:", res);
      })
      .catch((err) => {
        console.log("MainApi.get  err:", err);
      });
  };
  const getOemmSpecs = () => {
    NonFormApi.get(`/oem`)
      .then((res) => {
        console.log("getOemmSpecs  res:", res.data.data);
        setOemSpecsList(res.data.data);
      })
      .catch((err) => {
        console.log("getOemmSpecs  err:", err);
      });
  };



  return (
    <MainContext.Provider
      value={{
        isAuth,
        setisAuth,
        signin,
        signup,
        settoken,
        inventry,
        postInventry,
        getInventry,
        setSavedforCurd,
        savedforCurd,
        deleteInventry,
        getSingleInventry,
        editInventry,
        getOemmSpecs,
        oemSpecList,
        setOemSpecsList,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
