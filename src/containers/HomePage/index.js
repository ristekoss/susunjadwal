import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { parse } from "query-string";

import { API_BASE_URL, postAuthTicket } from "services/api";
import { SSO_UI_URL } from "config";
import { persistAuth } from "utils/auth";
import { setAuth } from "redux/modules/auth";

import Logoset from "./LogosetColored.png";
import Accent from "./Accent.png";
import Tagline from "./Tagline.png";
import "./styles.css";

function getServiceUrl() {
  return window.location.href.split("?")[0];
}

function redirectToSSO() {
  const serviceUrl = encodeURIComponent(getServiceUrl());
  const loginUrl = `${SSO_UI_URL}/login?service=${serviceUrl}`;
  window.location.replace(loginUrl);
}

function HomePage({ history, location }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function authenticate(ticket, serviceUrl) {
      const {
        data: { major_id: majorId, user_id: userId, token }
      } = await postAuthTicket(ticket, serviceUrl);
      console.log(majorId, userId, token);
      dispatch(setAuth({ majorId, userId, token }));
      persistAuth({ majorId, userId, token });
    }

    const { ticket } = parse(location.search);
    if (ticket) {
      const serviceUrl = getServiceUrl();
      authenticate(ticket, serviceUrl);
    }
  }, [location, dispatch]);

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
          <button className={"loginButton"} onClick={redirectToSSO}>
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
