import axios from "axios";
import React, { useState } from "react";

const SignInForm = () => {
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordErr] = useState("");

  //for email
  const emailValidation = (evnt) => {
    const emailInputValue = evnt.target.value.trim();
    const emailInputFieldName = evnt.target.name;

    if (emailInputFieldName === "email") {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const emailLength = emailInputValue.length;
      const emailValide = regex.test(emailInputValue);

      let errMailMsg = "";
      if (emailLength === 0) {
        errMailMsg = "Le champ email est vide";
      } else if (!emailValide) {
        errMailMsg = "L'email est incorrect";
      } else {
        errMailMsg = "";
      }
      setMailError(errMailMsg);
    }
  };

  //for password
  const passwordValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;

    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;

      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Le mot de passe est vide";
      } else if (!uppercasePassword) {
        errMsg = "Il faut au moins une Majuscule";
      } else if (!lowercasePassword) {
        errMsg = "Il faut au moins une minuscule";
      } else if (!digitsPassword) {
        errMsg = "Il faut un chiffre";
      } else if (!specialCharPassword) {
        errMsg = "Il faut au moins un caractère spécial";
      } else if (!minLengthPassword) {
        errMsg = "Il faut 8 caractères minimum";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const mailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: false,
      data: {
        mail,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          mailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
          localStorage.setItem("token", res.data.acces_token);
          localStorage.setItem("User", JSON.stringify(res.data.user));
          // console.log(res.data.acces_token);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Email ou mot de passe incorrect");
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setMail(e.target.value)}
        onKeyUp={emailValidation}
        value={mail}
      />
      <p className="text-danger">{mailError}</p>
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
		onKeyUp={passwordValidation}
        value={password}
      />
	  <p className="text-danger">{passwordError}</p>
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
