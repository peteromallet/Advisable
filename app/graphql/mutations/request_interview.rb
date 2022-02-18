# frozen_string_literal: true

module Mutations
  class RequestInterview < Mutations::BaseMutation
    argument :message, String, required: true
    argument :specialist, ID, required: true

    field :interview, Types::Interview, null: false

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      specialist = Specialist.find_by!(uid: args[:specialist])
      conversation = Conversation.by_accounts([specialist.account, current_user.account])
      skill = specialist.articles.first&.skills&.primary&.first&.skill
      project = current_user.projects.with_primary_skill(skill&.id).first || create_project(skill)
      application = create_application(project, specialist)
      interview = application.create_interview(status: "Call Requested", user: current_user)

      conversation.new_message!(author: current_user.account, content: args[:message], kind: "InterviewRequest", interview:, send_emails: false)
      Slack.bg_message(channel: "consultation_requests", text: "We have a new interview request for #{specialist.account.name} from #{current_user.name_with_company}.")
      SpecialistMailer.interview_request(interview).deliver_later

      {interview:}
    end

    private

    def create_project(skill)
      current_account_responsible_for do
        project = Project.create(user: current_user, skills: [skill], sales_status: "Open", status: "Project Created", service_type: "Consultation", primary_skill: skill, name: "#{current_user.company.name} - #{skill&.name}")
        project.sync_to_airtable
        project
      end
    end

    def create_application(project, specialist)
      current_account_responsible_for do
        Application.create(project:, specialist:, status: "Applied", score: 90, trial_program: true, source: "request-interview")
      end
    end
  end
end
