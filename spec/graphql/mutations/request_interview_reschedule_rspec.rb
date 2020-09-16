require 'rails_helper'

RSpec.describe Mutations::RequestInterviewReschedule do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:availability) { 2.days.from_now.utc.iso8601 }
  let(:application) { create(:application, specialist: specialist) }
  let(:interview) { create(:interview, application: application, user: user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestInterviewReschedule(input: {
        interview: "#{interview.uid}",
        availability: ["#{availability}"],
        note: "This is a note."
      }) {
        interview {
          id
        }
      }
    }
    GRAPHQL
  end

  context 'user' do
    let(:context) { {current_user: user} }

    it "updates interview accordingly" do
      expect_any_instance_of(Interview).to receive(:sync_to_airtable)

      response = AdvisableSchema.execute(query, context: context)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "interview_reschedule_request", any_args)

      interview.reload
      expect(interview.availability_note).to eq("This is a note.")
      expect(interview.status).to eq("Client Requested Reschedule")
      expect(response["data"]["requestInterviewReschedule"]["interview"]["id"]).to eq(interview.uid)
    end
  end

  context 'specialist' do
    let(:context) { {current_user: specialist} }

    it "updates interview accordingly" do
      expect_any_instance_of(Interview).to receive(:sync_to_airtable)

      response = AdvisableSchema.execute(query, context: context)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "interview_reschedule_request", any_args)

      interview.reload
      expect(interview.availability_note).to eq("This is a note.")
      expect(interview.status).to eq("Specialist Requested Reschedule")
      expect(response["data"]["requestInterviewReschedule"]["interview"]["id"]).to eq(interview.uid)
    end
  end

  context 'not logged in' do
    let(:context) { {current_user: nil} }

    it "raises an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
