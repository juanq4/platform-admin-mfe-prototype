import { LoadingBarContainer, Bar, LoadingContainer, LoadingText } from "./LoadingBar.style";

interface LoadingBarProps {
  message?: string;
  className?: string;
}

// TODO: Replace this with the LoadingBar from new UI libary once ready
export const LoadingBar = (props: LoadingBarProps): JSX.Element => {
  const { message, className } = props;
  return (
    <LoadingContainer className={className}>
      {message && <LoadingText>{message}</LoadingText>}

      <LoadingBarContainer>
        <Bar />
      </LoadingBarContainer>
    </LoadingContainer>
  );
};
