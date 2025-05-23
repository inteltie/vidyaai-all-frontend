import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { useThemeContext } from "@/hooks/ThemeContext";
import { getRatingsCount } from "@/api/apiHelper";
import { useTranslations } from "next-intl";

function OverallClassPerformance() {
  const [data, setData] = useState([]);
  const { isDarkMode } = useThemeContext();
  const [totalRatings, setTotalRatings] = useState(0);
  const t = useTranslations()

  useEffect(() => {
    fetchRatingsCount();
  }, []);

  const fetchRatingsCount = async () => {
    try {
      const response = await getRatingsCount();

      // Calculate total ratings
      const total =
        (response?.data?.data?.count_of_5 || 0) +
        (response?.data?.data?.count_of_4 || 0) +
        (response?.data?.data?.count_of_3 || 0) +
        (response?.data?.data?.count_of_2 || 0) +
        (response?.data?.data?.count_of_1 || 0);

      // Transform the data structure for progress bars
      const transformedData = [
        {
          rating: "5",
          count: response?.data?.data?.count_of_5 || 0,
          percentage: total > 0 ? (
            ((response?.data?.data?.count_of_5 || 0) / total) *
            100
          )?.toFixed(2) : "0.00",
        },
        {
          rating: "4",
          count: response?.data?.data?.count_of_4 || 0,
          percentage: total > 0 ? (
            ((response?.data?.data?.count_of_4 || 0) / total) *
            100
          ).toFixed(2): "0.00",
        },
        {
          rating: "3",
          count: response?.data?.data?.count_of_3 || 0,
          percentage: total > 0 ? (
            ((response?.data?.data?.count_of_3 || 0) / total) *
            100
          ).toFixed(2): "0.00",
        },
        {
          rating: "2",
          count: response?.data?.data?.count_of_2 || 0,
          percentage: total > 0 ? (
            ((response?.data?.data?.count_of_2 || 0) / total) *
            100
          ).toFixed(2): "0.00",
        },
        {
          rating: "1",
          count: response?.data?.data?.count_of_1 || 0,
          percentage: total>0 ? (
            ((response?.data?.data?.count_of_1 || 0) / total) *
            100
          ).toFixed(2): "0.00",
        },
      ];

      setData(transformedData);
      setTotalRatings(total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height:"100%",
        maxHeight: 465,
        flexGrow: 1,
        p: 2,
        mt:5,
        borderRadius: "8px",
        backgroundColor: isDarkMode ? "#1E1E2F" : "#F5F5F5",
      }}
      className="blur_effect_card"
    >
      <Typography
        variant="h6"
        textAlign="center"
        fontWeight="600"
        mb={3}
        sx={{
          color: isDarkMode ? "#FFF" : "#000",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {t("Overall Rating")}
      </Typography>
      {data?.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 1,
          }}
        >
          {/* Rating Name */}
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "4px",
              // width: "100px",
              color: isDarkMode ? "#FFF" : "#000",
              fontSize: "14px",
            }}
          >
            {item?.rating}{" "}
            <span style={{ padding: "2px", marginTop: "2px" }}>
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M12.515 9.65767C12.4294 9.73291 12.3657 9.82995 12.3307 9.93848C12.2958 10.047 12.2909 10.163 12.3166 10.2741L13.3728 14.8475C13.4007 14.967 13.3929 15.092 13.3502 15.207C13.3076 15.322 13.2321 15.4219 13.133 15.4943C13.034 15.5667 12.9158 15.6083 12.7933 15.6141C12.6708 15.6198 12.5493 15.5893 12.4439 15.5264L8.45173 13.1045C8.35473 13.0456 8.24339 13.0144 8.12986 13.0144C8.01633 13.0144 7.90499 13.0456 7.80798 13.1045L3.8158 15.5264C3.71046 15.5893 3.58896 15.6198 3.46642 15.6141C3.34388 15.6083 3.22574 15.5667 3.1267 15.4943C3.02766 15.4219 2.95212 15.322 2.90947 15.207C2.86683 15.092 2.85898 14.967 2.88689 14.8475L3.94314 10.2741C3.96881 10.163 3.96392 10.047 3.92898 9.93848C3.89404 9.82995 3.83036 9.73291 3.7447 9.65767L0.220483 6.58345C0.126264 6.50337 0.0579158 6.39714 0.0240875 6.2782C-0.00974081 6.15927 -0.00752924 6.03297 0.0304422 5.91529C0.0684137 5.79761 0.140439 5.69384 0.237403 5.61711C0.334368 5.54038 0.451915 5.49413 0.57517 5.48423L5.22048 5.08266C5.33382 5.07257 5.44225 5.03173 5.53407 4.96454C5.6259 4.89736 5.69765 4.80638 5.74158 4.70142L7.55642 0.376415C7.60489 0.264596 7.685 0.169389 7.78689 0.10251C7.88877 0.0356318 8.00799 0 8.12986 0C8.25173 0 8.37095 0.0356318 8.47283 0.10251C8.57471 0.169389 8.65482 0.264596 8.7033 0.376415L10.5181 4.70142C10.5621 4.80638 10.6338 4.89736 10.7256 4.96454C10.8175 5.03173 10.9259 5.07257 11.0392 5.08266L15.6845 5.48423C15.8078 5.49413 15.9253 5.54038 16.0223 5.61711C16.1193 5.69384 16.1913 5.79761 16.2293 5.91529C16.2672 6.03297 16.2695 6.15927 16.2356 6.2782C16.2018 6.39714 16.1335 6.50337 16.0392 6.58345L12.515 9.65767Z"
                    fill="#FF9500"
                  />
                </svg>
              }
            </span>
          </Typography>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={item?.percentage || 0}
            sx={{
              flexGrow: 1,
              height: 10,
              width:"100%",
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#49cc4c",
              },
              backgroundColor: isDarkMode ? "#333" : "#e0e0e0",
            }}
          />

          {/* Percentage */}
          <Typography
            sx={{
              width: "50px",
              textAlign: "right",
              color: isDarkMode ? "#FFF" : "#000",
              fontSize: "14px",
            }}
          >
            {item?.percentage || 0}%
          </Typography>
        </Box>
      ))}
      <Typography sx={{fontFamily:"Inter, sans-serif", fontSize:"12px"}}>
        {t("Rating Text")}
      </Typography>
    </Box>
  );
}

export default OverallClassPerformance;
