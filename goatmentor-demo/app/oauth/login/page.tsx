import OauthLoginForm from "@/components/Oauth/LoginForm";
import { oauthVerification } from "@/utils/oauthVerification";
import { Stack, Typography } from "@mui/material";

const OauthLoginPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const redirectUri = searchParams.redirect_uri;
  const response = await oauthVerification(searchParams);

  if (typeof response === "string") {
    return (
      <Stack gap={2}>
        <Typography variant="titlelg" color="var(--error)">
          Invalid Request
        </Typography>
        <Typography variant="bodylg">{response}</Typography>
      </Stack>
    );
  }

  return (
    <OauthLoginForm
      redirectUri={redirectUri as string}
      client={{ logo: response.logo, name: response.name }}
    />
  );
};

export default OauthLoginPage;
