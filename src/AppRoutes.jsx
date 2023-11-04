import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Success } from "./pages/Success";
import { Virus } from "./pages/Virus";
import { getInfo, updateCode, updateVirus } from "./config/firebaseConfig";
import { Admin } from "./pages/Admin";
import { Reset } from "./pages/Reset";

export const AppRoutes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [virus, setVirus] = useState(false);
  const [info, setInfo] = useState(null);
  const [mesage, setMessage] = useState((<pre>Вход выполнен успешно.</pre>));
  const navigate = useNavigate();
  let vMsg = ''

  useEffect(() => {
    const getInfoFromDb = async () => {
      const info = await getInfo();
      setInfo(info);

      setVirus(info.virus)
    };
    getInfoFromDb();
  }, []);

  useEffect(() => {
      document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        if (code == 'Space') {
          vMsg = ''
        } else {
          addVmsg(name)
        }
      });
  },[isSignedIn])

  const addVmsg = (key) => {
    vMsg = vMsg + key

    if (vMsg === 'virus' && isSignedIn) {
      handleVirusReturn(true)
    }
    if (vMsg === 'antivirus') {
      handleVirusReturn(false)
      setMessage( (<pre>Система восстановлена.<br />Вирус ликвидирован</pre>) );
    }
  }

  const handleUpdateCode = async (str) => {
    const updated = await updateCode(str);
    if (updated) {
      setMessage( ( <pre>Код успешно обновлён.</pre> ) );
      navigate("/");
    }
  };

  const handleVirusReturn = async (bol) => {
    const updated = await updateVirus(bol);
    setVirus(updated)
    navigate("/");
  }

  return (
    <>
    {virus && <Virus />}
    <div className=""  style={
      virus ? {transition: 'all 1s', filter: 'grayscale() blur(1px)'} : {}
    }>
      {isSignedIn ? (
        <Routes>
          <Route
            path="/"
            element={
              <Success
                messageContent={mesage}
              />
            }
          />
          <Route
            path="/reset"
            element={
              isAdmin ? (
                <Reset returnSuccess={(str) => handleUpdateCode(str)} />
              ) : (
                <Admin returnSuccess={() => setIsAdmin(true)} info={info} />
              )
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Home returnSuccess={() => setIsSignedIn(true)} info={info} />
            }
          />
          <Route
            path="*"
            replace={true}
            element={<Navigate replace to="/" />}
          />
        </Routes>
      )}
    </div>
    </>
  );
};
