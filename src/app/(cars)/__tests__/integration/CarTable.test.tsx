import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import {
  LIST_CARS_URL,
  LIST_BRANDS_URL,
  LIST_MODELS_URL,
} from "@/app/_common/constants";
import renderWithClient from "@/app/_common/test-utils/renderWithClient";

import { server } from "../../../../../jest.setup";
import CarTable from "../../_components/CarTable";
import type { Car } from "../../types";

const mockCarsData: Car[] = [
  {
    id: "1",
    brand: "Volkswagen",
    model: "Golf",
    year: 2020,
    mileage: 15000,
    color: "Blue",
  },
  {
    id: "2",
    brand: "Audi",
    model: "A3",
    year: 2019,
    mileage: 20000,
    color: "Red",
  },
];

const mockBrandsData = [
  { id: "1", name: "Volkswagen" },
  { id: "2", name: "Audi" },
];

const mockVolkswagenModels = [
  { id: "1", name: "Golf", brandId: "1" },
  { id: "2", name: "Passat", brandId: "1" },
];

let createdCars: Car[] = [];

const successHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.json([...mockCarsData, ...createdCars]);
});

const createCarHandler = http.post(LIST_CARS_URL, async ({ request }) => {
  const newCar = (await request.json()) as Car;
  createdCars.push(newCar);
  return HttpResponse.json(newCar);
});

const brandsHandler = http.get(LIST_BRANDS_URL, () => {
  return HttpResponse.json(mockBrandsData);
});

const modelsHandler = http.get(LIST_MODELS_URL, ({ request }) => {
  const url = new URL(request.url);
  const brandId = url.searchParams.get("brandId");

  if (brandId === "1") {
    return HttpResponse.json(mockVolkswagenModels);
  }

  return HttpResponse.json([]);
});

const errorHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.error();
});

const emptyDataHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.json([]);
});

const delayedHandler = http.get(LIST_CARS_URL, async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return HttpResponse.json(mockCarsData);
});

describe("CarTable Integration", () => {
  beforeEach(() => {
    createdCars = [];
  });
  it("should show a loading indicator when the API is loading", async () => {
    server.use(delayedHandler);

    renderWithClient(<CarTable />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    expect(
      screen.queryByRole("status", { name: "Loading" })
    ).not.toBeInTheDocument();
  });

  it("should display all items in a table format when data is loaded", async () => {
    server.use(successHandler);

    renderWithClient(<CarTable />);

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Mileage")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();

    expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    expect(screen.getByText("Golf")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("15.000 km")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();

    expect(screen.getByText("Audi")).toBeInTheDocument();
    expect(screen.getByText("A3")).toBeInTheDocument();
    expect(screen.getByText("2019")).toBeInTheDocument();
    expect(screen.getByText("20.000 km")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("should show an empty state message when no data exists", async () => {
    server.use(emptyDataHandler);

    renderWithClient(<CarTable />);

    await waitFor(() => {
      expect(screen.getByText("No cars available")).toBeInTheDocument();
    });

    expect(screen.queryByText("Volkswagen")).not.toBeInTheDocument();
    expect(screen.queryByText("Audi")).not.toBeInTheDocument();
  });

  it("should display an error message when the API call fails", async () => {
    server.use(errorHandler);

    renderWithClient(<CarTable />);

    await waitFor(() => {
      expect(
        screen.getByText("Error loading cars. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("should show a new car in the table after creating it with the modal", async () => {
    const user = userEvent.setup();
    server.use(successHandler, createCarHandler, brandsHandler, modelsHandler);

    renderWithClient(<CarTable />);

    await waitFor(() => {
      expect(screen.getByText("Volkswagen")).toBeInTheDocument();
    });

    const addCarButton = screen.getByRole("button", { name: "Add Car" });
    await user.click(addCarButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Brand *")).toBeInTheDocument();
    });

    const brandSelect = screen.getByLabelText("Brand *");
    await waitFor(() => {
      expect(brandSelect).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Volkswagen" })
      ).toBeInTheDocument();
    });

    await user.selectOptions(brandSelect, "Volkswagen");

    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Golf" })).toBeInTheDocument();
    });

    const modelSelect = screen.getByLabelText("Model *");
    await user.selectOptions(modelSelect, "Golf");

    const yearSelect = screen.getByLabelText("Year *");
    await user.selectOptions(yearSelect, "2021");

    const mileageSelect = screen.getByLabelText("Mileage *");
    await user.selectOptions(mileageSelect, "10000");

    const colorSelect = screen.getByLabelText("Color *");
    await user.selectOptions(colorSelect, "green");

    const createButton = screen.getByRole("button", { name: "Create Car" });
    await user.click(createButton);

    await waitFor(() => {
      expect(screen.queryByLabelText("Brand *")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("2021")).toBeInTheDocument();
    });

    expect(screen.getByText("10.000 km")).toBeInTheDocument();
    expect(screen.getByText("green")).toBeInTheDocument();

    expect(screen.getAllByText("Volkswagen")).toHaveLength(2);
    expect(screen.getAllByText("Golf")).toHaveLength(2);
  });
});
