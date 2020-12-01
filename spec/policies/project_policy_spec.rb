require "rails_helper"

RSpec.describe ProjectPolicy do
  let(:project) { create(:project) }

  describe "#read?" do
    it "returns true if the user is the client" do
      policy = described_class.new(project.user, project)
      expect(policy).to be_read
    end

    it "returns true if the user is part of the company" do
      user = create(:user, company: project.user.company)
      policy = described_class.new(user, project)
      expect(policy).to be_read
    end

    it "returns false if the user is the not the client" do
      policy = described_class.new(create(:user), project)
      expect(policy).not_to be_read
    end
  end

  describe "#publish?" do
    it "returns true if the user is the client" do
      policy = described_class.new(project.user, project)
      expect(policy).to be_publish
    end

    it "returns false if the user is part of the company" do
      user = create(:user, company: project.user.company)
      policy = described_class.new(user, project)
      expect(policy).not_to be_publish
    end

    it "returns false if the user is the not the client" do
      policy = described_class.new(create(:user), project)
      expect(policy).not_to be_publish
    end
  end
end
