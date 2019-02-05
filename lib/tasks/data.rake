namespace :data do
  task industries: :environment do
    industries_file = Rails.root.join("lib", "tasks", "data", "industries.txt")
    industries = File.readlines(industries_file).map(&:strip)
    industries.each do |name|
      Industry.create(name: name)
    end
  end
end
