import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "./register.module.css";

import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//import LockIcon from '@mui/icons-material/Lock';
//import { FaEye } from "react-icons/fa";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
//import { BiErrorAlt } from "react-icons/bi";
//import { GrMail } from "react-icons/gr";
//import { BsFillCheckSquareFill } from "react-icons/bs";
import CheckIcon from "@mui/icons-material/Check";
import {
  checkbox_validation,
  email_validation,
  name_validation,
  password_confirm_validation,
  password_validation,
} from "./inputs";
import { Input } from "../inputs/Input";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { IUser } from "../../models/user";
import { AppGlobalContext } from "../../context/appGlobalContext";

const Register = ({
  setRegister,
  setUserData,
  year,
  STUDIA,
}: {
  setRegister: Dispatch<SetStateAction<boolean>>;
  setUserData: (d: IUser | null) => void;
  year: number;
  STUDIA: string;
}) => {
  const { toggleDarkMode, darkMode, toggleParangaForViewportFalse, toggleParangaForViewportTrue } =
    useContext(AppGlobalContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  let password;

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .max(50)
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email not valid",
      ),
    // name: Yup.string().min(3).max(50),

    password: Yup.string()
      .required("Required")
      .min(12, "Password must be 12 characters long.")
      .max(50, "Must be 50 characters or less.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[^\w]/, "Password must contain at least one symbol."),
    cpassword: Yup.string()
      .required("Confirm Password is required")

      .oneOf([Yup.ref("password")], "Passwords do not match"),
    confirm: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   watch,
  //   getValues, }
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  password = methods.watch("password", "");

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    const { email, password } = data;
    toggleParangaForViewportTrue();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
      if (res.status !== 200 && res.status !== 201) {
        const error = await res.json();

        throw error;
      }
      const user = await res.json();
      methods.reset();
      setSuccess(true);
      //console.log(user);
      // if (projectid) {
      //   window.top?.postMessage(user, "*");
      // }
      setUserData(user);
    } catch (err: any) {
      setError(err.message || "Internal Server Error");
      console.log(err);
    } finally {
      toggleParangaForViewportFalse();
    }
  });

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const email = e.target[0].value;
  //   const password = e.target[1].value;

  //   try {
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         password,
  //       }),
  //     });
  //     res.status === 201 && router.push("/dashboard/login?success=Account has been created");
  //   } catch (err: any) {
  //     setError(err);
  //     console.log(err);
  //   }
  // };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Complete the following form to signup.</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className={styles.form}
        >
          <div className={styles.inputWrap}>
            {/* <Input {...name_validation} /> */}
            <Input {...email_validation} />
            <Input {...password_validation} />

            <Input {...password_confirm_validation} className={styles.textArea} />
            <Input {...checkbox_validation} />
          </div>
          <div className={styles.submitWrap}>
            {success && (
              <p className={styles.success}>
                <CheckIcon /> Form has been submitted successfully
              </p>
            )}
            {error && (
              <p className={styles.errorMessage}>
                <ReportOutlinedIcon /> {error}
              </p>
            )}
            <button onClick={onSubmit} className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
      {/* <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        
        <div className={styles.inputWrap}>

        </div>
        
        <div className={styles.wrap_label}>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <FaLock />
          <FaEye
            id="showpass"
            className="fa fa-eye icon"
            onClick={() => {
              setToggle1(!toggle1);
            }}
          ></FaEye>
          <input
            id="password"
            className={styles.input}
            type={toggle1 ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          ></input>
          <div>{errors?.password?.message}</div>
        </div>
        <p className="alerts">{errors.password?.message}</p>
        <div className="Label2">
          <label>Confirm Password</label>
        </div>
        <div className="input2">
          <FaLock id="passlock" />
          <FaEye
            id="showpass"
            className="fa fa-eye icon"
            onClick={() => {
              setToggle2(!toggle2);
            }}
          ></FaEye>
          <input
            className={styles.input}
            type={toggle2 ? "text" : "password"}
            placeholder="Password"
            {...register("cpassword")}
          ></input>
        </div>
        <p className="alerts">{errors.cpassword?.message}</p>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form> */}
      <span className={styles.or}>- OR -</span>
      <span className={styles.backToLogin} onClick={() => setRegister(false)}>
        Login with an existing account
      </span>

      <Typography className="loginCopyright" sx={{ color: "text.secondary" }}>
        Copyright © {year} {STUDIA}.
      </Typography>
    </div>
  );
};

export default Register;
