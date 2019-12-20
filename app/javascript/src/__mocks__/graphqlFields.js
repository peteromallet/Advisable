import { merge, uniqueId } from "lodash";

export const user = (fields = {}) => {
  return merge(
    {
      __typename: "User",
      id: uniqueId("user"),
      firstName: "Test",
      lastName: "Account",
      name: "Test Account",
      email: "test@test.com",
      airtableId: "airtableid",
      confirmed: true,
      availability: [],
      companyName: "Test Corp",
      completedTutorials: [],
      talkSignature: "1234",
      timeZone: "Europe/Dublin",
      createdAt: new Date().toISOString(),
      paymentMethod: null,
      paymentsSetup: true,
      bankTransfersEnabled: true,
      projectPaymentMethod: "Bank Transfer",
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
      country: {
        __typename: "Country",
        id: 1,
        name: "Ireland",
      },
    },
    fields
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
    },
    fields
  );
};

export const project = (fields = {}) => {
  return merge(
    {
      __typename: "Project",
      id: uniqueId("project"),
      airtableId: uniqueId("rec"),
      name: "Project",
      currency: "USD",
      questions: ["Question?"],
      applicationsOpen: true,
      primarySkill: "Testing",
      description: "desription",
      applicationCount: 0,
      status: "Brief Confirmed",
      industry: "Testing",
      companyType: "Startup",
      clientReferralUrl: "https://advisable.com",
      companyDescription: "company description",
      specialistDescription: "specialist description",
      goals: ["This is a goal"],
      requiredCharacteristics: ["Required characteristic"],
      optionalCharacteristics: ["Optional characteristic"],
      estimatedBudget: "€10,000",
      remote: true,
      acceptedTerms: true,
      depositOwed: 0,
      applications: [],
      depositPaymentIntent: {
        __typename: "PaymentIntent",
        secret: "secret1234",
      },
    },
    fields
  );
};

export const application = (fields = {}) => {
  return merge(
    {
      __typename: "Application",
      id: uniqueId("application"),
      airtableId: uniqueId("rec"),
      rate: "75",
      currency: "USD",
      status: "Working",
      featured: false,
      comment: "comment",
      hidden: false,
      monthlyLimit: null,
      trialProgram: true,
      trialTask: null,
      referencesRequested: false,
      projectType: "Fixed",
      referralUrl: "https//advisable.com",
      introduction: "Application Introduction",
      availability: "2 - 4 Weeks",
      acceptsFee: true,
      acceptsTerms: true,
      proposal: null,
      hasMoreProjects: false,
      proposalComment: "",
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
    fields
  );
};

export const specialist = (fields = {}) => {
  return merge(
    {
      __typename: "Specialist",
      id: uniqueId("specialist"),
      bio: "Specialist bio",
      airtableId: uniqueId("rec"),
      name: "Test Specialist",
      firstName: "Test",
      lastName: "Specialist",
      confirmed: true,
      location: "Berlin, Germany",
      email: "specialist@test.com",
      completedTutorials: [],
      talkSignature: "1234",
      hourlyRate: 45,
      numberOfProjects: null,
      primarilyFreelance: null,
      phoneNumber: null,
      createdAt: new Date().toISOString(),
      city: "Dublin",
      reviewsCount: 0,
      hasSetupPayments: true,
      ratings: {
        __typename: "Ratings",
        overall: 5.0,
      },
      publicUse: null,
      website: null,
      applicationStage: "Accepted",
      avatar: null,
      image: null,
      country: {
        __typename: "Country",
        id: 1,
        name: "Ireland",
      },
      linkedin: "https://linkedin.com",
      previousProjects: [],
      skills: [],
      previousProjectsCount: 0,
    },
    fields
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
    fields
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
    fields
  );
};

export const skill = (fields = {}) => {
  return merge(
    {
      __typename: "Skill",
      id: uniqueId("skill"),
      name: "Skill",
    },
    fields
  );
};

export const offPlatformProject = (fields = {}) => {
  return merge(
    {
      __typename: "OffPlatformProject",
      uid: uniqueId("opp_"),
      id: uniqueId("opp_"),
      airtableId: "rec123",
      clientName: "Test Inc",
      primarySkill: "Testing",
      contactEmail: null,
      description: "testing",
      confidential: false,
      skills: ["Testing"],
      industry: "Testing",
      validationStatus: "Pending",
      contactFirstName: "Thomas",
      contactLastName: "Cullen",
      specialist: null,
    },
    fields
  );
};

export const industry = (fields = {}) => {
  return merge(
    {
      __typename: "Industry",
      id: uniqueId("industry"),
      name: "Industry",
    },
    fields
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
    },
    fields
  );
};

export const interview = (fields = {}) => {
  return merge(
    {
      __typename: "Inerview",
      id: uniqueId("int"),
      airtableId: uniqueId("rec"),
      availability: [],
      timeZone: "Dublin/Ireland",
      status: "Call Requested",
      startsAt: null,
      application: null,
      user: null,
    },
    fields
  );
};

export default {
  user,
  task,
  skill,
  country,
  project,
  industry,
  interview,
  application,
  specialist,
  consultation,
  specialistSkill,
  offPlatformProject,
};
