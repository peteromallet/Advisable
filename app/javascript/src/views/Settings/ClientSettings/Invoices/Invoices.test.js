import {
  fireEvent,
  renderRoute,
  screen,
  mockViewer,
  mockData,
  mockQuery,
} from "../../../../testHelpers/test-utils";
import { Settings } from "luxon";
import { QUERY_INVOICES, GET_INVOICE } from "./queries";

// Its always 27th may 2020 at midday
Settings.now = () => new Date(2020, 4, 27, 12, 0, 0, 0).valueOf();
const user = mockData.user();
const invoices = mockData.invoices();
const queryInvoices = mockQuery(
  QUERY_INVOICES,
  {},
  {
    viewer: {
      __typename: "User",
      id: user.id,
      invoices,
    },
  },
);

const paidInvoice = mockQuery(
  GET_INVOICE,
  {
    id: "in_1HCXkiAs6WKG5Dhf097gXx7b",
  },
  {
    invoice: {
      amount: 250000,
      createdAt: "2020-08-04T21:32:56Z",
      customerAddress: null,
      customerName: "Dunder Mifflin",
      description: "This is an invoice memo.",
      downloadUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5wklCtmO64GQMgnnjDmuVxtatLyXa/pdf",
      lineItems: [
        {
          id: "il_1HCXkiAs6WKG5DhfibQjn8UU",
          quantity: 1,
          title: "Work with Jane Doe",
          unitPrice: 250000,
          __typename: "InvoiceLineItem",
        },
      ],
      number: "5F6791B5-0001",
      paymentUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5wklCtmO64GQMgnnjDmuVxtatLyXa",
      status: "paid",
      __typename: "Invoice",
    },
  },
);

const openInvoice = mockQuery(
  GET_INVOICE,
  {
    id: "in_1HCXm9As6WKG5DhfEDigWAeg",
  },
  {
    invoice: {
      amount: 400000,
      createdAt: "2020-08-04T21:34:25Z",
      customerAddress: null,
      customerName: "Dunder Mifflin",
      description: "This is the invoice description",
      downloadUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5yPd2j8aNgXpTbWDQuIFOtr5kbiyN/pdf",
      lineItems: [
        {
          id: "in_1HCXm9As6WKG5DhfEDigWAeg",
          quantity: 1,
          title: "Monthly Limit with John Doe",
          unitPrice: 400000,
          __typename: "InvoiceLineItem",
        },
      ],
      number: "5F6791B5-0002",
      paymentUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5yPd2j8aNgXpTbWDQuIFOtr5kbiyN",
      status: "open",
      __typename: "Invoice",
    },
  },
);

const dueInvoice = mockQuery(
  GET_INVOICE,
  {
    id: "someid_123",
  },
  {
    invoice: {
      amount: 400000,
      createdAt: "2020-08-04T21:34:25Z",
      customerAddress: null,
      customerName: "Dunder Mifflin",
      description: "This is the invoice description",
      downloadUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5yPd2j8aNgXpTbWDQuIFOtr5kbiyN/pdf",
      lineItems: [
        {
          id: "someid_123",
          quantity: 1,
          title: "Monthly Limit with John Doe",
          unitPrice: 400000,
          __typename: "InvoiceLineItem",
        },
      ],
      number: "5F6791B5-0004",
      paymentUrl:
        "https://pay.stripe.com/invoice/acct_1DWPxsAs6WKG5Dhf/invst_Hm5yPd2j8aNgXpTbWDQuIFOtr5kbiyN",
      status: "open",
      __typename: "Invoice",
    },
  },
);

test("Render invoices list", async () => {
  renderRoute({
    route: "/settings/invoices",
    graphQLMocks: [mockViewer(user), queryInvoices],
  });

  await screen.findByText("Invoices");
  await screen.findByText("#5F6791B5-0001");
  await screen.findAllByText(/paid/);
  await screen.findAllByText(/2500/);
});

test("Navigate to paid invoice", async () => {
  renderRoute({
    route: "/settings/invoices",
    graphQLMocks: [mockViewer(user), queryInvoices, paidInvoice],
  });
  await screen.findByText("Invoices");
  const paidInvoiceCard = await screen.findByText("#5F6791B5-0001");
  fireEvent.click(paidInvoiceCard);
  await screen.findByLabelText("Download PDF");
  await screen.findAllByText("$2500");
});

test("Navigate to open invoice", async () => {
  renderRoute({
    route: "/settings/invoices",
    graphQLMocks: [mockViewer(user), queryInvoices, openInvoice],
  });
  await screen.findByText("Invoices");
  const openInvoiceCard = await screen.findByText("#5F6791B5-0002");
  fireEvent.click(openInvoiceCard);
  await screen.findByLabelText("Download PDF");
  await screen.findByLabelText("Pay Invoice");
});

test("Navigate to due invoice", async () => {
  renderRoute({
    route: "/settings/invoices",
    graphQLMocks: [mockViewer(user), queryInvoices, dueInvoice],
  });
  await screen.findByText("Invoices");
  const openInvoiceCard = await screen.findByText("#5F6791B5-0004");
  fireEvent.click(openInvoiceCard);
  await screen.findByLabelText("Download PDF");
  await screen.findByLabelText("Pay Invoice");
});
