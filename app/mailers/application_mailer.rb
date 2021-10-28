# frozen_string_literal: true
class ApplicationMailer < ActionMailer::Base
  helper MailHelper
  default from: "Advisable <hello@advisable.com>"
  layout "mailer"
end
