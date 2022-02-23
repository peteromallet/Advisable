import React from "react";
import { Link } from "react-router-dom";
import { useFreelancerPaymentRequests } from "./queries";
import currency from "src/utilities/currency";
import { DateTime } from "luxon";
import { PlusSm } from "@styled-icons/heroicons-solid";
import Table from "./Table";
import PaymentRequestStatus from "./PaymentRequestStatus";
import NoPaymentRequests from "./NoPaymentRequests";
import Button from "src/components/Button";
import { Loading } from "src/components";

export default function FreelancerPaymentRequests() {
  const { data, loading, error, fetchMore } = useFreelancerPaymentRequests();

  if (loading) return <Loading />;
  if (error) return <>Something went wrong, please try again.</>;
  const paymentRequests = data.paymentRequests.edges.map((e) => e.node);
  const pageInfo = data.paymentRequests.pageInfo;

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        cursor: pageInfo.endCursor,
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-semibold tracking-tight">Payments</h2>
        <Link to="/payment_requests/new">
          <Button prefix={<PlusSm />}>Request payment</Button>
        </Link>
      </div>
      <Table>
        <Table.Header>
          <Table.HeaderCell className="flex-1">Client</Table.HeaderCell>
          <Table.HeaderCell className="hidden md:block w-[140px]">
            Sent
          </Table.HeaderCell>
          <Table.HeaderCell className="hidden md:block w-[120px]">
            Status
          </Table.HeaderCell>
          <Table.HeaderCell className="w-[120px] text-right">
            Amount
          </Table.HeaderCell>
        </Table.Header>
        {paymentRequests.length === 0 && (
          <NoPaymentRequests>
            You have not requested any payments yet
          </NoPaymentRequests>
        )}
        {paymentRequests.map((pr) => (
          <Table.Row key={pr.id} to={`/payment_requests/${pr.id}`}>
            <Table.Cell className="flex-1">
              <span className="text-lg font-medium text-neutral900 truncate">
                {pr.company.name}
              </span>
            </Table.Cell>
            <Table.Cell className="hidden md:block w-[140px]">
              <span className="w-[140px] text-sm text-neutral600">
                {DateTime.fromISO(pr.createdAt).toFormat("dd LLL yyyy")}
              </span>
            </Table.Cell>
            <Table.Cell className="hidden md:block w-[120px]">
              <PaymentRequestStatus status={pr.status} />
            </Table.Cell>
            <Table.Cell className="w-[120px] text-right">
              <span className="font-semibold text-neutral900">
                {currency(pr.amount, {
                  format: "$0,0.00",
                })}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
      {pageInfo.hasNextPage && (
        <div className="text-center py-8">
          <Button variant="secondary" onClick={handleLoadMore}>
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
