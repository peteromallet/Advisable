# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Topic, type: :model do
  let(:topic) { create(:case_study_topic) }

  it "has a valid factory" do
    expect(topic).to be_valid
  end

  describe "#move_to!" do
    context "when the positions are null" do
      let!(:topic1) { create(:case_study_topic, position: nil) }
      let!(:topic2) { create(:case_study_topic, position: nil) }
      let!(:topic3) { create(:case_study_topic, position: nil) }

      it "sets the positions" do
        expect(topic1.position).to be_nil
        expect(topic2.position).to be_nil
        expect(topic3.position).to be_nil
        topic1.move_to!(2)
        expect(topic1.reload.position).to eq(2)
        expect(topic2.reload.position).not_to be_nil
        expect(topic3.reload.position).not_to be_nil
      end
    end

    context "when the positions are set" do
      let!(:topic1) { create(:case_study_topic, position: 1) }
      let!(:topic2) { create(:case_study_topic, position: 2) }
      let!(:topic3) { create(:case_study_topic, position: 3) }

      it "moves the topic to the given position" do
        topic1.move_to!(3)
        expect(topic1.reload.position).to eq(3)
        expect(topic2.reload.position).to eq(1)
        expect(topic3.reload.position).to eq(2)
      end
    end

    context "when the positions are out of whack" do
      let!(:topic1) { create(:case_study_topic, position: 5) }
      let!(:topic2) { create(:case_study_topic, position: 50) }
      let!(:topic3) { create(:case_study_topic, position: 100) }

      it "normalizes the positions" do
        topic1.move_to!(2)
        expect(topic1.reload.position).to eq(2)
        expect(topic2.reload.position).to eq(1)
        expect(topic3.reload.position).to eq(3)
      end
    end
  end
end
