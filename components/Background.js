import styled from "styled-components";
import Image from "next/image";

export default function Background() {
  return (
    <>
      <StyledBackground>
        <Image
          src="/images/pictures/background-stripes2.jpg"
          alt="background with flower"
          // layout="responsive"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          // width={6000}
          // height={4000}
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
