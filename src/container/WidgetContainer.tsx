import styled from "styled-components";
import { Search } from "../lib/twitter/Search";

type Props = {};

const WidgetContainer = (props: Props) => (
  <Container>
    <button
      onClick={async () => {
        const r = await Search("#PUIPUIモルカー");
        console.log(r);
      }}
    >
      オォンｗ
    </button>
  </Container>
);

const Container = styled.main``;

const HashTagArea = styled.div``;

export default WidgetContainer;
