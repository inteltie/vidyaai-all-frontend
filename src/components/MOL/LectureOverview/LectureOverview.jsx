import React, { useState, useEffect, useMemo } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { getLectureSummary, getLectureHighlights } from "@/api/apiHelper";
import TextWithMath from "@/commonComponents/TextWithMath/TextWithMath";
import SummaryComponent from "./SummaryComponent";
import HighlightsComponent from "./HighlightsComponent";
import { useThemeContext } from "@/hooks/ThemeContext";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { useTranslations } from "next-intl";

const window = global?.window || {};

const LectureOverview = ({
  lectureId,
  isEdit = false,
  marksData = {},
  isStudent = false,
  setMarksData,
  lang
}) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [summaryId, setSummaryId] = useState("");
  const { isDarkMode } = useThemeContext();
  const [userDetails, setUserDetails] = useState(null);
  const t = useTranslations()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("ACCESS_TOKEN");
      setUserDetails(token ? decodeToken(token) : {});
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const language = lang

  const summaryComponent = useMemo(
    () => (
      <SummaryComponent
        lectureId={lectureId}
        isDarkMode={isDarkMode}
        isEdit={isEdit}
        marksData={marksData}
        isStudent={isStudent}
        setMarksData={setMarksData}
        language={language}
      />
    ),
    [marksData, lectureId, isDarkMode]
  );

  const highlightsComponent = useMemo(
    () => (
      <HighlightsComponent
        lectureId={lectureId}
        isDarkMode={isDarkMode}
        marksData={marksData}
        isStudent={isStudent}
        setMarksData={setMarksData}
        language={language}
      />
    ),
    [marksData, lectureId, isDarkMode]
  );

  return (
    <Box sx={{ marginTop: "8px" }}>
      <Typography
        variant="h4"
        sx={{
          bgcolor: "",
          borderRadius: "8px",
          padding: 2,
          color: isDarkMode ? "#F0EAD6" : "#36454F",
        }}
      >
        <b>{t("Lecture Overview")}</b>
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
            background:
              isDarkMode &&
              "linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)",
            backgroundImage: isDarkMode ? "" : "url('/TabBG2.jpg')", // Add background image
            backgroundSize: "cover", // Ensure the image covers the entire page
            backgroundPosition: "center", // Center the image
            padding: 1,
            // borderRadius: "12px",
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
        <Tab label={t("Summary")} />
        <Tab label={t("Highlights")} />
      </Tabs>

      {/* Render tab content conditionally based on selected tab */}
      {value === 0 && summaryComponent}
      {value === 1 && highlightsComponent}
    </Box>
  );
};

export default LectureOverview;
