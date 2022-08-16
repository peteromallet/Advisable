# frozen_string_literal: true

# Removes node_modules after compiling the assets to reduce heroku slug size
# Adapted from https://blog.saeloun.com/2020/05/04/how-to-reduce-heroku-slug-size.html
# and https://github.com/heroku/heroku-buildpack-ruby/issues/792

namespace :assets do
  desc "Remove 'node_modules' folder"
  task rm_node_modules: :environment do
    Rails.logger.info("Removing node_modules folder")
    FileUtils.remove_dir("node_modules", true)
  end
end

if Rake::Task.task_defined?("assets:clean")
  Rake::Task["assets:clean"].enhance do
    Rake::Task["assets:rm_node_modules"].invoke
  end
else
  Rake::Task.define_task("assets:clean" => "assets:rm_node_modules")
end
