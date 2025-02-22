import React from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
// import NotificationIcon from './NotificationIcon'; // Make sure to create or import NotificationIcon
import { useRouter } from "next/navigation";
import { SxProps } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { SupervisedUserCircle, SupportAgent } from "@mui/icons-material";
import { PushNotificationType } from "@/constant";

interface NotificationData {
  key: string;
  value?: string;
}
export interface NotificationProps {
  id: string;
  bodyKey: string;
  isRead: boolean;
  type: number;
  entityId: string | null;
  createdAt: string;
  updatedAt: string;
  data: NotificationData[];
  title: string;
  body: string;
  placeHolderData: string;
}
interface NotificationItemProps {
  element: NotificationProps;
}

interface NotificationIconProps {
  type: number;
}
const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  const styles: SxProps = {
    mr: 2,
    fontSize: "28px",
    height: "39px",
    width: "39px",
    borderRadius: "5px",
    padding: "4px",
  };

  switch (type) {
    case PushNotificationType.NewUserRegistered:
      return (
        <HowToRegOutlinedIcon
          sx={{
            ...styles,
            color: "#5470c6",
            background: "#5470c626",
          }}
        />
      );
    case PushNotificationType.NewCheckout:
      return (
        <ShoppingCartCheckoutOutlinedIcon
          sx={{
            ...styles,
            color: "#fac858",
            background: "#fac8583d",
          }}
        />
      );
    case PushNotificationType.NewQuestionnaireCompleted:
      return (
        <AssignmentTurnedInOutlinedIcon
          sx={{
            ...styles,
            color: "#91cc75",
            background: "#91cc7530",
          }}
        />
      );
    case PushNotificationType.NewSupportCreated:
      return (
        <SupportAgent
          sx={{
            ...styles,
            color: "#fba440",
            background: "#fba44038",
          }}
        />
      );
    default:
      return (
        <SupervisedUserCircle
          sx={{
            fontSize: "30px",
            mr: 2,
          }}
        />
      );
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ element }) => {
  const router = useRouter();
  const handleClickNotification = (element: NotificationProps) => {
    switch (element.type) {
      //New User Register
      case PushNotificationType.NewUserRegistered:
        router.push(
          `/dashboard/clients/client-details/${element?.data[1]?.value}`,
        );
        break;
      //User Checkout
      case PushNotificationType.NewCheckout:
        router.push("/dashboard/payments");
        break;
      //Questionnaire Completed
      case PushNotificationType.NewQuestionnaireCompleted:
        router.push(
          `/dashboard/clients/client-details/${element?.data[1]?.value}`,
        );
        break;
      //NewSupportCreated
      case PushNotificationType.NewSupportCreated:
        router.push("/dashboard/support");
        break;
      default:
        router.push("/dashboard/clients");
        break;
    }
  };
  return (
    <Box
      onClick={() => handleClickNotification(element)}
      sx={{
        p: 2,
        pb: 1,
        borderBottom: "1px solid #e5e5e5",
        // background: "#e9eafc",
        cursor: "pointer",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box>
          <NotificationIcon type={element?.type} />
        </Box>
        <Box
          sx={{
            width: "95%",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Box width={"95%"}>
            <Typography sx={{ color: "#373737", fontWeight: "500" }}>
              {element?.body || "-"}
            </Typography>
            <Typography
              sx={{
                mt: "4px",
                fontSize: "14px",
                color: "#7c7c7c",
              }}
            >
              {moment.utc(element.createdAt).fromNow()}
            </Typography>
          </Box>
          <Box width={"5%"}>
            <Box
              sx={{
                width: "8px",
                height: "8px",
                background: "#1929b3",
                borderRadius: "50%",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationItem;
