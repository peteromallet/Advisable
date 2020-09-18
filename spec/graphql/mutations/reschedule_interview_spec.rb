require "rails_helper"

RSpec.describe Mutations::RescheduleInterview do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }
  let(:status) { "Call Requested" }
  let(:starts_at) { 2.days.from_now.utc.iso8601 }
  let(:application) { create(:application, specialist: specialist) }
  let(:interview) { create(:interview, application: application, user: user, status: status) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      rescheduleInterview(input: {
        interview: "#{interview.uid}",
        startsAt: "#{starts_at}"
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  context "not reschedulable" do
    it "prevents rescheduling interview accordingly" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first
      expect(error["extensions"]["type"]).to eq("INVALID_REQUEST")
      expect(error["extensions"]["code"]).to eq("INTERVIEW_IS_NOT_RESCHEDULABLE")
    end
  end

  context "user is not available" do
    let(:status) { "Specialist Requested Reschedule" }

    it "prevents rescheduling interview accordingly" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first
      expect(error["extensions"]["type"]).to eq("INVALID_REQUEST")
      expect(error["extensions"]["code"]).to eq("STARTS_AT_NOT_AVAILABLE_ON_CLIENT")
    end
  end

  context "all criteria satisfied" do
    let(:status) { "Specialist Requested Reschedule" }
    let(:starts_at) { user.availability.last.iso8601 }

    it "sets starts_at on interview and sends emails" do
      expect_any_instance_of(Interview).to receive(:sync_to_airtable)

      response = AdvisableSchema.execute(query, context: context)
      interview.reload
      expect(interview.starts_at).to eq(starts_at)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_rescheduled", any_args)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_rescheduled", any_args)
      expect(response["data"]["rescheduleInterview"]["interview"]["id"]).to eq(interview.uid)
    end
  end

  describe "has to be a specialist" do
    context "specialist not logged in" do
      let(:context) { {current_user: nil} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end

    context "logged in user not specialist" do
      let(:context) { {current_user: create(:user)} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("INVALID_REQUEST")
      end
    end
  end
end
