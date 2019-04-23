require "rails_helper"

describe Mutations::CreateTask do
  let(:user) { create(:user) }
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, user: user) }
  let(:application) { create(:application, specialist: specialist, project: project) }
  let(:context) { { current_user: user } }
  let(:response) {
    AdvisableSchema.execute(
      query,
      context: context
    )
  }
  
  let(:query) { %|
    mutation {
      createTask(input: {
        id: #{Task.generate_uid},
        application: #{application.airtable_id},
      }) {
        task {
          id
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(Airtable::Task).to receive(:create)
  end

  context "when a user is signed in" do
    it "creates a new task" do
      expect(response["data"]["createTask"]["task"]).to_not be_nil
    end
  end

  context "when the specialist is authenticated" do
    let(:context) { { current_user: specialist } }
    
    it "responds with not_authorized error code" do
      expect(response["data"]["createTask"]["task"]).to_not be_nil
    end
  end
    
  context "when there is no user signed in" do
    let(:context) { { current_user: nil } }
    
    it "responds with not_authorized error code" do
      error = response["data"]["createTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when a user is logged in but they dont have access to the project" do
    let(:context) { { current_user: create(:user) } }
    
    it "responds with not_authorized error code" do
      error = response["data"]["createTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when a specialist is logged in but they dont have access to the project" do
    let(:context) { { current_user: create(:specialist) } }
    
    it "responds with not_authorized error code" do
      error = response["data"]["createTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end
end