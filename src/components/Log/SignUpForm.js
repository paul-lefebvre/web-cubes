import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const roles = "citoyen";

  // for pseudo
  const pseudoValidation = (evnt) => {
    const pseudoInputValue = evnt.target.value.trim();
    const pseudoInputFielName = evnt.target.name;

    if (pseudoInputFielName === "pseudo") {
      const pseudoLength = pseudoInputValue.length;
      const minLengthRegExp = /.{3,}/;
      const minLengthPseudo = minLengthRegExp.test(pseudoInputValue);

      let errPseudoMsg = "";

      if (pseudoLength === 0) {
        errPseudoMsg = "Indiquez un Pseudo !";
      } else if (!minLengthPseudo) {
        errPseudoMsg = "Votre pseudo doit faire au moins 3 caractères";
      } else {
        errPseudoMsg = "";
      }
      setPseudoError(errPseudoMsg);
    }
  };

  // for firstname
  const firstnameValidation = (evnt) => {
    const firstnameInputValue = evnt.target.value.trim();
    const firstnameInputFielName = evnt.target.name;

    if (firstnameInputFielName === "prenom") {
      const firstnameLength = firstnameInputValue.length;
      const minLengthRegExp = /.{3,}/;
      const minLengthFirstname = minLengthRegExp.test(firstnameInputValue);

      let errFirstnameMsg = "";

      if (firstnameLength === 0) {
        errFirstnameMsg = "Renseignez un Prénom !";
      } else if (!minLengthFirstname) {
        errFirstnameMsg = "Votre prénom doit faire au moins 3 caractères";
      } else {
        errFirstnameMsg = "";
      }
      setFirstnameError(errFirstnameMsg);
    }
  };

  // for lastname
  const lastnameValidation = (evnt) => {
    const lastnameInputValue = evnt.target.value.trim();
    const lastnameInputFielName = evnt.target.name;

    if (lastnameInputFielName === "nom") {
      const lastnameLength = lastnameInputValue.length;
      const minLengthRegExp = /.{2,}/;
      const minLengthLastname = minLengthRegExp.test(lastnameInputValue);

      let errLastnameMsg = "";

      if (lastnameLength === 0) {
        errLastnameMsg = "Renseignez un Nom !";
      } else if (!minLengthLastname) {
        errLastnameMsg = "Votre Nom doit faire au moins 2 caractère";
      } else {
        errLastnameMsg = "";
      }
      setLastnameError(errLastnameMsg);
    }
  };

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const firstnameError = document.querySelector(".prenom.error");
    const lastnameError = document.querySelector(".nom.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    const minLengthRegExp = /.{3,}/;
    const minLengthPseudo = minLengthRegExp.test(pseudo);
    const minLengthFirstname = minLengthRegExp.test(firstname);
    const minLengthRegExpLastname = /.{2,}/;
    const minLengthLastname = minLengthRegExpLastname.test(lastname);
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const emailValide = regex.test(mail);

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    pseudoError.innerHTML = "";
    firstnameError.innerHTML = "";
    lastnameError.innerHTML = "";
    emailError.innerHTML = "";

    if (
    //   pseudo !== minLengthPseudo ||
    //   firstname !== minLengthFirstname ||
    //   lastname !== minLengthLastname ||
       password !== controlPassword ||
    //   mail !== emailValide ||
      !terms.checked
    ) {
      if (pseudo !== minLengthPseudo) {
        pseudoError.innerHTML = "Le Pseudo n'est pas correct";
      }
      if (firstname !== minLengthFirstname) {
        firstnameError.innerHTML = "Le Prénom n'est pas correct";
      }
      if (lastname !== minLengthLastname) {
        lastnameError.innerHTML = "Le Nom n'est pas correct";
      }
      if (mail !== emailValide) {
        emailError.innerHTML = "L'email n'est pas correct !!";
      }
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked) {
        termsError.innerHTML = "Veuillez valider les conditions générales";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/`,
        data: {
          pseudo,
          firstname,
          lastname,
          mail,
          password,
          roles,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            firstnameError.innerHTML = res.data.errors.firstname;
            lastnameError.innerHTML = res.data.errors.lastname;
            emailError.innerHTML = res.data.errors.mail;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch(
          (err) => console.log(err),
          alert("Un incident est survenu. Veuillez réessayer...")
        );
    }
    console.log(pseudo, firstname, lastname, mail, password, roles);
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            onKeyUp={pseudoValidation}
            value={pseudo}
          />
          <p className="text-danger">{pseudoError}</p>
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            onChange={(e) => setFirstname(e.target.value)}
            onKeyUp={firstnameValidation}
            value={firstname}
          />
          <p className="text-danger">{firstnameError}</p>
          <div className="prenom error"></div>
          <br />
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            onChange={(e) => setLastname(e.target.value)}
            onKeyUp={lastnameValidation}
            value={lastname}
          />
          <p className="text-danger">{lastnameError}</p>
          <div className="nom error"></div>
          <br />
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
          <label htmlFor="password-conf">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            onKeyUp={passwordValidation}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a
              href="https://www.cesi.fr/politique-de-confidentialite/"
              target="_blank"
              rel="noopener noreferrer"
            >
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
