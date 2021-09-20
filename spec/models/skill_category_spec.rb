# frozen_string_literal: true

require "rails_helper"

RSpec.describe SkillCategory do
  let(:skill_category) { create(:skill_category) }
  let(:skill1) { create(:skill, name: "Skill 1") }
  let(:skill2) { create(:skill, name: "Skill 2") }
  let(:skill3) { create(:skill, name: "Skill 3") }
  let(:skill4) { create(:skill, name: "Skill 4") }
  let(:skill5) { create(:skill, name: "Skill 5") }

  it { is_expected.to validate_presence_of(:name) }

  describe "#skills_with_similar" do
    it "returns skills with similarity above 50 to existing skills" do
      create(:skill_similarity, skill1: skill1, skill2: skill2, similarity: 1)
      create(:skill_similarity, skill1: skill3, skill2: skill4, similarity: 99)
      skill_category.skills = [skill1, skill4]

      expect(skill_category.skills_with_similar).to match_array([skill1, skill3, skill4])
    end
  end

  describe "#skills_without_aliases" do
    it "excludes aliases" do
      create(:skill_similarity, skill1: skill1, skill2: skill2, similarity: 99)
      create(:skill_similarity, skill1: skill1, skill2: skill3, similarity: 100)
      create(:skill_similarity, skill1: skill4, skill2: skill5, similarity: 100)
      skill_category.skills = [skill1, skill2, skill3, skill4, skill5]

      expect(skill_category.skills_without_aliases).to match_array([skill1, skill2, skill4])
    end
  end
end
