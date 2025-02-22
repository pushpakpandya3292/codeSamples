import ClientDetails from "@/screens/Clients/ClientDetails";

export default function ListingDetails({ params }: any) {
  return <ClientDetails clientId={params.clientId}/>;
}
