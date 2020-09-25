require "rails_helper"

RSpec.describe Mutations::RequestInterviewReschedule do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:application) { create(:application, specialist: specialist) }
  let(:interview) { create(:interview, application: application, user: user, status: "Call Scheduled") }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestInterviewReschedule(input: {
        interview: "#{interview.uid}",
        note: "This is a note."
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  context "user" do
    let(:context) { {current_user: user} }

    it "updates interview accordingly" do
      expect_any_instance_of(Interview).to receive(:sync_to_airtable)

      response = AdvisableSchema.execute(query, context: context)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_reschedule_request", any_args)

      interview.reload
      expect(interview.availability_note).to eq("This is a note.")
      expect(interview.status).to eq("Client Requested Reschedule")
      expect(response["data"]["requestInterviewReschedule"]["interview"]["id"]).to eq(interview.uid)
      expect(interview.client_requested_reschedule_at).to be_within(1.second).of(Time.zone.now)
    end
  end

  context "specialist" do
    let(:context) { {current_user: specialist} }

    it "updates interview accordingly" do
      expect_any_instance_of(Interview).to receive(:sync_to_airtable)

      response = AdvisableSchema.execute(query, context: context)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_reschedule_request", any_args)

      interview.reload
      expect(interview.availability_note).to eq("This is a note.")
      expect(interview.status).to eq("Specialist Requested Reschedule")
      expect(response["data"]["requestInterviewReschedule"]["interview"]["id"]).to eq(interview.uid)
      expect(interview.specialist_requested_reschedule_at).to be_within(1.second).of(Time.zone.now)
    end

    context "interview not scheduled" do
      let(:interview) { create(:interview, application: application, user: user, status: "Call Requested") }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["code"]
        expect(error).to eq("INTERVIEW_NOT_SCHEDULED")
      end
    end
  end

  context "not logged in" do
    let(:context) { {current_user: nil} }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
