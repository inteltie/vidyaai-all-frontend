import React, { useState, useEffect, useMemo } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { getLectureSummary, getLectureHighlights } from "@/api/apiHelper";
import LectureNotes from "./LectureNotes";
import LectureMCQ from "./LectureMCQ";
import LectureQuestions from "./LectureQuestions";
import LectureAssignment from "./LectureAssignment";
import LectureReferrence from "./LectureReferrence";
import { useThemeContext } from "@/hooks/ThemeContext";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import StudentMCQ from "./StudentMCQ";
import StudentMOLAssignment from "./StudentMOLAssignment";
import { useTranslations } from "next-intl";

const window = global?.window || {};

const LectureDetails = ({
  id,
  classID,
  marksData = {},
  isStudent = false,
  setMarksData,
  lang
}) => {
  const { isDarkMode } = useThemeContext();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [decisionId, setDecisionId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const t = useTranslations()
  const language = lang

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("ACCESS_TOKEN");
      setUserDetails(token ? decodeToken(token) : {});
    }
  }, []);

  const class_ID = classID;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const memoizedLectureNotes = useMemo(
    () => (
      <LectureNotes
        id={id}
        isDarkMode={isDarkMode}
        marksData={marksData}
        isStudent={isStudent}
        setMarksData={setMarksData}
        language = {language}
      />
    ),
    [id, isDarkMode, marksData, language]
  );

  const memoizedLectureMCQ = useMemo(
    () => <LectureMCQ id={id} isDarkMode={isDarkMode} language = {language}/>,
    [id, isDarkMode, language]
  );

  const memoizedStudentMCQ = useMemo(
    () => <StudentMCQ id={id} isDarkMode={isDarkMode} language = {language}/>,
    [id, isDarkMode, language]
  );

  const memoizedStudentMOLAssignment = useMemo(
    () => (
      <StudentMOLAssignment
        id={id}
        isDarkMode={isDarkMode}
        class_ID={class_ID}
      />
    ),
    [id, isDarkMode, class_ID]
  );

  const memoizedLectureQuestions = useMemo(
    () => <LectureQuestions id={id} isDarkMode={isDarkMode} language = {language}/>,
    [id, isDarkMode, language]
  );
  const memoizedLectureAssignment = useMemo(
    () => (
      <LectureAssignment
        id={id}
        isDarkMode={isDarkMode}
        class_ID={class_ID}
        isEdit={true}
        language = {language}
      />
    ),
    [id, isDarkMode, class_ID, language]
  );
  const memoizedLectureReferrence = useMemo(
    () => <LectureReferrence id={id} isDarkMode={isDarkMode} />,
    [id, isDarkMode]
  );

  return (
    <Box sx={{ marginTop: "8px" }}>
      <Typography
        variant="h4"
        fontFamily={"Nunito"}
        sx={{
          bgcolor: "",
          borderRadius: "8px",
          padding: 2,
          color: isDarkMode ? "#F0EAD6" : "#36454F",
        }}
      >
        <b>{t("Lecture Details")}</b>
        <br />
        <span
          style={{
            fontSize: "16px",
            color: isDarkMode ? "#F0EAD6" : "#36454F",
          }}
        >
          {userDetails?.role==="STUDENT" ? <i>{t("This is an AI generated content")}</i> : <i>{t("AI Generated Label Teacher")}</i> }
        </span>
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="lecture overview tabs"
        indicatorColor="none"
        sx={{
          ".MuiTabs-flexContainer": {
            gap: 2,
            // background: isDarkMode
            //   ? "linear-gradient(177.9deg, rgb(58, 62, 88) 3.6%, rgb(119, 127, 148) 105.8%)"
            //   : "linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)",
            background:
              isDarkMode &&
              "linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)",
            backgroundImage: isDarkMode ? "" : "url('/TabBG2.jpg')", // Add background image
            backgroundSize: "cover", // Ensure the image covers the entire page
            backgroundPosition: "center", // Center the image
            padding: 1,
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          },
          ".MuiTab-root": {
            color: "#333",
            padding: "10px 20px",
            minHeight: 0,
            marginTop: "8px",
            textAlign: "center",
            color: isDarkMode && "#F0EAD6",
            "&:hover": {
              backgroundColor: "#e0e0e0",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              color: "black",
            },
            "&.Mui-selected": {
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
            },
          },
        }}
      >
        <Tab label={t("Notes")} />
        <Tab label={t("MCQ")} />
        <Tab label={t("Questions")} />
        <Tab label={t("Assignment")} />
        <Tab label={t("Reference")} />
      </Tabs>

      {/* Render tab content conditionally based on selected tab */}
      {value === 0 && memoizedLectureNotes}
      {value === 1 &&
        (userDetails?.role === "STUDENT"
          ? memoizedStudentMCQ
          : memoizedLectureMCQ)}
      {value === 2 && memoizedLectureQuestions}
      {value === 3 &&
        (userDetails?.role === "STUDENT"
          ? memoizedStudentMOLAssignment
          : memoizedLectureAssignment)}
      {value === 4 && memoizedLectureReferrence}
    </Box>
  );
};

export default LectureDetails;
