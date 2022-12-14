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

  const toggleAddMenu = () => {
    setAddMenu(!showAddMenu);
  };
  //legitimate useStates: weight, height, feastTime, ""
  const [shownAttribute, setShownAttribute] = useState("");

  return (
    <MenuContainer>
      {showAddMenu && (
        <StyledList>
          <li>
            <Button
              aria-label="open timer"
              onClick={() => {
                setShownAttribute("feastTime");
                toggleAddMenu();
              }}
            >
              <Clock fontSize="3rem" alt="clock" />
            </Button>
          </li>
          <li>
            <Button
              aria-label="open height input"
              onClick={() => {
                setShownAttribute("height");
                toggleAddMenu();
              }}
            >
              <Ruler fontSize="3rem" alt="ruler" />
            </Button>
          </li>
          <li>
            <Button
              aria-label="open weight input"
              onClick={() => {
                setShownAttribute("weight");
                toggleAddMenu();
              }}
            >
              <Scale fontSize="3rem" alt="scale" />
            </Button>
          </li>
        </StyledList>
      )}
      {shownAttribute && (
        <Modal setShownAttribute={setShownAttribute}>
          <CardContainer>
            <FormDB
              onSubmit={handleSubmit}
              setShownAttribute={setShownAttribute}
              shownAttribute={shownAttribute}
            />
          </CardContainer>
          <Button onClick={() => setShownAttribute("")}>Cancel</Button>
        </Modal>
      )}
      <MenuButton onClick={toggleAddMenu} aria-label="open attribute menu">
        <Add fontSize="4rem" alt="+" />
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
  gap: 3em;
`;

const MenuButton = styled(Button)`
  max-width: 4em;
  width: 100%;
  margin: 0.8em;
`;
