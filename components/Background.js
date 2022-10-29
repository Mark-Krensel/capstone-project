import styled from "styled-components";
import Image from "next/image";

export default function Background() {
  return (
    <>
      <StyledBackground>
        <Image
          src="/../public/images/pictures/background-flower.jpg"
          alt="background with flower"
          // layout="responsive"
          layout="fill"
          objectFit="cover"
          width={3664}
          height={5496}
        />
      </StyledBackground>
    </>
  );
}

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  top: 0;
  left: 0;
  z-index: -10;
`;
