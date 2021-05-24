# frozen_string_literal: true

module Airtable
  class Application < Airtable::Base
    self.table_name = 'Applications'

    belongs_to :specialist, class: 'Specialist', column: 'Expert'

    sync_with ::Application
    sync_column 'Score', to: :score
    sync_column 'Available To Start', to: :availability
    sync_column 'One Line Overview', to: :introduction
    sync_column 'Advisable Comment', to: :comment
    sync_column 'Rejected Reason', to: :rejection_reason
    sync_column 'Rejected Reason Comment', to: :rejection_reason_comment
    sync_column 'Proposal Comment', to: :proposal_comment
    sync_column 'Invitation Rejected Reason', to: :invitation_rejection_reason
    sync_column 'Applied At', to: :applied_at
    sync_column 'Project Type', to: :project_type
    sync_column 'Monthly Limit', to: :monthly_limit
    sync_column 'Stopped Working Reason', to: :stopped_working_reason
    sync_column 'Source', to: :source
    sync_column 'Application Status - Invited To Apply - Timestamp', to: :invited_to_apply_at
    sync_column 'Application Status - Invitation Rejected - Timestamp', to: :invitation_rejected_at
    sync_column 'Application Status - Application Rejected - Timestamp', to: :application_rejected_at
    sync_column 'Application Status - Application Accepted - Timestamp', to: :application_accepted_at
    sync_column 'Application Status - Interview Scheduled - Timestamp', to: :interview_scheduled_at
    sync_column 'Application Status - Interview Completed - Timestamp', to: :interview_completed_at
    sync_column 'Application Status - Proposed - Timestamp', to: :proposal_sent_at
    sync_column 'Application Status - Working - Timestamp', to: :started_working_at
    sync_column 'Application Status - Stopped Working - Timestamp', to: :stopped_working_at

    sync_data do |application|
      application.invoice_rate = ((fields["Hourly Rate For Project"].presence || 0) * 100).ceil
      application.status = status_to_sync
      application.accepts_fee = fields['Accepts Fee'] == 'Yes'
      application.accepts_terms = fields['Accepts Terms'] == 'Yes'
      application.featured = fields['Featured Candidate'] == 'Yes'
      application.hidden = fields['Application Hidden'] == 'Yes'
      application.hide_from_profile = fields['Hide From Profile'] == 'Yes'
      application.trial_program = self['Trial Program'].include?('Yes') if self['Trial Program']
      application.auto_apply = self['Auto Apply'].try(:include?, 'Yes')

      specialist_id = fields['Expert'].try(:first)
      if specialist_id
        specialist = ::Specialist.find_by_airtable_id(specialist_id)
        specialist = Airtable::Specialist.find(specialist_id).sync if specialist.nil?
        application.specialist = specialist
      end

      project_id = fields['Client Project'].try(:first)
      if project_id
        project = ::Project.find_by_airtable_id(project_id)
        project = Airtable::Project.find(project_id).sync if project.nil?
        application.project = project
      end

      # Build the questions array
      # If the application questions is not equal to the questions array then set it to the questions variable
      questions = []
      questions << {question: fields['Question 1'], answer: fields['Answer 1']} if fields['Answer 1']
      questions << {question: fields['Question 2'], answer: fields['Answer 2']} if fields['Answer 2']
      application.questions = questions if (application.questions || []) != questions

      application.meta_fields = {}
      ::Application::META_FIELDS.each do |field|
        application.meta_fields[field] = self[field]
      end
    end

    def status_to_sync
      status = fields['Application Status']
      # candidates that have a scheduled or complete interview status should still
      # be considered 'Application Accepted' so that they should up in the
      # "Introduced" view.
      return 'Application Accepted' if ['Interview Scheduled', 'Interview Completed'].include?(status)

      status
    end

    push_data do |application|
      self['Application Status'] = application.status
      self['One Line Overview'] = application.introduction if application.saved_change_to_introduction?
      self['Available To Start'] = application.availability if application.saved_change_to_availability?
      self['Invitation Rejected Reason'] = application.invitation_rejection_reason if application.saved_change_to_invitation_rejection_reason?
      self['Answer 1'] = application.questions.try(:first).try(:[], 'answer') if application.saved_change_to_questions?
      self['Answer 2'] = application.questions.try(:second).try(:[], 'answer') if application.saved_change_to_questions?
      self['Question 1'] = application.questions.try(:first).try(:[], 'question') if application.saved_change_to_questions?
      self['Question 2'] = application.questions.try(:second).try(:[], 'question') if application.saved_change_to_questions?
      self['Trial Program'] = application.trial_program ? 'Yes' : 'No'
      self['Application Hidden'] = application.hidden ? 'Yes' : 'No'
      self['Hourly Rate For Project'] = (application.invoice_rate.to_d / 100).to_f if application.saved_change_to_invoice_rate?
      self['Accepts Terms'] = nil if application.accepts_terms.nil?
      self['Accepts Terms'] = 'Yes' if application.accepts_terms == true
      self['Accepts Terms'] = 'No' if application.accepts_terms == false
      self['Accepts Fee'] = nil if application.accepts_fee.nil?
      self['Accepts Fee'] = 'Yes' if application.accepts_fee == true
      self['Accepts Fee'] = 'No' if application.accepts_fee == false
      self['Applied At'] = application.applied_at
      self['Rejected Reason'] = application.rejection_reason
      self['Proposal Comment'] = application.proposal_comment
      self['Advisable Comment'] = application.comment
      self['Rejected Reason Comment'] = application.rejection_reason_comment
      self['Rejected Feedback'] = application.rejection_feedback
      self['Project Type'] = application.project_type
      self['Monthly Limit'] = application.monthly_limit
      self['Stopped Working Reason'] = application.stopped_working_reason
      self['Expert'] = [application.specialist.try(:airtable_id)].compact
      self['Client Project'] = [application.project.try(:airtable_id)].compact
      self['Auto Apply'] = 'Yes' if application.auto_apply
      self['Auto Apply'] = 'No' if application.auto_apply == false
      self['Score'] = application.score.try(:to_i)
      self['Source'] = application.source

      ::Application::META_FIELDS.each do |field|
        self[field] = application.meta_fields[field]
      end
    end
  end
end
