import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { API_BASE_URL } from "services/api";
import { persistAuth } from "utils/auth";
import { setAuth } from "redux/modules/auth";

import Logoset from "./LogosetColored.png";
import Accent from "./Accent.png";
import Tagline from "./Tagline.png";
import "./styles.css";

function openSSOWindow() {
  window.open(`${API_BASE_URL}/login/`, "_blank", "width=600,height=600");
}

function HomePage({ history }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    function messageListener(event) {
      if (API_BASE_URL.indexOf(event.origin) === 0) {
        const {
          data: { major_id, token, user_id }
        } = event;

        const auth = {
          majorId: major_id,
          token: token,
          userId: user_id
        };
        dispatch(setAuth(auth));
        persistAuth(auth);
        event.source.close();
      }
    }

    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      history.push("/susun");
    }
  }, [auth, history]);

  function renderBroughtToYouBy() {
    return (
      <div className="broughtToYou center">
        <p>
          <span>Brought to you by</span>
          <img src={Logoset} />
        </p>
      </div>
    );
  }
  return (
    <div className="landingPage">
      <div className="tagline">
        <img src={Tagline} />
      </div>
      <div className={"login"}>
        <div className={"center"}>
          <h1>
            Susun<span>Jadwal</span>
          </h1>
        </div>
        {renderBroughtToYouBy()}
        <div className={"center loginButtonWrapper"}>
          <button className={"loginButton"} onClick={openSSOWindow}>
            LOGIN WITH SSO
          </button>
        </div>
      </div>
      <div className={"accent"}>
        <img src={Accent} />
        {renderBroughtToYouBy()}
      </div>
    </div>
  );
}

export default HomePage;
