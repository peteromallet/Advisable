class ApplicationMailer < ActionMailer::Base
  helper MailHelper
  default from: 'Advisable <hello@advisable.com>'
  layout 'mailer'
end
