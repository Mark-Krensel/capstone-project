import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { CardContainer } from "../components/CardContainer";
import { Button } from "./Button";
import Modal from "./modal";
import Add from "./icons/Add";
import Clock from "./icons/XClock";
import Ruler from "./icons/XRuler";
import Scale from "./icons/XScale";

export default function AddMenu() {
  const router = useRouter();

  async function handleSubmit(data) {
    try {
      const response = await fetch("/api/Days", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  }

  const [showAddMenu, setAddMenu] = useState(false);
  //legitimate useStates: none, buttonActive, weight, height, feastTime
  const toggleAddMenu = () => {
    setAddMenu(!showAddMenu);
  };
  const [addAttribute, setAttribute] = useState("");
  // const toggleAddMenu = (menuState) => {
  //   setAddMenu(menuState);
  // };
  return (
    <MenuContainer>
      {showAddMenu && (
        <StyledList>
          <li>
            <Button
              onClick={() => {
                setAttribute("feastTime");
                toggleAddMenu();
              }}
            >
              <Clock fontSize="3rem" />
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                setAttribute("height");
                toggleAddMenu();
              }}
            >
              <Ruler fontSize="3rem" />
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                setAttribute("weight");
                toggleAddMenu();
              }}
            >
              <Scale fontSize="3rem" />
            </Button>
          </li>
        </StyledList>
      )}
      {addAttribute && (
        <Modal setAttribute={setAttribute}>
          <CardContainer>
            <FormDB
              onSubmit={handleSubmit}
              setAttribute={setAttribute}
              addAttribute={addAttribute}
            />
          </CardContainer>
          <Button onClick={() => setAttribute("")}>Cancel</Button>
        </Modal>
      )}
      <MenuButton onClick={toggleAddMenu}>
        <Add fontSize="4rem" />
      </MenuButton>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 0.8em;
  /* flex-direction: column; */
`;

const MenuButton = styled(Button)`
  max-width: 4em;
  width: 100%;
`;
