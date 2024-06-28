import { useContext, useState } from "react";

import Register from "./Regiter";
//import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { sendMessage } from "../../utils";
import { setUser } from "../../services/localStorage";
import styles from "./Login.module.css";
import { LockOutIcon } from "./icons";
import DarkModeSwitch from "../../components/darkModeSwitch/DarkModeSwitch";
import { GlobalStateContext } from "../../context/GlobalStateProvider";

const LoginPage = () => {
  const { AuthData, TITLE, VERSION, STUDIA } = useContext(GlobalStateContext);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { credentials, loginAndGetTokenUrl } = AuthData;
  const today = new Date();
  const year = today.getFullYear();

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    sendMessage("showParanga");
    setLoading(true);
    try {
      const res = await fetch(loginAndGetTokenUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          [credentials.varName]: "emilys", //email,
          password: "emilyspass", //password,
          expiresInMins: 30,
        }),
      });
      if (res.status !== 200 && res.status !== 201) {
        const error = await res.json();
        throw error;
      }
      const user = await res.json();
      setUser(user);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
      sendMessage("showParanga");
    }
  };

  const handleResetPswd = async (e: any) => {
    e.preventDefault();
    //return navigate("/resetpassword");
  };

  const handleRegister = () => {
    setRegister(true);
  };

  return (
    <>
      {!register ? (
        <div className={styles.login}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginHeader}>
              <span>
                <span className="body-m-bold">{TITLE} </span>
                <span> </span>
                <span className="body-m-bold">{VERSION}</span>
                <span> </span>
              </span>

              <DarkModeSwitch />
            </div>
            <div className={styles.loginLogo}>
              <LockOutIcon className={styles.loginIcon} />
            </div>
            <span className="headers-h4">Sign in</span>

            <form
              className={styles.loginForm}
              onSubmit={handleClick}
              autoComplete="off"
            >
              <input
                className="custom-input"
                required
                placeholder={credentials.title}
                type={credentials.type}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
              <input
                placeholder="Password"
                className="custom-input"
                required
                type="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
              />
              {err && (
                <span className={styles.spanError}>
                  Wrong Email or Password
                </span>
              )}
              <button
                type="submit"
                disabled={loading}
                className="button primaryButton"
              >
                SIGN IN
              </button>
              <span
                className="body-m-regular cursorPointer colorPrimary600"
                onClick={handleResetPswd}
              >
                Reset password?
              </span>
              <span
                className="body-m-regular cursorPointer colorPrimary600"
                onClick={handleRegister}
              >
                Signup
              </span>

              <span
                className={`${styles.loginCopyright} body-s-regular  colorGreyBlack`}
              >
                Copyright © {year} {STUDIA}.
              </span>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.login}>
          registre
          {/* <Register
            setRegister={setRegister}
            year={year}
            STUDIA={STUDIA}
            setUserData={setUser}
          /> */}
        </div>
      )}
    </>
  );
};
export default LoginPage;
