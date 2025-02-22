import React, { useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  ListSubheader,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import {
  DeliveryOptionEnum,
  getKeyOfEnum,
  StatusChipEnum,
  StatusEnum,
  StatusEnumColors,
  StatusEnumTimeLine,
} from "@/constant";
import { useClientDetail } from "@/provider/client/clientDetails";
import { useCartUpdate } from "@/provider/Cart";
import CustomModal from "../CustomModal";
import CustomCard from "../Card";
import CustomCheckBox from "../CustomCheckBox";
import moment from "moment";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Edit } from "@mui/icons-material";
interface CartStatusChipProps {
  cartStatus: string | null | undefined;
  orderId?: string;
}
const MessageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(2),
  borderRadius: 10,
  // boxShadow: theme.shadows[1],
  position: "relative",
  marginBottom: theme.spacing(2),
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "20px",
    width: 0,
    height: 0,
    border: "10px solid transparent",
    borderTopColor: theme.palette.grey[200],
    borderBottom: 0,
    borderRight: 0,
    marginLeft: "-5px",
    marginBottom: "-10px",
  },
}));

const CartStatusChip: React.FC<CartStatusChipProps> = ({
  cartStatus,
  orderId,
}) => {
  const [isEditing, setisEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentStatus, setcurrentStatus] = useState("");
  const {
    data: profileDetail,
    isLoading: userLoading,
    isFetching: userFetching,
    refetch: refetchProfile,
  } = useClientDetail({ id: isEditing ? orderId : undefined });
  const updateCart = useCartUpdate({});
  const updateStatus: any = async (key: string) => {
    setcurrentStatus(key);
    const update = await updateCart.mutateAsync({
      id: orderId,
      data: { status: key },
    });
    refetchProfile();
    setisEditing(false);
    // handleCloseModal();
  };
  const DropDown = useMemo(() => {
    setcurrentStatus(
      profileDetail?.statusHistory[profileDetail?.statusHistory?.length - 1]
        ?.status || "",
    );
    const filteredData = (
      Object.keys(StatusEnumTimeLine) as Array<keyof typeof StatusEnumTimeLine>
    ).filter((key) => {
      if (profileDetail?.actions == DeliveryOptionEnum.SHIP) {
        return (
          key != getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.PICKUP) &&
          key !=
            getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.PICKUP_NOTARY)
        );
      } else if (profileDetail?.actions == DeliveryOptionEnum.PICKUP) {
        return (
          key != getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.SHIPPED) &&
          key !=
            getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.PICKUP_NOTARY)
        );
      } else if (profileDetail?.actions == DeliveryOptionEnum.PICKUP_NOTARY) {
        return (
          key != getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.SHIPPED) &&
          key != getKeyOfEnum(StatusEnumTimeLine, StatusEnumTimeLine.PICKUP)
        );
      } else {
        return key;
      }
    });
    const timelineResults = filteredData.map((key: any) => {
      const status = profileDetail?.statusHistory?.find((item: any) => {
        return item.status == StatusEnum[key as keyof typeof StatusEnum];
      });
      return {
        key: StatusEnum[key as keyof typeof StatusEnum],
        title: StatusEnumTimeLine[key as keyof typeof StatusEnumTimeLine],
        date: status ? status?.timestamp : "",
        isDone: status?.status ? true : false,
      };
    });
    return timelineResults;
  }, [profileDetail]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {isEditing ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Select
            sx={{ width: "80%", padding: "0px 0px 0px 5px !important" }}
            value={currentStatus}
            onChange={(e) => {
              updateStatus(e.target.value);
            }}
          >
            {DropDown?.map((item, index) => {
              const headers = [];

              if (index === 0) {
                headers.push(
                  <ListSubheader>
                    <Divider>
                      <Chip label={"In Progress"} size="medium" />
                    </Divider>
                  </ListSubheader>,
                );
              }
              if (item.key === StatusEnum.DELIVERED) {
                headers.push(
                  <ListSubheader key={`shipped-header-${index}`}>
                    <Divider>
                      <Chip label={"Completed"} size="medium" />
                    </Divider>
                  </ListSubheader>,
                );
              }

              if (item.key === StatusEnum.ARCHIVED) {
                headers.push(
                  <ListSubheader key={`archived-header-${index}`}>
                    <Divider>
                      <Chip label={"Closed"} size="medium" />
                    </Divider>
                  </ListSubheader>,
                );
              }

              return [
                ...headers,
                <MenuItem key={`item-${index}`} value={item.key}>
                  {item.title}
                </MenuItem>,
              ];
            })}
          </Select>
          <CloseRoundedIcon
            sx={{ ml: 1, fontSize: "18px", cursor: "pointer" }}
            onClick={() => (orderId ? setisEditing(false) : null)}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              color: cartStatus
                ? StatusEnumColors[
                    getKeyOfEnum(
                      StatusEnum,
                      cartStatus,
                    ) as keyof typeof StatusEnumColors
                  ]
                : "#ccc",
              borderColor: cartStatus
                ? StatusEnumColors[
                    getKeyOfEnum(
                      StatusEnum,
                      cartStatus,
                    ) as keyof typeof StatusEnumColors
                  ]
                : "#ccc", // Border color based on status
              background: cartStatus
                ? `${
                    StatusEnumColors[
                      getKeyOfEnum(
                        StatusEnum,
                        cartStatus,
                      ) as keyof typeof StatusEnumColors
                    ]
                  }15`
                : "#f1c40f12",
              border: "1px solid",
              px: 2,
              borderRadius: "20px",
              width: "fit-content",
              fontSize: "14px",
              cursor: orderId ? "pointer" : "default",
            }}
          >
            {/* {cartStatus ? cartStatus : "-"} */}
            {cartStatus
              ? StatusChipEnum[
                  getKeyOfEnum(
                    StatusEnum,
                    cartStatus,
                  ) as keyof typeof StatusChipEnum
                ]
              : "-"}
          </Typography>
          {orderId && (
            <Edit
              sx={{ ml: 1, fontSize: "18px", cursor: "pointer" }}
              onClick={() => (orderId ? setisEditing(true) : null)}
            />
          )}
        </Box>
      )}

      {/* <CustomModal width={450} open={openModal} handleClose={handleCloseModal}>
        <CustomCard autoHeight>
          <Typography sx={{ fontWeight: "600" }}>Timeline, Status</Typography>
          <Box
            sx={{
              overflow: "hidden",
              overflowY: "auto",
              maxHeight: "75vh",
            }}
          >
            <Box sx={{ mt: 1 }}>
              <Select
                sx={{ height: "40px" }}
                value={currentStatus}
                onChange={(e) => {
                  updateStatus(e.target.value);
                }}
              >
                {DropDown?.map((item, index) => {
                  const headers = [];

                  if (index === 0) {
                    headers.push(
                      <ListSubheader>
                        <Divider>
                          <Chip label={"In Progress"} size="medium" />
                        </Divider>
                      </ListSubheader>,
                    );
                  }
                  if (item.key === StatusEnum.SHIPPED) {
                    headers.push(
                      <ListSubheader key={`shipped-header-${index}`}>
                        <Divider>
                          <Chip label={"Completed"} size="medium" />
                        </Divider>
                      </ListSubheader>,
                    );
                  }

                  if (item.key === StatusEnum.ARCHIVED) {
                    headers.push(
                      <ListSubheader key={`archived-header-${index}`}>
                        <Divider>
                          <Chip label={"Closed Accts"} size="medium" />
                        </Divider>
                      </ListSubheader>,
                    );
                  }

                  return [
                    ...headers,
                    <MenuItem key={`item-${index}`} value={item.key}>
                      {item.title}
                    </MenuItem>,
                  ];
                })}
              </Select>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ my: 1 }} />
              {profileDetail?.statusHistory?.map(
                (status: any, index: number) => (
                  <Box key={index} sx={{ py: 1 }}>
                    <MessageBox>
                      {index === 0 ? (
                        <Typography
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          Order created and status changed to
                          <CartStatusChip cartStatus={status.status} />
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "14px",
                          }}
                        >
                          Order status changed from
                          <Typography
                            sx={{
                              display: "flex",
                              gap: 1,
                              fontSize: "14px",
                              pt: 0.5,
                            }}
                          >
                            <CartStatusChip
                              cartStatus={
                                profileDetail?.statusHistory[index - 1].status
                              }
                            />{" "}
                            to
                            <CartStatusChip cartStatus={status.status} />
                          </Typography>
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: "14px",
                        }}
                      >
                        {moment(status.timestamp).format("lll")} by admin
                      </Typography>
                    </MessageBox>
                    {index !== profileDetail?.statusHistory.length - 1 && (
                      <Divider sx={{ mt: 1 }} />
                    )}
                  </Box>
                ),
              )}
            </Box>
          </Box>
        </CustomCard>
        <CustomCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontWeight: "600" }}>
              Update Order Status
            </Typography>
            <CancelRoundedIcon
              onClick={handleCloseModal}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Typography sx={{ fontWeight: "600" }}>Timeline, Status</Typography> 
         <Box
            sx={{
              mt: 2,
              height: "75vh",
              overflow: "hidden",
              overflowY: "auto",
            }}
          >
            <Divider sx={{ my: 2 }}>
              <Chip label="In Progress" size="medium" />
            </Divider>
            {timeline &&
              timeline?.map((_timeline, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      alignItems: "center",
                      p: 1,
                      mt: -1,
                      mb: -1,
                      // borderBottom: 1,
                      // borderColor: "divider",
                    }}
                  >
                    <CustomCheckBox
                      setChecked={(value: any) => {
                        updateStatus(value, _timeline.key);
                      }}
                      disabled={
                        _timeline.isDone ||
                        index > timeline?.filter((item) => item.isDone).length
                      }
                      checked={_timeline.isDone}
                      type="SQUARE"
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          color:
                            _timeline.isDone ||
                            index ==
                              timeline?.filter((item) => item.isDone).length
                              ? "#000"
                              : "#8f8f8f",
                        }}
                      >
                        {_timeline.title}
                        {updateCart.isLoading &&
                          index ==
                            timeline?.filter((item) => item.isDone).length && (
                            <CircularProgress
                              size={20}
                              color="inherit"
                              sx={{ ml: 2 }}
                            />
                          )}
                      </Typography>
                      {_timeline.isDone && (
                        <Typography>
                          {moment(_timeline?.date).format("lll")}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {timeline.length - 1 !== index && (
                    <>
                      {_timeline.title === StatusEnumTimeLine.SHIPPED ? (
                        <Divider sx={{ my: 2, width: "100%" }}>
                          <Chip label="Completed" size="medium" />
                        </Divider>
                      ) : (
                        <>
                          {_timeline.title === StatusEnumTimeLine.DELIVERED ? (
                            <Divider sx={{ my: 2, width: "100%" }}>
                              <Chip label="Closed Accounts" size="medium" />
                            </Divider>
                          ) : (
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: "20px",
                                ml: 2,
                                backgroundColor: "#000",
                              }}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </Box>
              ))}
          </Box>
        </CustomCard>
      </CustomModal> */}
    </>
  );
};

export default CartStatusChip;
