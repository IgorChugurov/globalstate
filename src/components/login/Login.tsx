import React, { useContext } from "react";
import styles from "./Login.module.css";
import {
  createSchema,
  getItemForEdit,
  sendMessage,
  setError,
  setSuccess,
} from "../../utils";
import { FormProvider, set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputText } from "../inputs/InputText";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { InputSelect } from "../inputs/InputSelect";
import { InputSwitch } from "../inputs/InputSwitch";
import { InputRadio } from "../inputs/InputRadio";
import { setUser } from "../../services/localStorage";

const Login = () => {
  const { AuthData } = useContext(GlobalStateContext);

  const { fields, loginAndGetTokenUrl } = AuthData;
  const item = getItemForEdit(fields);
  const resolverSchema = Yup.object().shape(createSchema(fields));
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(resolverSchema),
    defaultValues: item,
  });
  const { control } = methods;

  const onSubmitUpload = methods.handleSubmit(async (data) => {
    sendMessage("showParange");
    try {
      const res = await fetch(loginAndGetTokenUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        //body: JSON.stringify(data),
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass", //password,
          expiresInMins: 30,
        }),
      });
      if (res.status !== 200 && res.status !== 201) {
        const error = await res.json();
        throw error;
      }
      setSuccess("Login successful");

      const user = await res.json();
      setUser(user);
      window.location.href = "/";
    } catch (err: any) {
      console.log(err);
      setError(err.message || "an error occurred");
    } finally {
      sendMessage("hideParange");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerLeft}>
        <div className={styles.containerLeftInner}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginTitle}>
              <span className={`${styles.title} headings-h1`}>Sign in</span>
              <span className={`${styles.text} body-l-regular`}>
                Please, enter your details to Sign in
              </span>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={(e) => e.preventDefault()}
                noValidate
                autoComplete="new-password"
                className={styles.form}
              >
                {fields.map((field) => {
                  return (
                    <React.Fragment key={field.name}>
                      {field.type === "select" ? (
                        <InputSelect
                          {...field}
                          control={control}
                          options={field.options ? field.options : []}
                        />
                      ) : field.type === "switch" ? (
                        <InputSwitch {...field} control={control} />
                      ) : field.type === "radio" ? (
                        <InputRadio {...field} control={control} />
                      ) : (
                        <InputText {...field} />
                      )}
                    </React.Fragment>
                  );
                })}
              </form>
            </FormProvider>

            <div className={styles.loginFogot}>
              <button className="button tertiaryButton">
                <span className="body-m-medium">Forgot your password?</span>
              </button>
            </div>
          </div>
          <button className={`${styles.loginButton} button primaryButton`}>
            <span className="body-l-medium" onClick={onSubmitUpload}>
              Sign in
            </span>
          </button>
        </div>
      </div>
      <div className={styles.containerRight}></div>
      <div className={styles.loginWrapper}></div>
    </div>
  );
};

export default Login;
