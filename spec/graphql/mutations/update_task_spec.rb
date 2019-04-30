require "rails_helper"

describe Mutations::UpdateTask do
  let(:task) {
    create(:task, {
      description: nil,
      name: nil,
      stage: "Not Assigned",
      due_date: nil,
      estimate: nil,
    })
  }
  
  let(:input) { %|
    {
      id: #{task.uid},
      name: "Updated Name",
    }
  |}

  let(:query) { %|
    mutation {
      updateTask(input: #{input}) {
        task {
          id
          stage
          name
        }
        errors {
          code
        }
      }
    }
  |}

  let(:context) {{ current_user: task.application.project.user }}

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
  end

  context "when the user does not have access to the project" do
    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {
        current_user: create(:user)
      })
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when there is no authenticated user" do
    it "returns an error" do
      response = AdvisableSchema.execute(query, context: {
        current_user: nil
      })
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("not_authorized")
    end
  end

  context "when the stage is Assigned" do
    let(:task) { create(:task, stage: "Assigned") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.nameIsLocked")
    end
  end

  context "when the stage is Working" do
    let(:task) { create(:task, stage: "Working") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.nameIsLocked")
    end
  end

  context "when the stage is Submitted" do
    let(:task) { create(:task, stage: "Submitted") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.nameIsLocked")
    end
  end

  context "when the stage is Approved" do
    let(:task) { create(:task, stage: "Approved") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["updateTask"]["errors"][0]
      expect(error["code"]).to eq("tasks.nameIsLocked")
    end
  end

  context "when updating the name" do
    let(:input) { %|
      {
        id: #{task.uid},
        name: "Updated Name",
      }
    |}

    it "Updates the task name" do
      response = AdvisableSchema.execute(query, context: context)
      name = response["data"]["updateTask"]["task"]["name"]
      expect(name).to eq("Updated Name")
    end

    it "doesnt trigger a webhook" do
      expect(WebhookEvent).to_not receive(:trigger)
      AdvisableSchema.execute(query, context: context)
    end

    context "and the stage is Assigned" do
      let(:task) { create(:task, name: nil, stage: "Assigned") }

      it "returns an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["data"]["updateTask"]["errors"][0]
        expect(error["code"]).to eq("tasks.nameIsLocked")
      end
    end

    context "and the stage is Quote Provided" do
      let(:task) { create(:task, name: nil, stage: "Quote Provided") }

      it "sets the stage to Not Assigned" do
        expect {
          AdvisableSchema.execute(query, context: context)
        }.to change {
          task.reload.stage
        }.from("Quote Provided").to("Not Assigned")
      end
    end
  end

  context "when updating the description" do
    let(:input) { %|
      {
        id: #{task.uid},
        description: "Updated description",
      }
    |}

    it "Updates the task description" do
      expect {
        AdvisableSchema.execute(query, context: context)
      }.to change {
        task.reload.description
      }.from(nil).to("Updated description")
    end


    context "and the stage is Quote Provided" do
      let(:task) { create(:task, description: nil, stage: "Quote Provided") }

      it "sets the stage to Not Assigned" do
        expect {
          AdvisableSchema.execute(query, context: context)
        }.to change {
          task.reload.stage
        }.from("Quote Provided").to("Not Assigned")
      end
    end
  end

  context "when updating the due_Date" do
    let(:due_date) { 2.days.from_now }
    let(:input) { %|
      {
        id: #{task.uid},
        dueDate: "#{due_date.strftime("%Y-%m-%d")}",
      }
    |}

    it "Updates the task due_date" do
      expect {
        AdvisableSchema.execute(query, context: context)
      }.to change {
        task.reload.due_date.try(:to_date)
      }.from(nil).to(due_date.to_date)
    end

    context "and the stage is Quote Provided" do
      let(:task) { create(:task, due_date: nil, estimate: 4, stage: "Quote Provided") }

      it "sets the stage to Not Assigned" do
        expect {
          AdvisableSchema.execute(query, context: context)
        }.to change {
          task.reload.stage
        }.from("Quote Provided").to("Not Assigned")
      end

      it "removes the estimate" do
        expect {
          AdvisableSchema.execute(query, context: context)
        }.to change {
          task.reload.estimate
        }.from(4).to(nil)
      end
    end
  end

  context "when updating the estimate" do
    let(:input) { %|
      {
        id: #{task.uid},
        estimate: 8,
      }
    |}

    it "Updates the task estimate" do
      expect {
        AdvisableSchema.execute(query, context: context)
      }.to change {
        task.reload.estimate
      }.from(nil).to(8)
    end

    context "and the stage is Quote Requested" do
      let(:task) { create(:task, estimate: nil, stage: "Quote Requested") }

      it "sets the stage to 'Quote Provided'" do
        expect {
          AdvisableSchema.execute(query, context: context)
        }.to change {
          task.reload.stage
        }.from("Quote Requested").to("Quote Provided")
      end

      it "triggers a webhook" do
        expect(WebhookEvent).to receive(:trigger).with("tasks.quote_provided", any_args)
        AdvisableSchema.execute(query, context: context)
      end
    end
  end
end