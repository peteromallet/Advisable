# frozen_string_literal: true

require_relative "../../config/environment"

def migrate_image_to_project(ppi, project)
  blob = ppi.image.blob
  project.images.attach(blob)
  ActiveStorage::Attachment.find_by!(record: project, blob: blob).update(position: ppi.position)
  ppi.destroy!
rescue ActiveRecord::ActiveRecordError => e
  Sentry.capture_exception(e, level: "debug", extra: {ppi_id: ppi.id})
end

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

  task migrate_previous_project_images: :environment do
    PreviousProjectImage.find_each do |ppi|
      project = PreviousProject.find_by(id: ppi.off_platform_project_id)
      next unless project

      migrate_image_to_project(ppi, project)
    end
  end
end
