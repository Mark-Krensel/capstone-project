import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event/";
import { toHaveTextContent } from "@testing-library/jest-dom";
import Card from "./Card";

import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("display card", () => {
  useRouter.mockReturnValue({ query: {} });
  it("renders a card component", () => {
    render(
      <Card
        date="2022-11-13"
        id="1234"
        weights={[{ value: "23", _id: "7229" }]}
        heights={[{ value: "29", _id: "7239" }]}
        feastTimes={[
          { value: "000259", timeStamp: "1668367965283", _id: "23229" },
        ]}
      />
    );
    expect(screen.getByText("2022-11-13")).toBeVisible();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("23");
    expect(listItems[1]).toHaveTextContent("29");
    expect(listItems[2]).toHaveTextContent("02:59");
  });
});
