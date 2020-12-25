import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";

export const MyFormControl = styled(FormControl)`
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-radius: 50px !important;
  padding: 5px 15px !important;
  width: 70% !important;
  margin: 20px !important;
  & input {
    padding-left: 20px;
  }
`;
