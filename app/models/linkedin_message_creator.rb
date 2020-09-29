class LinkedinMessageCreator
  attr_reader :project

  def initialize(project)
    @project = project
  end

  def flowchart
    flowchart = {
      body: "Hi %FIRSTNAME%, lalala",
      actions: [
        {
          text: "Yes",
          body: "Great, let us walk blablabla",
          actions: [
            {
              text: "Yes",
              body: "Let's start then",
              actions: [
                {
                  text: "Yes",
                  body: "Good to hear",
                  actions: [
                    {
                      text: "Yes",
                      body: "our client",
                      actions: [
                        {
                          text: "Yes",
                          body: "it seems like you could be a great fit",
                          actions: [
                            {
                              text: "Yes",
                              url: "https://advisable.com/projects/request-more-information/?pid=#{project.id}&utm_campaign=#{project.id}"
                            },
                            {
                              text: "No",
                              url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                            }
                          ]
                        },
                        {
                          text: "No",
                          url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                        }
                      ]
                    },
                    {
                      text: "No",
                      url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                    }
                  ]
                },
                {
                  text: "No",
                  url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
                }
              ]
            },
            {
              text: "No",
              url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
            }
          ]
        },
        {
          text: "No",
          url: "https://advisable.com/thank-you/?text=Unfortunately%2C%20we%20don%27t%20think%20you%27re%20a%20good%20fit"
        },
        {
          text: "I might know someone",
          url: "https://advisable.formstack.com/forms/performance_marketing_referral"
        }
      ]
    }
  end
end
