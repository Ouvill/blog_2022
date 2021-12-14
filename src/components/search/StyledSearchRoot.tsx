import React from "react";
import styled from "@emotion/styled";

type Props = {
  ref: React.Ref<unknown> | null;
};

export default styled.div<Props>`
  position: relative;
  margin: 0.6em 0;
`;
