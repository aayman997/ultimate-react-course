import styled, { css } from "styled-components";

interface RowProps {
	type?: "horizontal" | "verticale";
}

const Row = styled.div<RowProps>`
  display: flex;

  ${props => props.type === "horizontal" &&
          css`

            justify-content: space-between;
            align-items: center;

          `}

  ${props => props.type === "verticale" &&
          css`
            flex-direction: column;
            gap: 1.6rem;
          `}
`;

Row.defaultProps = {
	type: "verticale"
};

export default Row;
