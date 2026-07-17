import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./Components/App";

// Mock Fetch Global function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          products: [
            { name: "Laptop", unitPrice: 1000, sold: 1 }, // 1000
            { name: "Mouse", unitPrice: 50, sold: 2 }, // 100
          ],
        }),
    }),
  );
});

describe("Revenue Aggregator Tests", () => {
  // # Test 1
  test("renders products correctly after loading", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Laptop")).toBeInTheDocument();
      expect(screen.getByText("Mouse")).toBeInTheDocument();
    });
  });

  //   # Test 2
  test("filters products when user types in search bar", async () => {
    render(<App />);
    const input = await screen.findByPlaceholderText(/Type to Filter.../i);
    fireEvent.change(input, { target: { value: "Mouse" } });
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.queryByText("Laptop")).not.toBeInTheDocument();
  });

  //   # Test 3
  test("calculates correct total revenue", async () => {
    render(<App />);
    // Total revenue = 1000 + 100 = 1100
    await waitFor(() => {
      expect(screen.getByText(/Total Revenue :/i)).toBeInTheDocument();
    });
  });
});
