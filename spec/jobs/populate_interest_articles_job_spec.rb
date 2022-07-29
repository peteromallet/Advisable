# frozen_string_literal: true

require "rails_helper"

RSpec.describe PopulateInterestArticlesJob do
  let(:interest1) { create(:case_study_interest) }
  let(:interest2) { create(:case_study_interest) }
  let(:embedding1) { create(:case_study_embedding) }
  let(:embedding2) { create(:case_study_embedding) }
  let!(:article1) { embedding1.article }
  let!(:article2) { embedding2.article }

  before { allow_any_instance_of(OpenAiInteractor).to receive(:query_embedding_for).and_return([-0.024432803, 0.02814213, 0.02230821]) }

  it "populates articles and triggers feedUpdated subscription" do
    # rubocop:disable RSpec/MessageChain
    expect(AdvisableSchema).to receive_message_chain(:subscriptions, :trigger).with("feedUpdated", {}, {}, scope: interest1.account.id)
    # rubocop:enable RSpec/MessageChain
    expect(interest1.interest_articles).to be_blank
    expect(interest2.interest_articles).to be_blank
    described_class.perform_now([interest1.id, interest2.id])
    expect(interest1.articles).to match_array([article1, article2])
    expect(interest2.articles).to match_array([article1, article2])
  end
end
