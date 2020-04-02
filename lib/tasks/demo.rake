namespace :demo do
  task create_specialists: :environment do
    skills = Skill.all
    industries = Industry.all

    1_000.times do |i|
      puts "CREATING SPECIALIST #{i}"
      country = Country.find_or_create_by(name: 'United States')

      specialist =
        Specialist.create(
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          email: Faker::Internet.email,
          city: Faker::Address.city,
          country: country,
          hourly_rate: 100,
          average_score: 80
        )

      # create skills
      5.times do |s|
        skill = skills.sample
        specialist.skills << skill
      end

      5.times do |p|
        industry = industries.sample
        skill = skills.sample

        specialist.previous_projects.create(
          industry: industry.name,
          primary_skill: skill.name,
          contact_first_name: Faker::Name.first_name,
          contact_last_name: Faker::Name.last_name,
          contact_job_title: Faker::Job.title,
          client_name: Faker::Company.name,
          project_industries: [
            ProjectIndustry.new(industry: industry, primary: true),
            ProjectIndustry.new(industry: industries.sample)
          ],
          project_skills: [
            ProjectSkill.new(skill: skill, primary: true),
            ProjectSkill.new(skill: skills.sample),
            ProjectSkill.new(skill: skills.sample),
            ProjectSkill.new(skill: skills.sample)
          ]
        )
      end

      # Create on platform projects
      5.times do |p|
        user =
          User.create(
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.email,
            company_name: Faker::Company.name
          )

        industry = industries.sample
        skill = skills.sample

        project =
          user.projects.create(
            name: "#{skill.name}",
            service_type: 'Self-Service',
            primary_skill: skill.name,
            industry: industry.name,
            project_skills: [
              ProjectSkill.new(skill: skill, primary: true),
              ProjectSkill.new(skill: skills.sample),
              ProjectSkill.new(skill: skills.sample),
              ProjectSkill.new(skill: skills.sample)
            ]
          )

        puts project.errors.full_messages

        project.applications.create(
          status: 'Stopped Working', specialist: specialist
        )
      end
    end
  end
end
