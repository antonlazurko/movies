import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Loader() {
  return (
    <Container maxWidth="lg">
      <LinearProgress />
    </Container>
  );
}
