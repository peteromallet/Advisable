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

  task migrate_project_counts: :environment do
    projects =
      Project.joins(:applications).where(
        applications: {
          status: [
            (
              Application::ACTIVE_STATUSES + %w[Proposed] +
                Application::HIRED_STATUSES
            )
          ]
        }
      )

    projects.find_each(&:update_application_counts)
  end
end
