import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import FormDB from "../components/forms/FormDB";
import { CardContainer } from "../components/CardContainer";
import { Button } from "./Button";
import Modal from "./modal";
import Add from "./icons/Add";
import Clock from "./icons/Clock";
import Ruler from "./icons/Ruler";
import Scale from "./icons/Scale";

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
  console.log(addAttribute);
  return (
    <MenuContainer>
      {showAddMenu && (
        <ul>
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
        </ul>
      )}
      {addAttribute && (
        <Modal>
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
  border-color: black;
`;

const MenuButton = styled(Button)``;
