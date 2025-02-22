import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { SupportAgent } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
const parentRoute = "/dashboard";
interface ChildMenuItem {
  path: string;
  type: "link";
  active: boolean;
  selected: boolean;
  title: string;
}

interface ParentMenuItem {
  path: string;
  icon: React.ReactNode;
  type: "link" | "sub";
  active: boolean;
  selected: boolean;
  title: string;
  isStatus: boolean;
  StatusKey?: string;
  StatusKey2?: string;
  children?: ChildMenuItem[];
}
export const MENUITEMS: ParentMenuItem[] = [
  {
    path: `${parentRoute}`,
    icon: <DashboardOutlinedIcon />,
    type: "link",
    active: true,
    selected: false,
    title: "Dashboard",
    isStatus: false,
  },
  {
    path: `${parentRoute}/orders`,
    icon: <ShoppingCartOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Orders",
    isStatus: true,
    StatusKey: "count_order_stasuses",
    StatusKey2: "PENDING",
  },
  {
    path: `${parentRoute}/questionare`,
    icon: <QuestionAnswerOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Questionnaires",
    isStatus: false,
  },
  {
    path: `${parentRoute}/user-account`,
    icon: <PeopleAltOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Users",
    isStatus: false,
  },
  {
    path: `${parentRoute}/emails`,
    icon: <MailOutlineIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Emails",
    isStatus: false,
  },
  {
    path: `${parentRoute}/support`,
    icon: <SupportAgent />,
    type: "link",
    active: false,
    selected: false,
    title: "Support",
    isStatus: false,
  },

  {
    path: `${parentRoute}/property`,
    icon: <HomeOutlinedIcon />,
    type: "sub",
    active: false,
    selected: false,
    title: "Property",
    isStatus: false,
    children: [
      {
        path: `${parentRoute}/property`,
        type: "link",
        active: false,
        selected: false,
        title: "Property Listing",
      },
      {
        path: `${parentRoute}/property-search`,
        type: "link",
        active: false,
        selected: false,
        title: "Property Search",
      },
    ],
  },
  {
    path: `${parentRoute}/partners`,
    icon: <HandshakeOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Partners",
    isStatus: true,
    StatusKey: "count_partner_statuses",
    StatusKey2: "Waiting Approval",
  },

  {
    path: `${parentRoute}/promo-code`,
    icon: <DiscountOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Promo Codes",
    isStatus: false,
  },
  {
    path: `${parentRoute}/commissions`,
    icon: <RequestQuoteOutlinedIcon />,
    type: "link",
    active: false,
    selected: false,
    title: "Commissions",
    isStatus: false,
  },
  {
    path: `${parentRoute}`,
    icon: <SettingsIcon />,
    type: "sub",
    active: false,
    selected: false,
    title: "Settings",
    isStatus: false,
    children: [
      {
        path: `${parentRoute}/plans`,
        type: "link",
        active: false,
        selected: false,
        title: "Plans",
      },
      {
        path: `${parentRoute}/account-manager`,
        type: "link",
        active: false,
        selected: false,
        title: "Account Administrator",
      },
      {
        path: `${parentRoute}/emails/custom-templates`,
        type: "link",
        active: false,
        selected: false,
        title: "Email Templates",
      },
      {
        path: `${parentRoute}/sample-answers`,
        type: "link",
        active: false,
        selected: false,
        title: "Sample Answers Editor",
      },
      {
        path: `${parentRoute}/payments`,
        type: "link",
        active: false,
        selected: false,
        title: "Payments",
      },
    ],
  },
];
