import {
  screen,
  fireEvent,
  renderRoute,
  mockData,
  mockViewer,
  mockQuery,
} from "src/testHelpers/test-utils";
import QUERIES from "./queries";

const user = mockData.user();
const company = mockData.company();
const invoice = mockData.invoice({
  month: "08",
  year: "2021",
  total: 120000,
  payments: [
    mockData.payment({
      amount: 25000,
      adminFee: 5000,
      task: mockData.task({ name: "A test task" }),
    }),
  ],
});

test("Renders the list of invoice and user can click into them", async () => {
  renderRoute({
    route: "/settings/invoices",
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        QUERIES.INVOICES,
        {},
        {
          currentCompany: {
            ...company,
            invoices: {
              nodes: [invoice],
            },
          },
        },
      ),
      mockQuery(
        QUERIES.INVOICE,
        { id: invoice.id },
        {
          currentCompany: {
            ...company,
            invoice,
          },
        },
      ),
    ],
  });

  await screen.findByText("$1,200");
  fireEvent.click(await screen.findByText(/august 2021/i));
  await screen.findByText(/a test task/i);
  await screen.findByText("$250");
  await screen.findByText("+$50 Fee");
});
