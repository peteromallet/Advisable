require 'rails_helper'

describe "Project setup flow" do
  let(:project) { create(:project, {
    status: "Brief Pending Confirmation",
    company_description: "company overview",
    description: "project description",
    goals: ["goal"],
    specialist_description: "specialist overview",
    required_characteristics: ["characteristic"],
    optional_characteristics: ["characteristic"],
    questions: ["question?"],
    accepted_terms: true,
    deposit: 100_00,
  }) }

  before :each do
    airtable_record = double(Airtable::Project)
    allow(airtable_record).to receive(:[]=)
    allow(airtable_record).to receive(:save)
    allow(Airtable::Project).to receive(:find).and_return(airtable_record)
  end

  describe "company overview step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/company_overview"
      content = "This is the company description"
      fill_in "companyDescription", with: content
      click_button "Continue"
      expect(page).to have_content("Project Overview")
    end
  end

  describe "project overview step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/project_overview"
      content = "This is the project description"
      fill_in "description", with: content
      click_button "Continue"
      expect(page).to have_content("Goals")
    end

    context "when there is no company description" do
      it "redirects to the company overview step" do
        project.update_attributes(company_description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/project_overview"
        expect(page).to have_content("Company Overview")
      end
    end
  end

  describe "project goals steps" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/goals"
      fill_in "goals[0]", with: "This is a project goal"
      click_button "Continue"
      expect(page).to have_content("Specialist Overview")
    end

    context "when there is no description" do
      it "redirects to the project overview step" do
        project.update_attributes(description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/goals"
        expect(page).to have_content("Project Overview")
      end
    end
  end

  describe "specialist overview step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/specialist_overview"
      fill_in "specialistDescription", with: "This is the specialist description"
      click_button "Continue"
      expect(page).to have_content("Must-have Characteristics")
    end

    context "when there are no goals" do
      it "redirects to the goals step" do
        project.update_attributes(goals: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/specialist_overview"
        expect(page).to have_content("Goals")
      end
    end
  end

  describe "must have characteristics step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/must_have"
      fill_in "requiredCharacteristics[0]", with: "characteristic"
      click_button "Continue"
      expect(page).to have_content("Nice-to-have Characteristics")
    end

    context "when there is no specialist overview" do
      it "redirects to the specialist overview step" do
        project.update_attributes(specialist_description: nil)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/must_have"
        expect(page).to have_content("Specialist Overview")
      end
    end
  end

  describe "nice-to-have characteristics step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/nice_to_have"
      fill_in "optionalCharacteristics[0]", with: "characteristic"
      click_button "Continue"
      expect(page).to have_content("Questions")
    end

    context "when there are no required characteristics" do
      it "redirects to the specialist overview step" do
        project.update_attributes(required_characteristics: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/nice_to_have"
        expect(page).to have_content("Must-have Characteristics")
      end
    end
  end

  describe "questions step" do
    it "progresses to the next step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/questions"
      fill_in "questions[0]", with: "This is a question?"
      click_button "Continue"
      expect(page).to have_content("Terms")
    end

    context "when there are no required characteristics" do
      it "redirects to the specialist overview step" do
        project.update_attributes(required_characteristics: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/nice_to_have"
        expect(page).to have_content("Must-have Characteristics")
      end
    end
  end

  describe "terms and conditions step" do
    it "progresses to the deposit step" do
      authenticate_as project.user
      visit "/project_setup/#{project.airtable_id}/terms"
      check "acceptedTerms"
      click_button "Continue"
      expect(page).to have_content("Deposit")
    end

    context "when the proejct does not require a deposit" do
      it "progresses to the confirm step" do
        project.update_attributes(deposit: 0)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/terms"
        check "acceptedTerms"
        click_button "Complete"
        expect(page).to have_content("Setting up")
      end
    end

    context "when there are no questions" do
      it "redirects to the questions step" do
        project.update_attributes(questions: [])
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/terms"
        expect(page).to have_content("Questions")
      end
    end
  end

  describe "deposit step" do
    before :each do
      source = double(Stripe::Source, id: 'src_123', status: 'chargeable')
      allow(Stripe::Source).to receive(:retrieve).and_return(source)
      charge = double(Stripe::Charge, id: "ch_12")
      allow(Stripe::Charge).to receive(:create).and_return(charge)
    end

    # it "progresses to /confirm" do
    #   visit "/project_setup/#{project.airtable_id}/deposit"
    #   using_wait_time(20) {
    #     frame = find('iframe')
    #     within_frame(frame) do
    #       "4242424242424242".chars.each do |char|
    #         find_field('cardnumber').send_keys(char)
    #       end
    #       find_field('exp-date').send_keys("0122")
    #       find_field('cvc').send_keys('123')
    #       find_field('postal').send_keys('19335')
    #     end
    #   }
    #   click_button "Complete"
    #   expect(page).to have_content("Setting up")
    # end

    context "when terms have not been accepted" do
      it "redirects to the terms" do
        project.update_attributes(accepted_terms: false)
        authenticate_as project.user
        visit "/project_setup/#{project.airtable_id}/deposit"
        expect(page).to have_content("Terms")
      end
    end
  end
end