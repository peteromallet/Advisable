require 'rails_helper'

describe 'specialists root query' do
  let(:skill) { create(:skill) }
  let(:specialist) { create(:specialist) }
  let(:query_args) { "skill: \"#{skill.name}\""}
  let(:query) {
    <<-GRAPHQL
    {
      specialists(#{query_args}) {
        nodes {
          id
        }
      }
    }
    GRAPHQL
  }

  before :each do
    specialist.skills << skill
  end

  it "filters specialists based on a given skill" do 
    s2 = create(:specialist)
    response = AdvisableSchema.execute(query)
    nodes = response["data"]["specialists"]["nodes"]
    expect(nodes).to include({ "id" => specialist.uid })
    expect(nodes).not_to include({ "id" => s2.uid })
  end

  it "excludes specialists with an average_score below 65" do
    s2 = create(:specialist, average_score: 55)
    s2.skills << skill
    response = AdvisableSchema.execute(query)
    nodes = response["data"]["specialists"]["nodes"]
    expect(nodes).to include({ "id" => specialist.uid })
    expect(nodes).not_to include({ "id" => s2.uid })
  end

  context "when an industry is provided" do
    let(:query_args) { "skill: \"#{skill.name}\", industry: \"Marketing\", industryRequired: true"}

    context "and the specialist does not have industry experience" do
      it "does not include the specialist" do
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).not_to include({ "id" => specialist.uid })
      end
    end

    context "and a specialist has an off_platform_project in that industry" do
      it "includes the specialist" do
        create(:off_platform_project, industry: "Marketing", specialist: specialist)
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).to include({ "id" => specialist.uid })
      end
    end

    context "and a specialist has an on_platform project in that industry" do
      it "includes the specialist" do
        project = create(:project, industry: "Marketing")
        create(:application, project: project, specialist: specialist)
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).to include({ "id" => specialist.uid })
      end
    end
  end

  context "when company_type is provided" do
    let(:query_args) { "skill: \"#{skill.name}\", companyType: \"Start-up\", companyTypeRequired: true"}

    context "and the specialist does not have experience with that company type" do
      it "does not include the specialist" do
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).not_to include({ "id" => specialist.uid })
      end
    end

    context "and a specialist has an off_platform_project with that company type" do
      it "includes the specialist" do
        create(:off_platform_project, company_type: "Start-up", specialist: specialist)
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).to include({ "id" => specialist.uid })
      end
    end

    context "and a specialist has an on_platform project with that company type" do
      it "includes the specialist" do
        project = create(:project, company_type: "Start-up")
        create(:application, project: project, specialist: specialist)
        response = AdvisableSchema.execute(query)
        nodes = response["data"]["specialists"]["nodes"]
        expect(nodes).to include({ "id" => specialist.uid })
      end
    end
  end
end
