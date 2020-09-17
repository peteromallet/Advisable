require 'open-uri'

class SendApplicationInvitesJob < ApplicationJob
  queue_as :default

  def perform(project)
    # Find compatible people and send them an email
  end
end
