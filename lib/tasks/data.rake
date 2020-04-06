namespace :data do
  task industries: :environment do
    industries_file = Rails.root.join('lib', 'tasks', 'data', 'industries.txt')
    industries = File.readlines(industries_file).map(&:strip)
    industries.each { |name| Industry.create(name: name) }
  end

  task blacklisted_domains: :environment do
    file = Rails.root.join('lib', 'tasks', 'data', 'blacklisted_domains.txt')
    domains = File.readlines(file).map(&:strip)
    domains.each { |domain| BlacklistedDomain.create(domain: domain) }
  end

  task migrate_previous_projects: :environment do
    ProjectSkill.where(project_type: 'OffPlatformProject').update_all(
      project_type: 'PreviousProject'
    )

    ProjectIndustry.where(project_type: 'OffPlatformProject').update_all(
      project_type: 'PreviousProject'
    )

    Review.where(project_type: 'OffPlatformProject').update_all(
      project_type: 'PreviousProject'
    )
  end

  task migrate_references: :environment do
    ApplicationReference.where(project_type: 'OffPlatformProject').update_all(
      project_type: 'PreviousProject'
    )

    ApplicationReference.where(project_type: 'Project').each do |ar|
      project = Project.find(ar.project_id)
      previous_project =
        PreviousProject.for_project(
          specialist: ar.application.specialist, project: project
        )

      if previous_project.nil?
        puts "NO PREVIOUS PROJECT FOUND FOR PROJECT REFERENCE #{ar.id}"
        next
      end

      ar.update(project: previous_project)
    end
  end
end
