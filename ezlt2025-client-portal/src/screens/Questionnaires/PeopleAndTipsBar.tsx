import React, { useImperativeHandle } from "react";
import { Box, Collapse, Fade, Grow, Typography } from "@mui/material";
import Image from "next/image";
import Group from "@/assets/icons/Group.svg";
import Tips from "@/assets/icons/Tips.svg";
import Check from "@/assets/icons/Check.svg";

interface PeaopleAndTipsProps {
  tipsContent?: React.ReactNode | string;
  InterviewValues?: Object;
  innerRef: React.RefObject<unknown> | null;
  drawerContentType?: string | null | undefined;
}

const PeopleAndTipsBar: React.FC<PeaopleAndTipsProps> = ({
  tipsContent,
  innerRef,
  InterviewValues,
  drawerContentType,
}) => {
  let AnimationTime = setTimeout(() => {}, 0);
  const [openPeopleInState, setOpenPeopleInState] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);
  const {
    primary_trustee_first_name,
    primary_trustee_last_name,
    secondary_trustee_first_name,
    secondary_trustee_last_name,
    living_childern,
    living_childern_details,
    deceased_childern,
    deceased_childern_details,
    primary_trustee_childern,
    primary_trustee_childern_details,
    secondary_trustee_childern,
    secondary_trustee_childern_details,
    primary_health_agent_full_name,
    backup_health_agent_full_name,
    primary_successor_full_name,
    backup_successor_full_name,
    primary_financial_agent_full_name,
    backup_financial_agent_full_name,
    primary_health_agent_full_name_secondary_trustee,
    backup_health_agent_full_name_secondary_trustee,
    primary_financial_agent_full_name_secondary_trustee,
    backup_financial_agent_full_name_secondary_trustee,
    primary_guardian_full_name,
    backup_guardian_full_name,
    isChildUnderAge,
  }: any = InterviewValues;
  useImperativeHandle(innerRef, () => ({
    AnimatePeople() {
      setAnimate(false);
      clearTimeout(AnimationTime);
      setAnimate(true);
      AnimationTime = setTimeout(() => {
        setAnimate(false);
      }, 3000);
    },
  }));
  return (
    <Box
      sx={{
        px: 2,
        py: 2.5,
        gap: 1.25,
        height: "Fit-content",
      }}
    >
      {animate ? (
        <Grow in={animate} timeout={1000} unmountOnExit>
          <Box
            sx={{
              px: 2.5,
              py: 1.25,
              background: (theme) => theme.additionalColors?.orange,
              border: "1px solid #D9ECFF",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            onClick={() => setOpenPeopleInState(!openPeopleInState)}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  background: "#04AC51",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "47px",
                  width: "47px",
                }}
              >
                <Image src={Check} alt="" />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: (theme) => theme.palette.text.secondary,
                    fontSize: "18px",
                  }}
                >
                  People Added!
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    color: (theme) => theme.palette.text.secondary,
                    fontSize: "12px",
                  }}
                >
                  Click here to view
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grow>
      ) : (
        (drawerContentType === 'Group' || !drawerContentType) && (  
        <Fade in={!animate} timeout={1000} unmountOnExit>
          <Box
            sx={{
              px: 2.5,
              py: 1.25,
              background: (theme) =>
                theme.additionalColors?.background.secondary,
              border: "1px solid #D9ECFF",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            onClick={() => setOpenPeopleInState(!openPeopleInState)}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: openPeopleInState ? "flex-start" : "center",
                // justifyContent: "center",
                flexDirection: openPeopleInState ? "column" : "row",
                gap: openPeopleInState ? 2 : 3,
              }}
            >
              <Image src={Group} alt="" />
              <Typography
                //   variant="h6"
                sx={{
                  fontWeight: "500",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  color: "#535F6B",
                  fontSize: "18px",
                }}
              >
                People in your Estate
              </Typography>
            </Box>
            <Collapse in={openPeopleInState} timeout="auto" unmountOnExit>
              <Box sx={{ pt: 2 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: (theme) => theme.palette.text.disabled,
                  }}
                >
                  Initial Trustee :
                </Typography>
                <Box
                  sx={{
                    background: "#DCE7FD",
                    // (theme) => theme.palette.primary.main,
                    width: "fit-content",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    component={"li"}
                    sx={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {primary_trustee_first_name} {primary_trustee_last_name}
                  </Typography>
                  {secondary_trustee_first_name && (
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {secondary_trustee_first_name}{" "}
                      {secondary_trustee_last_name}
                    </Typography>
                  )}
                </Box>
              </Box>
              {living_childern_details?.length > 0 && living_childern && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    Living Children :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {living_childern_details?.map(
                      (child: any, index: number) => {
                        return (
                          <Typography
                            key={index}
                            component={"li"}
                            sx={{
                              fontSize: "13px",
                              fontWeight: 400,
                              color: (theme) => theme.palette.text.disabled,
                            }}
                          >
                            {child.full_Name}
                          </Typography>
                        );
                      },
                    )}
                  </Box>
                </Box>
              )}
              {deceased_childern_details?.length > 0 && deceased_childern && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    Deceased Children :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {deceased_childern_details?.map(
                      (child: any, index: number) => {
                        return (
                          <Typography
                            key={index}
                            component={"li"}
                            sx={{
                              fontSize: "13px",
                              fontWeight: 400,
                              color: (theme) => theme.palette.text.disabled,
                            }}
                          >
                            {child.full_Name}
                          </Typography>
                        );
                      },
                    )}
                  </Box>
                </Box>
              )}
              {primary_trustee_childern_details &&
                primary_trustee_childern &&
                primary_trustee_childern_details?.length > 0 && (
                  <Box sx={{ pt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {`${primary_trustee_first_name}'s Other Children`} :
                    </Typography>
                    <Box
                      sx={{
                        background: "#DCE7FD",
                        // (theme) => theme.palette.primary.main,
                        width: "fit-content",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {primary_trustee_childern_details?.map(
                        (child: any, index: number) => {
                          return (
                            <Typography
                              key={index}
                              component={"li"}
                              sx={{
                                fontSize: "13px",
                                fontWeight: 400,
                                color: (theme) => theme.palette.text.disabled,
                              }}
                            >
                              {child.full_Name}
                            </Typography>
                          );
                        },
                      )}
                    </Box>
                  </Box>
                )}
              {secondary_trustee_childern_details &&
                secondary_trustee_childern &&
                secondary_trustee_childern_details?.length > 0 && (
                  <Box sx={{ pt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {`${secondary_trustee_first_name}'s Other Children`} :
                    </Typography>
                    <Box
                      sx={{
                        background: "#DCE7FD",
                        // (theme) => theme.palette.primary.main,
                        width: "fit-content",
                        p: 1,
                        borderRadius: 1,
                      }}
                    >
                      {secondary_trustee_childern_details?.map(
                        (child: any, index: number) => {
                          return (
                            <Typography
                              key={index}
                              component={"li"}
                              sx={{
                                fontSize: "13px",
                                fontWeight: 400,
                                color: (theme) => theme.palette.text.disabled,
                              }}
                            >
                              {child.full_Name}
                            </Typography>
                          );
                        },
                      )}
                    </Box>
                  </Box>
                )}
              {primary_successor_full_name && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`Successor Trustees`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_successor_full_name}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_successor_full_name}
                    </Typography>
                  </Box>
                </Box>
              )}
              {primary_health_agent_full_name && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`${primary_trustee_first_name}'s Heatlh Agents`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_health_agent_full_name}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_health_agent_full_name}
                    </Typography>
                  </Box>
                </Box>
              )}
              {primary_financial_agent_full_name && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`${primary_trustee_first_name}'s Financial Agents`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_financial_agent_full_name}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_financial_agent_full_name}
                    </Typography>
                  </Box>
                </Box>
              )}
              {primary_health_agent_full_name_secondary_trustee && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`${secondary_trustee_first_name}'s Heatlh Agents`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_health_agent_full_name_secondary_trustee}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_health_agent_full_name_secondary_trustee}
                    </Typography>
                  </Box>
                </Box>
              )}
              {primary_financial_agent_full_name_secondary_trustee && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`${secondary_trustee_first_name}'s Financial Agents`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_financial_agent_full_name_secondary_trustee}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_financial_agent_full_name_secondary_trustee}
                    </Typography>
                  </Box>
                </Box>
              )}
              {primary_guardian_full_name && isChildUnderAge && (
                <Box sx={{ pt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: (theme) => theme.palette.text.disabled,
                    }}
                  >
                    {`Guardians`} :
                  </Typography>
                  <Box
                    sx={{
                      background: "#DCE7FD",
                      // (theme) => theme.palette.primary.main,
                      width: "fit-content",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {primary_guardian_full_name}
                    </Typography>
                    <Typography
                      component={"li"}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      {backup_guardian_full_name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Collapse>
          </Box>
        </Fade>
        )
      )}
      {(drawerContentType === 'Tips' || !drawerContentType) && (  
      <Box
        sx={{
          mt: 1.25,
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 1.25,
          px: 2.5,
          py: 1.25,
          background: (theme) => theme.additionalColors?.background.secondary,
          border: "1px solid #D9ECFF",
          borderRadius: "12px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Image src={Tips} alt="" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              fontFamily: "Roboto",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "#535F6B",
              fontSize: "18px",
            }}
          >
            Tips for you
          </Typography>
        </Box>
        <Box sx={{ p: { margin: "0" } }}>{tipsContent}</Box>
      </Box>
      )}
    </Box>
  );
};

export default PeopleAndTipsBar;
// import React, { useImperativeHandle } from "react";
// import { Box, Collapse, Fade, Grow, Typography } from "@mui/material";
// import Image from "next/image";
// import Group from "@/assets/icons/Group.svg";
// import Tips from "@/assets/icons/Tips.svg";
// import Check from "@/assets/icons/Check.svg";

// interface PeaopleAndTipsProps {
//   tipsContent?: React.ReactNode | string;
//   InterviewValues?: Object;
//   innerRef: React.RefObject<unknown> | null;
// }

// const PeopleAndTipsBar: React.FC<PeaopleAndTipsProps> = ({
//   tipsContent,
//   innerRef,
//   InterviewValues,
// }) => {
//   let AnimationTime = setTimeout(() => {}, 0);
//   const [openPeopleInState, setOpenPeopleInState] = React.useState(false);
//   const [animate, setAnimate] = React.useState(false);
//   const {
//     primary_trustee_first_name,
//     primary_trustee_last_name,
//     secondary_trustee_first_name,
//     secondary_trustee_last_name,
//   }: any = InterviewValues;
//   useImperativeHandle(innerRef, () => ({
//     AnimatePeople() {
//       setAnimate(false);
//       clearTimeout(AnimationTime);
//       setAnimate(true);
//       AnimationTime = setTimeout(() => {
//         setAnimate(false);
//       }, 3000);
//     },
//   }));
//   return (
//     <Box
//       sx={{
//         px: 2,
//         py: 2.5,
//         gap: 1.25,
//         // height: "fit-content",
//       }}
//     >
//       {animate ? (
//         <Grow in={animate} timeout={1000} unmountOnExit>
//           <Box
//             sx={{
//               px: 2.5,
//               py: 1.25,
//               background: (theme) => theme.additionalColors?.orange,
//               border: "1px solid #D9ECFF",
//               borderRadius: "12px",
//               cursor: "pointer",
//             }}
//             onClick={() => setOpenPeopleInState(!openPeopleInState)}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 alignItems: "center",
//                 gap: 3,
//               }}
//             >
//               <Box
//                 sx={{
//                   background: "#04AC51",
//                   borderRadius: 100,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: "47px",
//                   width: "47px",
//                 }}
//               >
//                 <Image src={Check} alt="" />
//               </Box>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontWeight: "500",
//                     fontFamily: "Roboto",
//                     fontStyle: "normal",
//                     lineHeight: "normal",
//                     color: (theme) => theme.palette.text.secondary,
//                     fontSize: "18px",
//                   }}
//                 >
//                   People Added!
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontWeight: "500",
//                     fontFamily: "Roboto",
//                     fontStyle: "normal",
//                     lineHeight: "normal",
//                     color: (theme) => theme.palette.text.secondary,
//                     fontSize: "12px",
//                   }}
//                 >
//                   Click here to view
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Grow>
//       ) : (
//         <Fade in={!animate} timeout={1000} unmountOnExit>
//           <Box
//             sx={{
//               px: 2.5,
//               py: 1.25,
//               background: (theme) =>
//                 theme.additionalColors?.background.secondary,
//               border: "1px solid #D9ECFF",
//               borderRadius: "12px",
//               cursor: "pointer",
//             }}
//             onClick={() => setOpenPeopleInState(!openPeopleInState)}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 alignItems: openPeopleInState ? "flex-start" : "center",
//                 // justifyContent: "center",
//                 flexDirection: openPeopleInState ? "column" : "row",
//                 gap: openPeopleInState ? 2 : 3,
//               }}
//             >
//               <Image src={Group} alt="" />
//               <Typography
//                 //   variant="h6"
//                 sx={{
//                   fontWeight: "500",
//                   fontFamily: "Roboto",
//                   fontStyle: "normal",
//                   lineHeight: "normal",
//                   color: "#535F6B",
//                   fontSize: "18px",
//                 }}
//               >
//                 People in your Estate
//               </Typography>
//             </Box>
//             <Collapse in={openPeopleInState} timeout="auto" unmountOnExit>
//               <Box sx={{ pt: 2 }}>
//                 <Typography
//                   sx={{
//                     fontSize: "16px",
//                     fontWeight: 600,
//                     color: (theme) => theme.palette.text.disabled,
//                   }}
//                 >
//                   Initial Trustee :
//                 </Typography>
//                 <Box
//                   sx={{
//                     background: "#DCE7FD",
//                     // (theme) => theme.palette.primary.main,
//                     width: "fit-content",
//                     p: 1,
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Typography
//                     component={"li"}
//                     sx={{
//                       fontSize: "13px",
//                       fontWeight: 400,
//                       color: (theme) => theme.palette.text.disabled,
//                     }}
//                   >
//                     {primary_trustee_first_name} {primary_trustee_last_name}
//                   </Typography>
//                   {secondary_trustee_first_name && (
//                     <Typography
//                       component={"li"}
//                       sx={{
//                         fontSize: "13px",
//                         fontWeight: 400,
//                         color: (theme) => theme.palette.text.disabled,
//                       }}
//                     >
//                       {secondary_trustee_first_name}{" "}
//                       {secondary_trustee_last_name}
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>
//             </Collapse>
//           </Box>
//         </Fade>
//       )}
//       <Box
//         sx={{
//           mt: 1.25,
//           display: "flex",
//           width: "100%",
//           alignItems: "flex-start",
//           justifyContent: "center",
//           gap: 1.25,
//           px: 2.5,
//           py: 1.25,
//           background: (theme) => theme.additionalColors?.background.secondary,
//           border: "1px solid #D9ECFF",
//           borderRadius: "12px",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "20px",
//           }}
//         >
//           <Image src={Tips} alt="" />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "500",
//               fontFamily: "Roboto",
//               fontStyle: "normal",
//               lineHeight: "normal",
//               color: "#535F6B",
//               fontSize: "18px",
//             }}
//           >
//             Tips for you
//           </Typography>
//         </Box>
//         <Box sx={{ p: { margin: "0" } }}>{tipsContent}</Box>
//       </Box>
//     </Box>
//   );
// };

// export default PeopleAndTipsBar;
