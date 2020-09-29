class LinkedinMessageCreator
  attr_reader :project, :sender_name

  def initialize(project, sender_name)
    @project = project
    @sender_name = sender_name
  end

  def flowchart
    sentences = [
      "Hi %FIRSTNAME%,",
      "Are you interested in a #{project.primary_skill&.name} freelance project with a #{project.industry} company?",
      "I'm from Advisable.com, a network of the top freelance marketing talent that companies like Stack Overflow, Zappos, Product Hunt and SAP use to hire.",
      "One of our clients is looking for a #{project.primary_skill&.name} specialist - our existing network is too busy for it so we're looking for new people!",
      "Are you potentially interested in this project?",
      "Best,\n#{sender_name}"
    ]
    flowchart = {
      body: sentences.join("\n\n"),
      actions: message_1_actions
    }
  end

  private

  def message_1_actions
    location = project.location_importance.to_i > 1 ? 'location' : 'remote'
    sentences = [
      "Great, let us walk you through all the details.",
      project.company_description,
      "This is a #{location} based freelance position and their budget is #{project.estimated_budget}.",
      "Does this sound like something you might be interested in?"
    ]
    [
      {
        text: "Yes",
        body: sentences.join("\n\n"),
        actions: message_2_actions
      },
      action_no,
      {
        text: "I might know someone",
        url: "https://advisable.formstack.com/forms/performance_marketing_referral"
      }
    ]
  end

  def message_2_actions
    [
      {
        text: "Yes",
        body: "Let's start then",
        actions: message_3_actions
      },
      action_no
    ]
  end

  def message_3_actions
    [
      {
        text: "Yes",
        body: "Good to hear",
        actions: message_4_actions
      },
      action_no
    ]
  end

  def message_4_actions
    [
      {
        text: "Yes",
        body: "our client",
        actions: message_5_actions
      },
      action_no
    ]
  end

  def message_5_actions
    [
      {
        text: "Yes",
        body: "it seems like you could be a great fit",
        actions: message_6_actions
      },
      action_no
    ]
  end

  def message_6_actions
    [
      {
        text: "Yes",
        url: "https://advisable.com/projects/request-more-information/?pid=#{project.id}&utm_campaign=#{project.id}"
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
end
