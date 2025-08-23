import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { LIST_BRANDS_URL } from "@/app/_common/constants";
import renderWithClient from "@/app/_common/test-utils/renderWithClient";

import { server } from "../../../../../jest.setup";
import CreateCarModal from "../../_components/CreateCarModal";

interface Brand {
  id: string;
  name: string;
}

const mockBrandsData: Brand[] = [
  { id: "1", name: "Volkswagen" },
  { id: "2", name: "Audi" },
  { id: "3", name: "Bentley" },
  { id: "4", name: "Porsche" },
];

const successHandler = http.get(LIST_BRANDS_URL, () => {
  return HttpResponse.json(mockBrandsData);
});

describe("CreateCarModal Integration", () => {
  it("should show brand options from the API when the modal loads", async () => {
    server.use(successHandler);

    renderWithClient(<CreateCarModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByLabelText("Brand")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    expect(screen.getByText("Audi")).toBeInTheDocument();
    expect(screen.getByText("Bentley")).toBeInTheDocument();
    expect(screen.getByText("Porsche")).toBeInTheDocument();
  });
});
