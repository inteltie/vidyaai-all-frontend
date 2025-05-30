import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import UserImage from "@/commonComponents/UserImage/UserImage";
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";
import { MdOutlineCreditScore, MdOutlineMail } from "react-icons/md";
import { TbSquareRoundedPercentage } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import { useThemeContext } from "@/hooks/ThemeContext";
import { useRouter, usePathname } from "next/navigation";
import { FaDiamond } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const StudentAssignments = ({ listData }) => {
  const { isDarkMode, primaryColor, secondaryColor } = useThemeContext();
  const router = useRouter();
  const pathname = usePathname();
  const handleRoute = async (id) => {
    router.push(`${pathname}/${id}`);
  };
  const t = useTranslations()
  return (
    <Box mt={4} px={2}>
      <Typography variant="h6" color={isDarkMode ? "#f1f1f1" : "#000"} mb={4} fontFamily={"monospace"} fontWeight={""} fontSize={"24px"}>
        {t("Students Assignment Submission Details")} -
      </Typography>
      <Grid container spacing={3} sx={{display:"flex"}}>
        {listData?.data?.length > 0 ? (
          listData?.data?.map((assignment, index) => (
            <Grid item xs={12} sm={6} key={index} sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: isDarkMode ? "#f1f1f1" : "#000",
                  borderRadius: "16px",
                  boxShadow: isDarkMode
                    ? "0px 6px 15px rgba(0, 0, 0, 0.4)"
                    : "0px 4px 10px #ADD8E6",
                  padding: "16px",
                  width:"95%",
                }}
                onClick={() => handleRoute(assignment?.id)}
              >
                <CardContent>
                
                <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h6"><FaDiamond style={{fontSize:"12px", marginRight:"4px"}}/>{t("Submitted by")}</Typography>
                <Typography variant="h6"><FaDiamond style={{fontSize:"12px", marginRight:"4px"}}/>{t("Checked Status")}</Typography>
                </Box>
                
                  <Box display="flex" alignItems="center" gap={2}>
                    <UserImage
                      profilePic={assignment?.user?.profile_pic}
                      name={assignment?.user?.full_name}
                    />
                    <Box flex="1">
                      <Typography variant="h6" fontWeight="bold">
                        {assignment?.user?.full_name}
                      </Typography>
                      <Typography variant="body2" color={secondaryColor}>
                        {t("Email")}: {assignment?.user?.email}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {assignment?.total_submitted_assignment ===
                      assignment?.checked_assignments ? (
                        <FaCheckCircle color="green" size={20} />
                      ) : (
                        <FaTimesCircle color="red" size={20} />
                      )}
                      <Typography variant="body2" fontWeight="bold">
                        {assignment?.total_submitted_assignment ===
                        assignment?.checked_assignments
                          ? t("Checked")
                          : t("Not Checked")}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: isDarkMode ? "#fff" : "" }} />

                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={3.5}
                      display="flex"
                      alignItems="center"
                    >
                      <MdOutlineCreditScore
                        style={{ marginRight: "8px" }}
                        size={20}
                      />
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={isDarkMode ? primaryColor : "#555"}
                      >
                        {t("Total Assignments")}:{" "}
                        {assignment?.total_submitted_assignment}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={3.5}
                      display="flex"
                      alignItems="center"
                    >
                      <TbSquareRoundedPercentage
                        style={{ marginRight: "8px" }}
                        size={20}
                      />
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={isDarkMode ? primaryColor : "#555"}
                      >
                        {t("Checked Assignments")}: {assignment?.checked_assignments}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={5}
                      display="flex"
                      alignItems="center"
                      justifyContent={"flex-end"}
                    >
                      {/* <VscFeedback style={{ marginRight: "8px" }} size={20} />
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={isDarkMode ? primaryColor : "#555"}
                      >
                        Teacher&apos;s Comment:{" "}
                        {assignment?.comment_by_teacher || "No comment"}
                      </Typography> */}
                      <Button variant="outlined">{t("View Submissions")} <FaArrowRight style={{marginLeft:"2px", opacity:0.7}}/></Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" textAlign="center" mt={4}>
          {t("No assignments available")}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default StudentAssignments;
