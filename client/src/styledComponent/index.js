import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";

export const MyFormControl = styled(FormControl)`
  background-color: rgba(255, 255, 255, 0.3) !important;
  border-radius: 50px !important;
  padding: 5px 15px !important;
  width: 100% !important;
  /* margin: 20px !important; */
  & input {
    padding-left: 20px;
  }
`;

export const MyButton = styled(Button)`
  border-radius: 50px !important;
  width: 100%;
`;

export const MyTab = styled(Tab)`
  background-color: var(--orange-color) !important;
  opacity: 1 !important;
  border-radius: 50px !important;
  margin: 15px !important;
`;
