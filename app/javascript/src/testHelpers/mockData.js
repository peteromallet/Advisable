import { merge, uniqueId } from "lodash-es";

export const company = (fields = {}) => {
  return merge(
    {
      __typename: "Company",
      id: uniqueId("company"),
      name: "Test",
      users: [],
      bankTransfersEnabled: false,
    },
    fields,
  );
};

export const user = (fields = {}) => {
  return merge(
    {
      __typename: "User",
      id: uniqueId("user"),
      firstName: "Test",
      lastName: "Account",
      isAdmin: false,
      isTeamManager: true,
      needsToSetAPassword: false,
      name: "Test Account",
      email: "test@test.com",
      confirmed: true,
      availability: [],
      companyName: "Test Corp",
      completedTutorials: [],
      talkSignature: "1234",
      timeZone: "Europe/Dublin",
      features: [],
      createdAt: new Date().toISOString(),
      paymentMethod: null,
      paymentsSetup: true,
      bankTransfersEnabled: true,
      companyType: "Startup",
      projectPaymentMethod: "Bank Transfer",
      location: "Dublin, Ireland",
      city: "Dublin",
      invoiceSettings: {
        __typename: "InvoiceSettings",
        name: "Test Account",
        companyName: "Test Inc",
        billingEmail: "test@test.com",
        vatNumber: "1234",
        address: null,
      },
      customer: {
        __typename: "Customer",
        id: "cus_123",
        name: null,
        email: null,
      },
      country: country(),
    },
    fields,
  );
};

export const country = (fields = {}) => {
  return merge(
    {
      __typename: "Country",
      id: "cou_1234",
      eu: true,
      code: "IE",
      name: "Ireland",
      states: ["Dublin", "Cork", "Galway", "Limerick"],
      currency: currency(),
    },
    fields,
  );
};

export const bankHolderAddress = (fields = {}) => {
  return merge(
    {
      __typename: "Address",
      city: "Dublin",
      country: country().code,
      line1: "ave Some 123",
      line2: "",
      postcode: "02123",
      state: "",
    },
    fields,
  );
};

export const project = (fields = {}) => {
  return {
    __typename: "Project",
    id: uniqueId("project"),
    isOwner: true,
    deposit: null,
    name: "Project",
    currency: "USD",
    viewerCanAccess: true,
    publishedAt: null,
    primarySkill: skill({ name: "Testing" }),
    questions: ["Question?"],
    applicationsOpen: true,
    description: "desription",
    applicationCount: 0,
    candidateCount: 0,
    proposedCount: 0,
    hiredCount: 0,
    status: "Brief Confirmed",
    industry: "Testing",
    companyType: "Startup",
    clientReferralUrl: "https://advisable.com",
    companyDescription: "company description",
    specialistDescription: "specialist description",
    goals: ["This is a goal"],
    characteristics: [],
    likelyToHire: 2,
    locationImportance: 2,
    industryExperienceImportance: 2,
    requiredCharacteristics: ["Required characteristic"],
    optionalCharacteristics: ["Optional characteristic"],
    estimatedBudget: "€10,000",
    remote: true,
    skills: [],
    user: null,
    acceptedTerms: true,
    depositOwed: 0,
    applications: [],
    createdAt: "2020-06-24T12:00:00.000",
    depositPaymentIntent: {
      __typename: "PaymentIntent",
      secret: "secret1234",
    },
    ...fields,
  };
};

export const application = (fields = {}) => {
  return merge(
    {
      __typename: "Application",
      id: uniqueId("application"),
      invoiceRate: 7500,
      score: 90,
      currency: "USD",
      status: "Working",
      featured: false,
      comment: "comment",
      hidden: false,
      monthlyLimit: null,
      trialProgram: true,
      trialTask: null,
      projectType: "Fixed",
      referralUrl: "https//advisable.com",
      introduction: "Application Introduction",
      availability: "2 - 4 Weeks",
      acceptsFee: true,
      acceptsTerms: true,
      proposal: null,
      appliedAt: "2020-05-25T12:00:00",
      proposalComment: "",
      interview: null,
      questions: [
        {
          __typename: "ApplicationQuestion",
          question: "This is a question?",
          answer: "This is the answer",
        },
      ],
      tasks: [],
      previousProjects: [],
    },
    fields,
  );
};

export const applicationQuestion = (fields = {}) =>
  merge(
    {
      __typename: "ApplicationQuestion",
      question: "This is a question",
      answer: null,
    },
    fields,
  );

export const specialist = (fields = {}) => {
  return merge(
    {
      __typename: "Specialist",
      id: uniqueId("specialist"),
      bio: "Specialist bio",
      name: "Test Specialist",
      firstName: "Test",
      lastName: "Specialist",
      confirmed: true,
      features: [],
      location: "Berlin, Germany",
      email: "specialist@test.com",
      completedTutorials: [],
      talkSignature: "1234",
      hourlyRate: 45,
      numberOfProjects: null,
      primarilyFreelance: null,
      previousWorkDescription: null,
      previousWorkResults: null,
      needsToSetAPassword: false,
      resume: null,
      idealProject: null,
      phoneNumber: null,
      createdAt: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      city: "Dublin",
      reviewsCount: 0,
      hasSetupPayments: true,
      ratings: {
        __typename: "Ratings",
        overall: 5.0,
      },
      publicUse: null,
      website: null,
      remote: null,
      applicationStage: "Accepted",
      avatar: null,
      coverPhoto: null,
      image: null,
      country: country(),
      reviews: [],
      linkedin: "https://linkedin.com",
      previousProjects: {
        __typename: "PreviousProjectsConnection",
        nodes: [],
      },
      skills: [],
      industries: [],
      previousProjectsCount: 0,
      guild: false,
      guildCalendlyLink: null,
      bankCurrency: null,
      bankHolderAddress: bankHolderAddress(),
      bankHolderName: null,
      vatNumber: null,
    },
    fields,
  );
};

export const specialistSkill = (fields = {}) => {
  return merge(
    {
      __typename: "SpecialistSkill",
      id: uniqueId("ski_"),
      name: "Testing",
      verified: false,
    },
    fields,
  );
};

export const task = (fields = {}) => {
  return merge(
    {
      __typename: "Task",
      id: uniqueId("task"),
      trial: false,
      name: null,
      stage: "Not Assigned",
      dueDate: null,
      estimate: null,
      description: null,
      repeat: null,
      finalCost: null,
      flexibleEstimate: null,
      estimateType: "Hourly",
      createdAt: new Date().toISOString(),
    },
    fields,
  );
};

export const skill = (fields = {}) => {
  return merge(
    {
      __typename: "Skill",
      id: uniqueId("skill"),
      name: "Skill",
      goalPlaceholder: null,
      characteristicPlaceholder: null,
    },
    fields,
  );
};

export const currency = (fields = {}) => {
  return merge(
    {
      __typename: "Currency",
      isoCode: "USD",
      name: "United States Dollar",
    },
    fields,
  );
};

export const previousProject = (fields = {}) => {
  return merge(
    {
      __typename: "PreviousProject",
      id: uniqueId("pre_"),
      coverPhoto: null,
      title: "Previous project title",
      goal: "This was the project goal",
      excerpt: "This is the excerpt...",
      description: "This is the description",
      clientName: "Test Inc",
      companyType: "Startup",
      specialist: null,
      reviews: [],
      primarySkill: null,
      primaryIndustry: null,
      skills: [],
      industries: [],
      validationStatus: "Pending",
      confidential: false,
      publicUse: true,
      contactName: "John Doe",
      contactFirstName: "John",
      contactLastName: "Doe",
      onPlatform: false,
      contactEmail: null,
      contactJobTitle: "CEO",
      contactRelationship: "Managed the project",
      draft: false,
      images: [],
      industryRelevance: null,
      locationRelevance: null,
      costToHire: null,
      executionCost: null,
      similarSpecialists: [],
    },
    fields,
  );
};

export const industry = (fields = {}) => {
  return merge(
    {
      __typename: "Industry",
      id: uniqueId("industry"),
      name: "Industry",
      color: "blue",
    },
    fields,
  );
};

export const consultation = (fields = {}) => {
  return merge(
    {
      __typename: "Consultation",
      id: uniqueId("con"),
      status: "Request Started",
      topic: "Consultation topic",
      user: null,
      specialist: null,
      interview: null,
      viewerIsSpecialist: false,
    },
    fields,
  );
};

export const interview = (fields = {}) => {
  return merge(
    {
      __typename: "Inerview",
      id: uniqueId("int"),
      availability: [],
      timeZone: "Dublin/Ireland",
      status: "Call Requested",
      startsAt: null,
      application: null,
      user: null,
    },
    fields,
  );
};

export const review = (fields = {}) => {
  return merge(
    {
      __typename: "Review",
      id: uniqueId("rev"),
      comment: "This is a review comment",
      name: "Jane Doe",
      firstName: "Jane",
      role: "CEO",
      avatar: null,
      companyName: "Acme Inc",
      ratings: {
        __typename: "Ratings",
        overall: 5,
        skills: 4,
        availability: 3,
        adherenceToSchedule: 2,
        qualityOfWork: 1,
        communication: 2,
      },
    },
    fields,
  );
};

export const search = (fields = {}) => {
  return merge(
    {
      __typename: "Search",
      id: uniqueId("sea"),
      description: "Description",
    },
    fields,
  );
};

export const salesPerson = (fields = {}) => {
  return merge(
    {
      __typename: "SalesPerson",
      id: uniqueId("sal"),
      firstName: "John",
      name: "John Doe",
      image: null,
    },
    fields,
  );
};

export const clientApplication = (fields = {}) => {
  return merge(
    {
      __typename: "ClientApplication",
      id: uniqueId("client_application"),
      firstName: "Test",
      lastName: "Account",
      isAdmin: false,
      companyName: null,
      industry: null,
      companyType: null,
      skills: [],
      numberOfFreelancers: null,
      budget: null,
      localityImportance: null,
      acceptedGuaranteeTerms: false,
      talentQuality: null,
      status: "Application Started",
      rejectionReason: null,
    },
    fields,
  );
};

export const invoices = (fields = {}) => {
  return merge(
    [
      {
        amount: 60000,
        issuedAt: "2020-08-04T21:36:16Z",
        id: "in_1HCXnwAs6WKG5DhfVqXDRMXM",
        number: "5F6791B5-0003",
        status: "paid",
        __typename: "Invoice",
      },
      {
        amount: 400000,
        issuedAt: "2020-08-04T21:34:25Z",
        id: "in_1HCXm9As6WKG5DhfEDigWAeg",
        number: "5F6791B5-0002",
        status: "open",
        __typename: "Invoice",
      },
      {
        amount: 250000,
        issuedAt: "2020-08-04T21:32:56Z",
        id: "in_1HCXkiAs6WKG5Dhf097gXx7b",
        number: "5F6791B5-0001",
        status: "paid",
        __typename: "Invoice",
      },
      {
        amount: 2890000,
        issuedAt: "2020-08-04T21:32:56Z",
        id: "someid_123",
        number: "5F6791B5-0004",
        status: "due",
        __typename: "Invoice",
      },
    ],
    fields,
  );
};

export default {
  user,
  task,
  skill,
  search,
  review,
  company,
  country,
  project,
  currency,
  industry,
  invoices,
  interview,
  specialist,
  application,
  salesPerson,
  consultation,
  specialistSkill,
  previousProject,
  clientApplication,
  bankHolderAddress,
  applicationQuestion,
};
