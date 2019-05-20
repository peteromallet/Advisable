const STATUSES = {
  applied: {
    status: "Applied",
    emptyStateText: "You have no more applications to review",
    emptyStateSubText:
      "We're busy finding applicants for you. We'll be in touch when we've found some great people for you.",
  },
  introduced: {
    status: "Application Accepted",
    countLabel: "Accepted",
    emptyStateText: "You have not requested introductions to any applicants",
  },
  proposed: {
    status: "Proposed",
    countLabel: "Proposed",
    emptyStateText: "No candidates have made a proposal",
  },
  offered: {
    status: "Offered",
    countLabel: "Offered",
    emptyStateText: "You have not sent any offers yet",
  },
  rejected: {
    status: "Application Rejected",
    countLabel: "Rejected",
    emptyStateText: "You have not rejected any applicants",
  },
};

export default STATUSES;
