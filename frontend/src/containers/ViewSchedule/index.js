import { TableIcon, CalendarIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import ReactGA from "react-ga";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent as ChakraModalContent,
  ModalFooter as ChakraModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import { getSchedule, postRenameSchedule, deleteSchedule } from "services/api";
import { makeAtLeastMs } from "utils/promise";
import { setLoading } from "redux/modules/appState";
import Schedule from "./Schedule";
import ControlledInput from "./ControlledInput";
import { decodeHtmlEntity } from "utils/string";

import deleteImg from "assets/Delete.svg";
import clipboardImg from "assets/Clipboard.svg";
import { SuccessToast } from "components/Toast";

import getFormattedSchedule from "utils/schedule";
import ScheduleList from "./ScheduleList";

function ViewSchedule({ match, history }) {
  const isMobile = useSelector((state) => state.appState.isMobile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);
  const { scheduleId } = useParams();
  const dispatch = useDispatch();

  const [schedule, setSchedule] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [isDisplayTimetable, setIsDisplayTimetable] = useState(true);

  let formattedSchedule = {};
  let totalCredits = 0;

  if (schedule) {
    [formattedSchedule, totalCredits] = getFormattedSchedule(schedule);
  }

  async function onRename(slug, value) {
    if (auth) {
      await postRenameSchedule(auth.userId, slug, value);
      setSchedule({ ...schedule, name: value });
    }
  }

  useEffect(() => {
    async function fetchSchedule() {
      dispatch(setLoading(true));
      const {
        data: { user_schedule },
      } = await makeAtLeastMs(getSchedule(match.params.scheduleId), 1000);
      setSchedule(user_schedule);
      setCreatedAt(new Date(user_schedule.created_at));
      dispatch(setLoading(false));
    }
    fetchSchedule();
  }, [match, dispatch]);

  const scheduleName = schedule && schedule.name;

  const showAlertCopy = () => {
    ReactGA.event({
      category: "Bagikan Jadwal",
      action: "Copied a schedule's URL"
    });
    SuccessToast(
      "Link berhasil disalin!",
      isMobile
    );
  };

  const performDeleteSchedule = async (userId, scheduleId) => {
    ReactGA.event({
      category: "Hapus Jadwal",
      action: "Deleted a schedule"
    });
    dispatch(setLoading(true));
    await makeAtLeastMs(deleteSchedule(userId, scheduleId), 1000);
    history.push("/jadwal");
  };

  const confirmDeleteSchedule = (scheduleId) => {
    performDeleteSchedule(auth.userId, scheduleId);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>Apakah kamu yakin ingin menghapus jadwal?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant="outline">
              Batal
            </Button>
            <Button
              onClick={() => confirmDeleteSchedule(schedule.id)}
              variant="danger"
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <MainContainer>
        <Helmet
          title={scheduleName ? `Jadwal ${scheduleName}` : `Jadwal Untitled`}
          meta={[{ name: "description", content: "Description of Jadwal" }]}
        />

        {schedule && (
          <Container>
            <HeaderContainer>
              {schedule.has_edit_access ? (
                <ScheduleNameEditable>
                  <ControlledInput
                    name={decodeHtmlEntity(schedule.name)}
                    slug={match.params.scheduleId}
                    rename={onRename}
                  />
                  <p>
                    Dibuat pada{" "}
                    {createdAt?.getDate() +
                      "/" +
                      (createdAt?.getMonth() + 1) +
                      "/" +
                      createdAt?.getFullYear()} • {totalCredits} SKS
                  </p>
                </ScheduleNameEditable>
              ) : (
                <ScheduleName>{decodeHtmlEntity(schedule.name)}</ScheduleName>
              )}

              <IconContainer isAuthenticated={Boolean(auth)}>
                <CopyToClipboard
                  text={`${window.location.href}/${schedule.id}`}
                  onCopy={showAlertCopy}
                >
                  <ImageButton>
                    <img src={clipboardImg} alt="copy" />
                  </ImageButton>
                </CopyToClipboard>
                <ImageButton onClick={onOpen}>
                  <img src={deleteImg} alt="delete" />
                </ImageButton>
              </IconContainer>
            </HeaderContainer>

            <ButtonContainer isAuthenticated={Boolean(auth)}>
              <Link to={`/edit/${scheduleId}`}>
                <Button
                  mr={{ base: '0rem', lg: '1rem' }}
                  intent="primary"
                  variant="outline"
                  onClick={() => null}
                >
                  {schedule.has_edit_access ? "Edit" : "Copy"}
                </Button>
              </Link>

              <ViewToggleContainer>
                <ViewListContainer
                  isActive={!isDisplayTimetable}
                  onClick={() => setIsDisplayTimetable(false)}
                >
                  <TableIcon width={20} />
                </ViewListContainer>
                <ViewCalendarContainer
                  isActive={isDisplayTimetable}
                  onClick={() => setIsDisplayTimetable(true)}
                >
                  <CalendarIcon width={20} />
                </ViewCalendarContainer>
              </ViewToggleContainer>
            </ButtonContainer>
          </Container>
        )}

        {isDisplayTimetable ? (
          <Schedule
            width="100%"
            pxPerMinute={isMobile ? 0.7 : 0.9}
            schedule={schedule}
            startHour={7}
            endHour={21}
            showHeader
            showLabel
            showRoom
          />
        ) : (
          <ScheduleList
            formattedSchedule={formattedSchedule}
            totalCredits={totalCredits}
          />
        )}
      </MainContainer>
    </>
  );
}

const ModalContent = styled(ChakraModalContent).attrs({
  padding: { base: "16px 24px", lg: "20px 24px" },
  width: { base: "90%", lg: "initial" },
  textAlign: "center",
})``;

const ModalFooter = styled(ChakraModalFooter).attrs({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: { base: "12px", lg: "16px" },
})`
  button {
    margin: 0px 4px;
  }
`;

const MainContainer = styled.div`
  padding: 0px !important;
  margin: -56px -24px 0;

  @media (min-width: 900px) {
    margin: -36px -80px 0;
  }
`;

const Container = styled.div`
  padding: 24px 24px 28px;

  @media (min-width: 900px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 32px 80px 40px;

    & > :nth-child(1) {
      flex-grow: 1;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: space-between;
  margin-right: -16px;

  @media (min-width: 900px) {
    margin-right: 0px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${props => props.isAuthenticated
    ? 'visibility: visible;'
    : 'visibility: hidden;'
  }
`;

const ButtonContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  display: flex;

  a {
    ${props => props.isAuthenticated
      ? 'visibility: visible;'
      : 'visibility: hidden;'
    }
  }

  @media (min-width: 900px) {
    margin-top: 0px;
  }
`;

const ScheduleNameEditable = styled.div`
  p {
    text-align: left;
    margin-top: 4px;
    font-size: 12px;
  }

  @media (min-width: 900px) {
    p {
      font-size: 14px;
    }
  }
`;

const ScheduleName = styled.div`
  font-size: 32px;
  color: ${props => props.theme.color.secondaryMineShaft};
`;

const ImageButton = styled.div`
  justify-content: center;
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  border-radius: 1em;
`;

const ViewListContainer = styled.div`
  background-color: ${(props) =>
    props.isActive
      ? props.theme.color.primaryPurple
      : props.theme.color.primaryWhite};
  padding: 10px 1rem;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  border-left: 1px solid ${(props) => props.theme.color.primaryPurple};
  border-top: 2px solid ${(props) => props.theme.color.primaryPurple};
  border-bottom: 2px solid ${(props) => props.theme.color.primaryPurple};
  svg {
    color: ${(props) =>
      props.isActive
        ? props.theme.color.primaryWhite
        : props.theme.color.primaryPurple
    };
  }
`;

const ViewCalendarContainer = styled.div`
  background-color: ${(props) =>
    props.isActive
      ? props.theme.color.primaryPurple
      : props.theme.color.primaryWhite};
  padding: 10px 1rem;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  border-right: 1px solid ${(props) => props.theme.color.primaryPurple};
  border-top: 2px solid ${(props) => props.theme.color.primaryPurple};
  border-bottom: 2px solid ${(props) => props.theme.color.primaryPurple};

  svg {
    color: ${(props) =>
      props.isActive
        ? props.theme.color.primaryWhite
        : props.theme.color.primaryPurple
    };
  }
`;

export default ViewSchedule;
