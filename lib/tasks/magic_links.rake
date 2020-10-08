# Rake task to be setup to run daily to clear out old magic links
namespace :magic_links do
  task clear: :environment do
    MagicLink.expired.delete_all
  end
end
