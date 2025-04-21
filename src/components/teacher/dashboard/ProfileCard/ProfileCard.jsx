import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { capitalizeWords } from "@/helper/Helper";
import { BASE_URL_MEET } from "@/constants/apiconfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserImage from "@/commonComponents/UserImage/UserImage";
import { useTranslations } from "next-intl";

function ProfileCard() {
  const router = useRouter();
  const userDetails = decodeToken(Cookies.get("ACCESS_TOKEN"));
  const t = useTranslations();
  return (
    <Card
      sx={{
        maxWidth: "full",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        p: 2,
        background: "linear-gradient(to top, #09203f 0%, #537895 100%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
      }}
    >
      {/* Edit Button */}
      {userDetails?.role !== "STUDENT" && (
        <IconButton
          aria-label="edit"
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => router.push("/teacher/myprofile")}
        >
          <FaEdit style={{ color: "white" }} />
        </IconButton>
      )}

      {/* Profile Picture */}
      {userDetails?.profile_pic ? (
        <Image
          src={`${BASE_URL_MEET}${userDetails?.profile_pic}`}
          alt="Profile"
          width={100}
          height={100}
          style={{ borderRadius: "50%", marginRight: 2 }}
        />
      ) : (
        <Box sx={{ mr: 2 }}>
          <UserImage width={100} height={100} name={userDetails?.full_name} />
        </Box>
      )}

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Teacher Name */}

        <Tooltip title={capitalizeWords(userDetails?.full_name)} arrow>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontFamily={"monospace"}
            fontWeight={"bold"}
            color={"white"}
          >
            {capitalizeWords(userDetails?.full_name)?.length > 20
              ? `${capitalizeWords(userDetails?.full_name).slice(0, 20)}...`
              : capitalizeWords(userDetails?.full_name)}
          </Typography>
        </Tooltip>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Class and Department */}
          {/* <Typography variant="body2" color={"white"}>
            Experience: {userDetails?.exp}
          </Typography> */}

          {userDetails?.role === "STUDENT" ? (
            <Typography variant="body2" color={"white"}>
              🔹 {t("Class")}: {userDetails?.class_name}
            </Typography>
          ) : (
            <Typography variant="body2" color={"white"}>
              🔹 {t("Department")}: {userDetails?.department}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
