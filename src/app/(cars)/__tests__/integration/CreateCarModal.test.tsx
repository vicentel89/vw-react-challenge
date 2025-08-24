import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { LIST_BRANDS_URL, LIST_MODELS_URL } from "@/app/_common/constants";
import renderWithClient from "@/app/_common/test-utils/renderWithClient";

import { server } from "../../../../../jest.setup";
import CreateCarModal from "../../_components/CreateCarModal";

interface Brand {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
  brandId: string;
}

const mockBrandsData: Brand[] = [
  { id: "1", name: "Volkswagen" },
  { id: "2", name: "Audi" },
  { id: "3", name: "Bentley" },
  { id: "4", name: "Porsche" },
];

const mockVolkswagenModels: Model[] = [
  { id: "1", name: "Golf", brandId: "1" },
  { id: "2", name: "Passat", brandId: "1" },
  { id: "3", name: "Tiguan", brandId: "1" },
];

const mockAudiModels: Model[] = [
  { id: "4", name: "A3", brandId: "2" },
  { id: "5", name: "A4", brandId: "2" },
  { id: "6", name: "Q5", brandId: "2" },
];

const brandsHandler = http.get(LIST_BRANDS_URL, () => {
  return HttpResponse.json(mockBrandsData);
});

const modelsHandler = http.get(LIST_MODELS_URL, ({ request }) => {
  const url = new URL(request.url);
  const brandId = url.searchParams.get("brandId");

  if (brandId === "1") {
    return HttpResponse.json(mockVolkswagenModels);
  }
  if (brandId === "2") {
    return HttpResponse.json(mockAudiModels);
  }

  return HttpResponse.json([]);
});

describe("CreateCarModal Integration", () => {
  it("should show brand options from the API when the modal loads", async () => {
    server.use(brandsHandler);

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

  it("should load models for the selected brand", async () => {
    const user = userEvent.setup();
    server.use(brandsHandler, modelsHandler);

    renderWithClient(<CreateCarModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    const brandSelect = screen.getByLabelText("Brand");
    await user.selectOptions(brandSelect, "Volkswagen");

    await waitFor(() => {
      expect(screen.getByText("Golf")).toBeInTheDocument();
    });

    expect(screen.getByText("Passat")).toBeInTheDocument();
    expect(screen.getByText("Tiguan")).toBeInTheDocument();

    const modelSelect = screen.getByLabelText("Model");
    expect(modelSelect).not.toBeDisabled();
  });

  it("should update models when changing brands", async () => {
    const user = userEvent.setup();
    server.use(brandsHandler, modelsHandler);

    renderWithClient(<CreateCarModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    const brandSelect = screen.getByLabelText("Brand");

    await user.selectOptions(brandSelect, "Volkswagen");
    await waitFor(() => {
      expect(screen.getByText("Golf")).toBeInTheDocument();
    });

    await user.selectOptions(brandSelect, "Audi");
    await waitFor(() => {
      expect(screen.getByText("A3")).toBeInTheDocument();
    });

    expect(screen.getByText("A4")).toBeInTheDocument();
    expect(screen.getByText("Q5")).toBeInTheDocument();

    expect(screen.queryByText("Golf")).not.toBeInTheDocument();
    expect(screen.queryByText("Passat")).not.toBeInTheDocument();
    expect(screen.queryByText("Tiguan")).not.toBeInTheDocument();
  });
});
