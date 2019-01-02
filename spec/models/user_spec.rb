require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "removes any availability in the past before saving" do
    user = create(:user)
    a = 1.day.ago.change({ hour: 10, min: 0, sec: 0 })
    b = 1.day.from_now.change({ hour: 10, min: 0, sec: 0 })
    user.availability = [a, b]
    expect(user.availability).to include(a)
    user.save
    expect(user.availability).to_not include(a)
    expect(user.availability).to include(b)
  end

  describe 'confirmed' do
    it 'returns true if confirmed_at is present' do
      user = build(:user, confirmed_at: DateTime.now)
      expect(user.confirmed).to be_truthy
    end

    it 'returns false if confirmed_at is nil' do
      user = build(:user, confirmed_at: nil)
      expect(user.confirmed).to be_falsey
    end
  end

  describe "#has_account?" do
    it "returns true if the user has a password" do
      user = User.new(password: "testing123")
      expect(user.has_account?).to be_truthy
    end

    it "returns false if the user has not set a password" do
      user = User.new(password: nil)
      expect(user.has_account?).to be_falsey
    end
  end

  describe "#send_confirmation_email" do
    it "sets the confirmation_digest" do
      user = build(:user, confirmation_digest: nil)
      user.send_confirmation_email
      expect(user.reload.confirmation_digest).to_not be_nil
    end

    it 'sends the confirmation email' do
      user = build(:user, confirmation_digest: nil)
      mail = double('email')
      expect(mail).to receive(:deliver_later)
      expect(UserMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end
end
