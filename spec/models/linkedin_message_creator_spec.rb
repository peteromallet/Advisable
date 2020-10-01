require "rails_helper"

RSpec.describe LinkedinMessageCreator do
  let(:project) { build_stubbed(:project, primary_skill: skill, user: user) }
  let(:user) { build_stubbed(:user, industry: industry) }
  let(:industry) { build_stubbed(:industry, name: "Rock Music") }
  let(:skill) { build_stubbed(:skill, name: "Ruby Ruby Ruby Ruby") }
  let(:name) { "Mose" }
  subject(:lmc) { described_class.new(project, name) }

  it "includes skill and industry in opening body" do
    expect(lmc.flowchart[:body]).to include("Ruby Ruby Ruby Ruby").
      and include("Rock Music").
      and include("Mose")
  end
end
