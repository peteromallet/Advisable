class AccountMailerPreview < ActionMailer::Preview
  def confirm
    AccountMailer.confirm(
      uid: FactoryBot.create(:specialist).uid,
      token: Faker::Internet.password
    )
  end

  def reset_password
    AccountMailer.reset_password(
      uid: FactoryBot.create(:specialist).uid,
      token: Faker::Internet.password
    )
  end
end
