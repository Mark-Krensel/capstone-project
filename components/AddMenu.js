import styled from "styled-components";
import { useState } from "react";
import { Button } from "./Button";
import Modal from "./modal";
import Add from "./icons/Add";
import Clock from "./icons/Clock";
import Ruler from "./icons/Ruler";
import Scale from "./icons/Scale";

export default function AddMenu() {
  const [showAddMenu, setAddMenu] = useState(false);
  const toggleAddMenu = () => {
    setAddMenu(!showAddMenu);
  };

  return (
    <MenuContainer>
      <ul>
        <li>
          <Button>
            <Clock fontSize="3rem" />
          </Button>
        </li>
        <li>
          <Button>
            <Ruler fontSize="3rem" />
          </Button>
        </li>
        <li>
          <Button>
            <Scale fontSize="3rem" />
          </Button>
        </li>
      </ul>
      {showAddMenu && (
        <Modal>
          <h2>HEELOOOOO!!!!</h2>
        </Modal>
      )}
      <MenuButton onClick={toggleAddMenu}>
        <Add fontSize="4rem" />
      </MenuButton>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  border-color: black;
`;

const MenuButton = styled(Button)``;
