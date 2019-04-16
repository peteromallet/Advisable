import styled from "styled-components";
import { Icon } from "../Icon/styles";
import { Status } from "../Status/styles";
import colors from "../../colors";

export const Title = styled.h5`
  color: #0a153d;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 2px;
`;

export const Description = styled.p`
  color: #565e7d;
  font-size: 13px;
  line-height: 17px;
`;

export const Detail = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-right: 20px;
  align-items: center;
  display: inline-flex;
  margin-left: -5px;
  color: #747a93;

  strong {
    color: #363a4c;
  }

  ${Icon} {
    color: #747a93;
  }
`;

export const Row = styled.div`
  margin-top: -1px;
  user-select: none;
  padding: 15px 20px;
  position: relative;
  border-top: 1px solid #eceff8;
  border-bottom: 1px solid #eceff8;
`;

export const Task = styled(Row)`
  &:hover {
    cursor: pointer;
    background: #fafbfe;

    ${Title} {
      color: ${colors.blue.base};
    }
  }

  ${Status} {
    top: 50%;
    right: 20px;
    position: absolute;
    transform: translateY(-50%);
  }
`;

export const TaskList = styled.div``;
