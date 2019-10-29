namespace :data do
  task industries: :environment do
    industries_file = Rails.root.join("lib", "tasks", "data", "industries.txt")
    industries = File.readlines(industries_file).map(&:strip)
    industries.each do |name|
      Industry.create(name: name)
    end
  end

  task blacklisted_domains: :environment do
    file = Rails.root.join("lib", "tasks", "data", "blacklisted_domains.txt")
    domains = File.readlines(file).map(&:strip)
    domains.each do |domain|
      BlacklistedDomain.create(domain: domain)
    end
  end
end
