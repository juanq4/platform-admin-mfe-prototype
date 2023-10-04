import { Anchor, AnchorTheme, Fallback, Text } from "@q4/nimbus-ui";
import { Email } from "../../../configurations";

export const AppError = (): JSX.Element => {
  return (
    <Fallback
      email={Email.Support}
      placeholderContentProps={{
        subtitle: (
          <div>
            <div>
              <Text>There was a problem loading Q4 Platform.</Text>
            </div>
            <div>
              <Text>
                Please refresh the page or contact{" "}
                <Anchor theme={AnchorTheme.Primary} url={`mailto:${Email.Support}`}>
                  {Email.Support}
                </Anchor>
                .
              </Text>
            </div>
          </div>
        ),
      }}
    />
  );
};
