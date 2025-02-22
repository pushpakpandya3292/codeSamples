import React, { useEffect } from "react";
import QuestionnairesCouple from "@/screens/Questionnaires/QuestionnairesCouple";
import QuestionnairesSingle from "@/screens//Questionnaires/QuestionnariesSingle";
import { useUserDetailListing } from "@/provider/profile";
import { useClientDetail } from "@/provider/ClientDetail";
import Loader from "@/components/Loader";
import { MarriageStatusEnum } from "./types";
import { PaymentStatusEnum } from "@/constants/EnumData";
import { useRouter } from "next/navigation";

interface Props {
  cartId?: string;
}

const Questionnaries: React.FC<Props> = ({ cartId }) => {
  const [marriageStatus, setMarriageStatus] = React.useState<string>("");
  const [Loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    isSuccess: profileSuccess,
    isLoading: profileLoading,
    data: profileData,
  } = useUserDetailListing({});
  const {
    data: clientDetailData,
    isSuccess: clientDetailApiSuccess,
    refetch: clientDetailApiRefetch,
    isLoading: clientDetailApiLoading,
  } = useClientDetail({
    id: profileData?.carts?.find((cart: any) => {
      return cart.id === cartId;
    })?.clientDetail?.id,
  });

  useEffect(() => {
    if (profileSuccess && !profileLoading) {
      setLoading(true);
      let currentCart = profileData?.carts.find((data) => {
        return data.id === cartId;
      });

      if (
        currentCart?.payment_status !== PaymentStatusEnum.UNPAID &&
        currentCart
      ) {
        router.push("/dashboards");
        setLoading(false);
      } else {
        clientDetailApiRefetch();
      }
    }
  }, [profileSuccess, profileLoading]);

  useEffect(() => {
    if (clientDetailApiSuccess && clientDetailData) {
      setMarriageStatus(MarriageStatusEnum[clientDetailData?.marriage_status]);
      setLoading(false);
    }
  }, [clientDetailData]);

  return (
    <>
      {Loading || clientDetailApiLoading || profileLoading ? (
        <Loader height="92vh" width="100%" />
      ) : marriageStatus === MarriageStatusEnum[1] ? (
        <QuestionnairesSingle cartId={cartId} />
      ) : (
        marriageStatus === MarriageStatusEnum[2] && (
          <QuestionnairesCouple cartId={cartId} />
        )
      )}
    </>
  );
};

export default Questionnaries;
