require "rails_helper"

RSpec.describe LinkedinMessageCreator do
  let(:project) { build_stubbed(:project, primary_skill: skill, user: user, goals: goals, characteristics: characteristics, required_characteristics: required_characteristics) }
  let(:user) { build_stubbed(:user, industry: industry) }
  let(:industry) { build_stubbed(:industry, name: "Rock Music") }
  let(:skill) { build_stubbed(:skill, name: "Ruby Ruby Ruby Ruby") }
  let(:name) { "Mose" }
  let(:goals) { [] }
  let(:characteristics) { [] }
  let(:required_characteristics) { [] }
  let(:flowchart) { lmc.flowchart }
  let(:first) { dig_to_action(flowchart[:actions], "Yes") }
  let(:second) { dig_to_action(first[:actions], "Yes") }
  let(:third) { dig_to_action(second[:actions], "Yes") }
  let(:fourth) { dig_to_action(third[:actions], "Yes") }
  let(:fifth) { dig_to_action(fourth[:actions], "Yes") }

  subject(:lmc) { described_class.new(project, name) }

  def dig_to_action(actions, text)
    actions.find { |action| action[:text] == text }
  end

  it "includes skill and industry in opening body" do
    expect(flowchart[:body]).to include("Ruby Ruby Ruby Ruby").
      and include("Rock Music").
      and include("Mose")
  end

  it "has the correct links" do
    expect(third[:url]).to eq("https://advisable.com/projects/request-more-information/?pid=#{project.airtable_id}&utm_campaign=#{project.airtable_id}")
    expect(dig_to_action(second[:actions], "No")[:url]).to eq("https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit")
  end

  context "lots of goals and characteristics" do
    let(:goals) { ["short", "Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way.", "The Dunder Mifflin stock symbol is D.M.I. Do you know what that stands for? Dummies, Morons, and Idiots.", "another goal that will hopefully be ignored because it's third, not because it's too short"] }
    let(:characteristics) { ["short", "I’m glad Michael’s getting help. He has a lot of issues, and he’s stupid.", "I wanna do a cartwheel. But real casual like. Not enough to make a big deal out of it, but I know everyone saw it. One stunning, gorgeous cartwheel.", "another characteristic that will be ignored probably because we just take the first couple of ones"] }

    it "shows 2 goals and 1 characteristic and goal sentences don't repeat" do
      expect(second[:body]).to include("One of their main goals from this project is this").
        and include(goals[1])
      expect(third[:body]).to include("They're looking for someone who can help them with this").
        and include(goals[2])
      expect(fourth[:body]).to include("They want someone who matches the following description").
        and include(characteristics[1])
      expect(fifth[:body]).to include("It seems like you could be a great fit!")
    end
  end

  context "1 goal and lots of characteristics" do
    let(:goals) { ["short", "Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way."] }
    let(:characteristics) { ["short", "I’m glad Michael’s getting help. He has a lot of issues, and he’s stupid.", "another characteristic that will be ignored probably because we just take the first couple of ones"] }
    let(:required_characteristics) { ["I wanna do a cartwheel. But real casual like. Not enough to make a big deal out of it, but I know everyone saw it. One stunning, gorgeous cartwheel."] }

    it "shows 1 goal and 2 characteristics and characteristics sentences don't repeat" do
      expect(second[:body]).to include("One of their main goals from this project is this").
        and include(goals[1])
      expect(third[:body]).to include("This is one of the characteristics they're looking for").
        and include(required_characteristics[0])
      expect(fourth[:body]).to include("They want someone who matches the following description").
        and include(characteristics[1])
      expect(fifth[:body]).to include("It seems like you could be a great fit!")
    end
  end

  context "no goals just characteristics" do
    let(:characteristics) { ["short", "I’m glad Michael’s getting help. He has a lot of issues, and he’s stupid.", "another characteristic that will be ignored probably because we just take the first couple of ones"] }
    let(:required_characteristics) { ["I wanna do a cartwheel. But real casual like. Not enough to make a big deal out of it, but I know everyone saw it. One stunning, gorgeous cartwheel."] }

    it "shows 2 characteristics and shortens messages" do
      expect(second[:body]).to include("They want someone who matches the following description").
        and include(required_characteristics[0])
      expect(third[:body]).to include("This is one of the characteristics they're looking for").
        and include(characteristics[1])
      expect(fourth[:body]).to include("It seems like you could be a great fit!")
    end
  end
end
