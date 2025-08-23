import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { LIST_CARS_URL } from "@/app/_common/constants";

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

const successHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.json(mockCarsData);
});

const errorHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.error();
});

const emptyDataHandler = http.get(LIST_CARS_URL, () => {
  return HttpResponse.json([]);
});

const delayedHandler = http.get(LIST_CARS_URL, async () => {
  // Add a delay to test loading state
  await new Promise((resolve) => setTimeout(resolve, 100));
  return HttpResponse.json(mockCarsData);
});

function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
}

describe("CarTable Integration", () => {
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
});
