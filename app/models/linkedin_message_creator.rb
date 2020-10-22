class LinkedinMessageCreator
  MIN_REQUIREMENT_LENGTH = 70

  attr_reader :project, :sender_name

  def initialize(project, sender_name)
    @project = project
    @sender_name = sender_name
    @project_goals = project.goals.select { |g| g.length > MIN_REQUIREMENT_LENGTH }.take(2)
    @project_characteristics = (project.required_characteristics.select { |c| c.length > MIN_REQUIREMENT_LENGTH } + project.optional_characteristics.select { |c| c.length > MIN_REQUIREMENT_LENGTH }).take(2)
  end

  def flowchart
    sentences = [
      "Hi %FIRSTNAME%,",
      "Are you interested in a #{project.primary_skill&.name} freelance project with a #{project.industry} company?",
      "I'm from Advisable.com, a network of the top freelance marketing talent that companies like Stack Overflow, Zappos, Product Hunt, and SAP use to hire.",
      "One of our clients is looking for a #{project.primary_skill&.name} specialist - our existing network is too busy for it so we're looking for new people!",
      "Are you potentially interested in this project?",
      "Best,\n#{sender_name}"
    ]

    {body: sentences.join("\n\n"), actions: message_1_actions}
  end

  private

  def message_1_actions
    location = project.location_importance.to_i > 1 ? "location" : "remote"
    sentences = [
      "Great, let us walk you through all the details.",
      project.company_description,
      "This is a #{location} based freelance position and their budget is #{project.estimated_budget}.",
      "Does this sound like something you might be interested in?"
    ]
    [
      {text: "Yes", body: sentences.join("\n\n"), actions: requirement_actions(3)},
      action_no,
      {text: "I might know someone", url: "https://advisable.formstack.com/forms/performance_marketing_referral"}
    ]
  end

  def requirement_actions(number)
    requirement = next_requirement
    return final_actions if number.zero? || requirement.empty?

    [
      {text: "Yes", body: sentences_for(*requirement, number).join("\n\n"), actions: requirement_actions(number - 1)},
      action_no
    ]
  end

  def final_actions
    sentences = [
      "It seems like you could be a great fit!",
      "If you want to get the full details and immediately apply for the project, just click below and we'll send you the application form.",
      "All in, it should take you c. 5-10 minutes to apply and we'll give you feedback on your application within 24 hours."
    ]
    [
      {
        text: "Yes",
        body: sentences.join("\n\n"),
        actions: [
          {text: "Yes", url: "https://advisable.com/projects/request-more-information/?pid=#{project.airtable_id}&utm_campaign=#{project.airtable_id}"},
          action_no
        ]
      },
      action_no
    ]
  end

  def action_no
    {
      text: "No",
      url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
    }
  end

  def next_requirement
    if @project_goals.any?
      [:goal, @project_goals.shift]
    elsif @project_characteristics.any?
      [:characteristic, @project_characteristics.shift]
    else
      []
    end
  end

  def sentences_for(kind, requirement, number)
    case kind
    when :goal
      if number.odd?
        ["One of their main goals from this project is this:", requirement, "Is this something you think you'd be able to handle?"]
      else
        ["They're looking for someone who can help them with this:", requirement, "Is this something you think you could help them with?"]
      end
    when :characteristic
      if number.odd?
        ["They want someone who matches the following description:", requirement, "Does this sound like you?"]
      else
        ["This is one of the characteristics they're looking for:", requirement, "Sound like a match?"]
      end
    end
  end
end
