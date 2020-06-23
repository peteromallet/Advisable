require 'mail'

class ApplicationMailer < ActionMailer::Base
  default from: 'Advisable <hello@advisable.com>'
  layout 'mailer'

  private

  # Returns a formatted email address with a display name
  #
  # @param name [String] the name to display along with the email
  # @param email [String] the email address
  # @return [String]
  def format_email(name, email)
    address = Mail::Address.new(email)
    address.display_name = name.dup
    address
  end
end
