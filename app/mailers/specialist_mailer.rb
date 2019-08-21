class SpecialistMailer < ApplicationMailer
  def confirm(uid:, token: )
    @account = Specialist.find_by_uid(uid)
    @token = token
    mail(to: @account.email, subject: "Account Confirmation")
  end
end
