# rubocop:disable all
class TestData
  def self.stock_image
    n = %w[01 02 03 04 05 06 07 08 09 10 11].sample
    "https://advisable-test-assets.s3.eu-central-1.amazonaws.com/stock-photos/#{n}.jpg"
  end

  def self.create_specialist(attrs = {})
    account = Account.find_or_create_by(email: attrs.fetch(:email)) do |a|
      a.first_name = attrs.fetch(:first_name)
      a.last_name = attrs.fetch(:last_name)
      a.password = 'testing123'
      a.permissions = ["admin"]
      a.confirmed_at = 1.hour.ago
    end

    specialist =
      Specialist.find_or_create_by(account: account) do |s|
        s.bio = attrs.fetch(:bio)
        s.country = Country.find_or_create_by(name: 'United States')
        s.city = 'Scranton'
      end

    unless specialist.avatar.attached? || attrs.fetch(:avatar, nil).nil?
      url = attrs.fetch(:avatar)
      specialist.avatar.attach(
        io: open(url), filename: File.basename(URI.parse(url).path)
      )
    end

    if specialist.previous_projects.empty?
      create_previous_project(specialist: specialist)
      create_previous_project(specialist: specialist)
      create_previous_project(specialist: specialist)
      create_previous_project(specialist: specialist)
    end

    specialist
  end

  def self.create_previous_project(attrs = {})
    previous_project =
      PreviousProject.create(
        company_type: 'Startup',
        specialist: attrs.fetch(:specialist),
        validation_status: attrs.fetch(:validation_status, 'Validated'),
        contact_name: Faker::Name.name,
        contact_job_title: Faker::Company.profession.capitalize,
        client_name: Faker::Company.name,
        description:
          "#{Faker::Hipster.sentence(word_count: 40)}\n\n#{
            Faker::Hipster.sentence(word_count: 32)
          }"
      )

    skills = Skill.all.sample(4)
    previous_project.project_skills.create(skill: skills[0], primary: true)
    previous_project.project_skills.create(skill: skills[1])
    previous_project.project_skills.create(skill: skills[2])
    previous_project.project_skills.create(skill: skills[3])

    industries = Industry.all.sample(3)
    previous_project.project_industries.create(
      industry: industries[0], primary: true
    )
    previous_project.project_industries.create(industry: industries[1])
    previous_project.project_industries.create(industry: industries[2])

    previous_project.reviews.create(
      type: 'Off-Platform Project Review',
      comment: Faker::Hipster.sentence(word_count: 16),
      specialist: previous_project.specialist
    )

    url = "https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/toby.png"
    previous_project.contact_image.attach(
      io: open(url), filename: File.basename(URI.parse(url).path)
    )

    if [true, false].sample
      image = previous_project.images.create(cover: true)
      url = stock_image
      image.image.attach(
        io: open(url), filename: File.basename(URI.parse(url).path)
      )
    end

    previous_project
  end

  def self.create_application(attrs = {})
    application =
      Application.find_or_create_by(
        project: attrs.fetch(:project), specialist: attrs.fetch(:specialist)
      )

    application.status = attrs.fetch(:status)
    application.rate = 100
    application.availability = ['2-4 Weeks', 'Immediately'].sample
    application.introduction = attrs.fetch(:specialist).bio
    application.score = [70, 75, 80, 85, 90, 95].sample
    application.comment = Faker::Hipster.sentence(word_count: 16)
    application.applied_at = 2.days.ago
    application.proposal_sent_at = attrs.fetch(:proposal_sent_at, nil)
    application.proposal_comment = attrs.fetch(:proposal_comment, nil)
    application.questions = [
      {
        question: Faker::Hipster.sentence(word_count: 12),
        answer: Faker::Hipster.sentence(word_count: 32)
      },
      {
        question: Faker::Hipster.sentence(word_count: 16),
        answer: Faker::Hipster.sentence(word_count: 40)
      }
    ]

    application.save
    application
  end

  def self.create_accepted_application(project, specialist)
    application =
      create_application(
        project: project, specialist: specialist, status: 'Application Accepted'
      )

    interview =
      application.interviews.find_or_create_by(
        airtable_id: AlphanumericId.generate, user: project.user
      )
    interview.status = 'Call Requested'
    interview.save
    application
  end

  def self.create_proposal(project, specialist)
    application =
      create_application(
        project: project,
        specialist: specialist,
        status: 'Proposed',
        proposal_sent_at: 1.day.ago,
        proposal_comment:
          "Hey #{project.user.account.first_name}!\n\n Was nice chatting with you. #{
            Faker::Hipster.sentence(word_count: 24)
          }\n\n#{Faker::Hipster.sentence(word_count: 12)}",
        project_type: 'Fixed'
      )

    if application.tasks.empty?
      4.times do |i|
        application.tasks.create(
          trial: i == 0,
          name: Faker::Hipster.sentence(word_count: 8),
          stage: 'Not Assigned',
          due_date: [
            1.month.from_now,
            1.week.from_now,
            2.weeks.from_now
          ].sample,
          estimate: [10_000, 15_000, 20_000].sample,
          estimate_type: 'Fixed',
          description:
            "#{Faker::Hipster.sentence(word_count: 40)}\n\n#{
              Faker::Hipster.sentence(word_count: 32)
            }"
        )
      end
    end

    application
  end

  def self.reset
    create_data
  end

  def self.seed
    Airtable::Skill.sync(filter: nil)
    Airtable::Industry.sync(filter: nil)
    create_data
  end

  def self.create_data
    sales_person =
      SalesPerson.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.email,
        username: Faker::Internet.username
      )

    industry = Industry.find_by_name('Office Supplies')
    account = Account.find_or_create_by(email: 'staging+michael@advisable.com') do |a|
      a.first_name = 'Michael'
      a.last_name = 'Scott'
      a.password = 'testing123'
      a.permissions = ["admin"]
      a.confirmed_at = 1.day.ago
    end

    user = User.find_or_create_by(account: account) do |u|
      u.company_name = 'Dunder Mifflin'
      u.company_type = 'Startup'
      u.industry = industry
      u.sales_person = sales_person
      u.address = {city: 'Dublin', country: 'IE'}
    end

    user.update(availability: [])
    account.update(completed_tutorials: [])

    client =
      Client.find_or_create_by(name: 'Dunder Mifflin') do |c|
        c.domain = 'advisable.com'
      end

    client.users << user unless client.users.include?(user)

    # Test project
    sales_automation = Skill.find_by_name('Sales Automation')
    sales_operations = Skill.find_by_name('Sales Operations')
    small_business_marketing = Skill.find_by_name('Small Business Marketing')

    project =
      user.projects.find_or_create_by(uid: 'pro_7zWkGfiwr21yz16') do |p|
        p.sales_status = 'Open'
        p.location_importance = 0
        p.industry_experience_importance = 0
        p.status = 'Brief Confirmed'
        p.characteristics = [
          'Highly motivated and target driven with a proven track record in sales',
          'Excellent selling, communication and negotiation skills',
          'Ability to create and deliver presentations tailored to the audience needs',
          'Relationship management skills and openness to feedback',
          'Time management and organizational skills',
          'Superb interpersonal skills, including the ability to quickly build rapport with both customers and suppliers.',
          'Able to work comfortably in a fast paced environment.'
        ]
        p.required_characteristics = [
          'Highly motivated and target driven with a proven track record in sales',
          'Excellent selling, communication and negotiation skills',
          'Superb interpersonal skills, including the ability to quickly build rapport with both customers and suppliers.'
        ]
        p.goals = [
          'Establish, develop and maintain positive business and customer relationships.',
          'Expedite the resolution of customer problems and complaints to maximize satisfaction',
          'Supply management with reports on customer needs, problems, interests, competitive activities, and potential for new products and services.',
          'Achieve agreed upon sales targets and outcomes within schedule',
          'Perform cost-benefit and needs analysis of existing/potential customers to meet their needs'
        ]
        p.project_skills = [
          ProjectSkill.new(project: p, skill: sales_operations, primary: true),
          ProjectSkill.new(project: p, skill: sales_automation),
          ProjectSkill.new(project: p, skill: small_business_marketing)
        ]
        p.estimated_budget = "$20,000+"
        p.company_description = "The client is an independent consultancy with deep expertise in data and data governance."
        p.industry = "Marketing"
        p.name = "Dunder Miflin - Marketing"
      end

    project.update_attributes(sourcing: true)

    dwight =
      create_specialist(
        first_name: 'Dwight',
        last_name: 'Schrute',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/dwight.jpg',
        email: 'staging+dwight@advisable.com',
        bio:
          'Dwight Kurt Schrute III (born January 20, 1970) is a fictional character on The Office portrayed by Rainn Wilson. He is one of the highest-ranking salesmen as well as assistant to the regional manager (disputed)[1] at the paper distribution company Dunder Mifflin. Additionally, he is a bed-and-breakfast proprietor at Schrute Farms, a beet plantation owner, and an owner of the business park in which Dunder Mifflin exists. He is notorious for his lack of social skills and common sense, his love for martial arts and the justice system, and his office rivalry with fellow salesman Jim Halpert. He is also known for his romantic relationship with Angela Martin, head of the accounting department. He has at times risen to the position of acting Branch Manager of the Scranton branch, but often serves as a second or third in command as Assistant (to the) Regional Manager. While Dwight was a regional manager in the last few episodes of the series, he named himself the Assistant to the Assistant to the Regional Manager (A.A.R.M). Dwight was also the Vice President of Special Projects Development for the Sabre Corporation, which was the parent company of Dunder Mifflin at the time, but was soon replaced by Todd Packer, who was almost immediately terminated. In the final season, Dwight is offered the position of permanent Regional Manager.'
      )

    create_application(specialist: dwight, project: project, status: 'Applied')

    jim =
      create_specialist(
        first_name: 'Jim',
        last_name: 'Halpert',
        email: 'staging+jim@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/jim.png',
        bio:
          "James 'Jim' Halpert (born October 1, 1978) is a fictional character in the U.S. version of the television sitcom The Office, portrayed by John Krasinski. The character is based on Tim Canterbury from the original version of The Office. The character is also named after a childhood friend of executive producer Greg Daniels. He is introduced as a sales representative at the Scranton branch of paper distribution company Dunder Mifflin, before temporarily transferring to the Stamford branch in the third season. Upon the merger of Scranton and Stamford branches, he becomes Assistant Regional Manager, and later co-manager alongside Michael Scott during the sixth-season episode arc from 'The Promotion' to 'Manager and Salesman'. His character serves as the intelligent, mild-mannered straight man role to Michael, although it is also defined by a rivalrous pranking on fellow salesman Dwight Schrute and a romantic interest in receptionist Pam Beesly, whom he begins dating in the fourth season, marries in the sixth, and has children with in the sixth and eighth. Jim's coworker, Andy Bernard, often calls him by the nickname 'Big Tuna'."
      )

    create_application(specialist: jim, project: project, status: 'Applied')

    darryl =
      create_specialist(
        first_name: 'Darryl',
        last_name: 'Philbin',
        email: 'staging+darryl@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/darryl.png',
        bio:
          "Although he is dry and humorless when dealing with Michael Scott, the office manager, he seems to be a much more relaxed, silly person in social situations. Unlike Michael, Darryl is competent, ambitious, and innovative, and on several occasions late into the series, he promotes ideas to corporate that seem to benefit the company greatly. Michael refers to him as \"Mittah Rogers\"—a nickname which began as \"Regis\" (as Darryl's last name is Philbin, a reference to Regis Philbin who is producer Michael Schur's father-in-law), then \"Reeg\", \"Roger\" and then finally settling on \"Mittah Rogers\".[1] In contrast with this, Darryl almost always calls Michael \"Mike\" instead of by his full name (although he will call him by his full name when he becomes frustrated or annoyed with Michael's immaturity). Being in a position of responsibility in a potentially hazardous work area, he dislikes Michael's disregard for rules or safety, as Michael often disrupts their work schedule and delays their shipments from going out on time. His relationship with Michael is tense, as he is often aggravated by Michael's juvenile antics, as when he stated his greatest fear is that someone would prevent them from getting the shipments out on time. His rapport with the rest of the staff both in the office and warehouse is friendly. He was initially enemies with Andy Bernard but the two eventually become close friends and confidants."
      )

    create_application(specialist: darryl, project: project, status: 'Applied')

    pam =
      create_specialist(
        first_name: 'Pam',
        last_name: 'Beesly',
        email: 'staging+pam@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/pam.jpg',
        bio:
          "Pamela Morgan \"Pam\" Halpert (née Beesly; born March 25, 1979) is a fictional character on The Office, played by Jenna Fischer. Her counterpart in the original UK series of The Office is Dawn Tinsley. Her character is initially the receptionist at the paper distribution company Dunder Mifflin, before becoming a saleswoman and eventually office administrator until she left in the series finale. Her character is shy, growing assertive but amiable, and artistically inclined, and shares a romantic interest with Jim Halpert, whom she begins dating in the fourth season, and eventually, marries and starts a family with as the series continues."
      )

    create_accepted_application(project, pam)

    ryan =
      create_specialist(
        first_name: 'Ryan',
        last_name: 'Howard',
        email: 'staging+ryan@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/ryan.png',
        bio:
          "Ryan Bailey Howard is a fictional character on the US television series The Office. He is portrayed by the show's writer, director, and executive producer B. J. Novak, and is based upon Ricky Howard from the original British version of The Office (as well as Neil Godwin, during the fourth season).[2] During this time, his role is significantly expanded to that of a main character."
      )

    application = create_accepted_application(project, ryan)
    application.interviews.first.update starts_at: 2.days.from_now,
                                        status: 'Call Scheduled'
    application.update status: 'Interview Scheduled'

    erin =
      create_specialist(
        first_name: 'Erin',
        last_name: 'Hannon',
        email: 'staging+erin@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/erin.jpg',
        bio:
          "Kelly Erin Hannon (born May 1, 1986)[1] is a fictional character from the U.S. comedy television series The Office. She is the office receptionist for the Scranton branch of Dunder Mifflin, a position previously held by Pam Beesly before she quit to go work for the Michael Scott Paper Company. Erin is portrayed by Ellie Kemper. She is an original character, although her closest equivalent in the British version of the series would be Mel the receptionist, who appears briefly in The Office Christmas specials, as Dawn Tinsley's replacement."
      )

    application = create_accepted_application(project, erin)
    application.interviews.first.update starts_at: 2.days.ago,
                                        status: 'Call Completed'
    application.update status: 'Interview Completed'

    toby =
      create_specialist(
        first_name: 'Toby',
        last_name: 'Flenderson',
        email: 'staging+toby@advisable.com',
        avatar: 'https://advisable-test-assets.s3.eu-central-1.amazonaws.com/characters/toby.png',
        bio:
          'Toby H. Flenderson[1] (born February 22, 1963) is a fictional character in The Office played by Paul Lieberstein. Prior to his termination in the series finale, he was the Human Resources Representative at the Scranton branch of Dunder Mifflin/Sabre. He is generally soft-spoken and mild-mannered.'
      )

    create_proposal(project, toby)

    project.update_application_counts
  end
end
# rubocop:enable all
