class Airtable::Application < Airtable::Base
  self.table_name = "Applications"

  belongs_to :specialist, class: 'Specialist', column: "Expert"

  sync_with ::Application
  sync_column 'Score', to: :score
  sync_column 'Accepts Fee', to: :accepts_fee
  sync_column 'Accepts terms', to: :accepts_terms
  sync_column 'Hourly Rate For Project', to: :rate
  sync_column 'Available To Start', to: :availability
  sync_column 'One Line Overview', to: :introduction
  sync_column 'Advisable Comment', to: :comment
  sync_column 'Rejected Reason', to: :rejection_reason
  sync_column 'Rejected Reason Comment', to: :rejection_reason_comment
  sync_column 'Proposal Comment', to: :proposal_comment
  sync_column 'Invitation Rejected Reason', to: :invitation_rejection_reason
  sync_column 'Referral URL', to: :referral_url
  sync_column 'Applied At', to: :applied_at
  sync_column 'Project Type', to: :project_type

  sync_data do |application|
    application.status = status_to_sync
    application.accepts_fee = fields['Accepts Fee'] == 'Yes'
    application.accepts_terms = fields['Accepts Terms'] == 'Yes'
    application.featured = fields['Featured Candidate'] == 'Yes'
    application.references_requested = fields['References Requested'] == 'Yes'
    application.hidden = fields['Application Hidden'] == 'Yes'

    specialist_id = fields["Expert"].try(:first)
    if specialist_id
      specialist = ::Specialist.find_by_airtable_id(specialist_id)
      specialist = Airtable::Specialist.find(specialist_id).sync if specialist.nil?
      application.specialist = specialist
    end

    project_id = fields["Client Project"].try(:first)
    if project_id
      project = ::Project.find_by_airtable_id(project_id)
      project = Airtable::Project.find(project_id).sync if project.nil?
      application.project = project
    end

    # Build the questions array
    questions = [];

    if fields["Answer 1"]
      questions << {
        question: fields["Question 1"],
        answer: fields["Answer 1"],
      }
    end

    if fields["Answer 2"]
      questions << {
        question: fields["Question 2"],
        answer: fields["Answer 2"],
      }
    end

    # If the application questions is not equal to the questions array then set
    # it to the questions variable
    if (application.questions || []) != questions
      application.questions = questions
    end
  end

  def status_to_sync
    status = fields['Application Status']
    # candidates that have a scheduled or complete interview status should still
    # be considered 'Application Accepted' so that they should up in the
    # "Introduced" view.
    if ["Interview Scheduled", "Interview Completed"].include?(status)
      return 'Application Accepted'
    end

    # Sync any records with a status of To Be Invited as "Invited To Apply"
    return "Invited To Apply" if status == "To Be Invited"
    status
  end

  push_data do |application|
    self['Application Status'] = application.status if application.saved_change_to_status?
    self['One Line Overview'] = application.introduction if application.saved_change_to_introduction?
    self['Available To Start'] = application.availability if application.saved_change_to_availability?
    self['Invitation Rejected Reason'] = application.invitation_rejection_reason if application.saved_change_to_invitation_rejection_reason?
    self['Answer 1'] = application.questions.try(:first).try(:[], "answer") if application.saved_change_to_questions?
    self['Answer 2'] = application.questions.try(:second).try(:[], "answer") if application.saved_change_to_questions?
    self['Question 1'] = application.questions.try(:first).try(:[], "question") if application.saved_change_to_questions?
    self['Question 2'] = application.questions.try(:second).try(:[], "question") if application.saved_change_to_questions?

    references_project_ids = application.references.where(project_type: "Project").map do |r|
      r.project.airtable_id
    end
    self['References - Projects'] = references_project_ids

    references_off_platform_project_ids = application.references.where(project_type: "OffPlatformProject").map do |r|
      r.project.airtable_id
    end
    self['References - Off Platform Projects'] = references_off_platform_project_ids

    self['Hourly Rate For Project'] = application.rate.try(:to_f) if application.saved_change_to_rate?
    self['Accepts Terms'] = application.accepts_terms ? "Yes" : "No"
    self['Accepts Fee'] = application.accepts_fee ? "Yes" : "No"
    self['Applied At'] = application.applied_at
    self['Rejected Reason'] = application.rejection_reason
    self['Proposal Comment'] = application.proposal_comment
    self['Rejected Reason Comment'] = application.rejection_reason_comment
    self['References Requested'] = application.references_requested ? "Yes" : nil
    self['Project Type'] = application.project_type
  end
end
