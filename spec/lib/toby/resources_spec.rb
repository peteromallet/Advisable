# frozen_string_literal: true

require "rails_helper"

RSpec.describe Toby::Resources do
  describe ".resource_classes" do
    it "gets all the resources" do
      expect(described_class.resource_classes).to match_array(
        [
          Toby::Resources::Application,
          Toby::Resources::Project,
          Toby::Resources::SalesPerson,
          Toby::Resources::Specialist,
          Toby::Resources::Task,
          Toby::Resources::CaseStudy::Article,
          Toby::Resources::CaseStudy::Search,
          Toby::Resources::CaseStudy::SearchFeedback,
          Toby::Resources::SkillSimilarity,
          Toby::Resources::Industry,
          Toby::Resources::SkillCategory,
          Toby::Resources::Conversation,
          Toby::Resources::Consultation,
          Toby::Resources::Payout,
          Toby::Resources::Interview,
          Toby::Resources::Skill,
          Toby::Resources::ConversationParticipant,
          Toby::Resources::User,
          Toby::Resources::Country,
          Toby::Resources::Company,
          Toby::Resources::Review,
          Toby::Resources::Message,
          Toby::Resources::Account,
          Toby::Resources::Payment,
          Toby::Resources::BlacklistedDomain,
          Toby::Resources::Guild::Post,
          Toby::Resources::Label
        ]
      )
    end
  end

  describe ".get_descendants_of" do
    it "gets all the descendants of a resource" do
      expect(described_class.get_descendants_of(Toby::Resources::CaseStudy)).to match_array(
        [
          Toby::Resources::CaseStudy::SearchFeedback,
          Toby::Resources::CaseStudy::Article,
          Toby::Resources::CaseStudy::Search
        ]
      )
    end
  end
end
