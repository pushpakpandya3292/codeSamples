"use client";
import Questionnaires from "@/screens/Questionnaires";

export default function ListingDetails({ params }: any) {
  return <Questionnaires cartId={params.cartId} />;
}
