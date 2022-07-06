import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";
import Select from "react-select";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState([]);
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video || category) {
      const data = new FormData();
      data.append("usr_id", userData.usr_id);
      data.append("answers", message);
	  data.append("catego_id", category.value);
      if (file) data.append("file", file);
      data.append("video", video);

	//   const media = new FormData();
	//   media.append("file", file);
	//   media.append("res_id", res_id)

      await dispatch(addPost(data));
      dispatch(getPosts());
	  //await dispatch(addMedia(media))
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
	setCategory("");
  };

const options = [
	{ label: "Jardinage", value: 1 },
	{ label: "Bricolage", value: 2 },
	{ label: "Décoration", value: 3 },
	{ label: "Location", value: 4 },
  ];


  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");		  
        }
      }
    };
	
    handleVideo();
	//setCategory("");
  }, [userData, message, video, category.value]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {userData.abonnements ? userData.abonnements.length : 0}
              </span>{" "}
              Abonnement
              {userData.abonnements && userData.abonnements.length > 1
                ? "s"
                : null}
            </p>
            <p>
              <span>{userData.abonnes ? userData.abonnes.length : 0}</span>{" "}
              Abonné
              {userData.abonnes && userData.abonnes.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink exact to="/profil">
            <div className="user-info">
              <img
                src={
                  process.env.REACT_APP_API_URL +
                  "public/upload/images/avatar/" +
                  userData.avatar_img
                }
                alt="user-img"
              />
            </div>
          </NavLink>
          <div className="post-form">
            <div style={{marginTop: "10px", marginBottom: "15px" }}  className="selectView">
			<Select 
          value={category}  
		  options={options}   
          placeholder="Choisissez une catégorie"
          required={true}
          dropdownPosition="top"
          className="select"
          color="#a61651"
          onChange={setCategory}
		  >           
          </Select>
            </div>
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      "public/upload/images/avatar/" +
                      userData.avatar_img
                    }
                    alt="user-pic"
                  />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
					<p>{category.label}</p>
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "180px",
                      }}
                    >
                      Ajouter une image
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handlePicture(e)}
                      />
                    </label>
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                )}
              </div>

              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}

              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}

                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
