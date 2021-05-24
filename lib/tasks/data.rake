# frozen_string_literal: true

require "ruby-progressbar"
require_relative "../../config/environment"

def migrate_image_to_project(ppi, blob, project)
  project.images.attach(blob)
  attachment = ActiveStorage::Attachment.find_by!(record: project, blob: blob)
  attachment.update(position: ppi.position)
  project.update(cover_photo_id: attachment.id) if ppi.cover
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
    total = PreviousProject.count
    i = 0
    PreviousProject.find_each do |project|
      i += 1
      puts "Migrating project##{project.id} #{i}/#{total}"
      ppis = PreviousProjectImage.where(off_platform_project_id: project.id)
      existing_images = project.images.pluck(:blob_id)

      ppis.each do |ppi|
        blob = ppi.image&.blob
        next if blob.blank? || existing_images.include?(blob.id)

        migrate_image_to_project(ppi, blob, project)
      end
    end
  end

  task migrate_specialist_referrers: :environment do
    specialists = Specialist.where.not(referrer: [nil, ""])
    pb = ProgressBar.create(title: "Specialists", total: specialists.count, format: "%a %b\u{15E7}%i %p%% %t", progress_mark: ' ', remainder_mark: "\u{FF65}")
    specialists.each do |specialist|
      pb.increment
      referrer_id = Specialist.find_by_uid_or_airtable_id(specialist.referrer)&.id
      next unless referrer_id

      specialist.update(referrer_id: referrer_id)
    end
  end
end
