# frozen_string_literal: true

require "rails_helper"

RSpec.describe SkillSimilarity, type: :model do
  it "has a valid factory" do
    expect(build(:skill_similarity)).to be_valid
  end

  describe "#similar_to" do
    let(:instagram_ads) { create(:skill, name: "Instagram Ads") }
    let(:facebook_ads) { create(:skill, name: "Facebook Ads") }
    let(:social_ads) { create(:skill, name: "Social Ads") }
    let(:instagram_optimization) { create(:skill, name: "Instagram Optimization") }

    before do
      described_class.create(skill1: instagram_ads, skill2: facebook_ads, similarity: 75)
      described_class.create(skill1: social_ads, skill2: instagram_ads, similarity: 100)
      described_class.create(skill1: instagram_ads, skill2: instagram_optimization, similarity: 25)
      described_class.create(skill1: facebook_ads, skill2: instagram_optimization, similarity: 0)
    end

    it "returns skills that are similar to the given skill including itself" do
      expect(described_class.similar_to(instagram_ads)).to match_array([instagram_ads, facebook_ads, social_ads])
    end

    it "takes similarity as an optional param" do
      expect(described_class.similar_to(instagram_ads, 25)).to match_array([instagram_ads, facebook_ads, social_ads, instagram_optimization])
    end

    it "takes multiple" do
      expect(described_class.similar_to([instagram_optimization, facebook_ads])).to match_array([instagram_ads, facebook_ads, instagram_optimization])
    end
  end
end
