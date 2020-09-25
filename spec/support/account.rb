RSpec.shared_examples "account" do
  it { is_expected.to have_secure_password }
  it { is_expected.to allow_value("test+2@test.com").for(:email) }
  it { is_expected.to_not allow_value("test+2test.com").for(:email) }
  it { is_expected.to_not allow_value("test+2@test").for(:email) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_length_of(:password).is_at_least(8) }

  let(:factory) { described_class.to_s.underscore.to_sym }

  describe "#has_account?" do
    it "returns true when there is a passworrd_digest" do
      inst = create(factory, password: "testing123")
      expect(inst.has_account?).to be_truthy
    end

    it "returns false when there is no passworrd_digest" do
      inst = create(factory, password: nil)
      expect(inst.has_account?).to be_falsey
    end
  end

  describe "#confirmed" do
    it 'returns true if confirmed_at is present' do
      user = build(factory, confirmed_at: Time.zone.now)
      expect(user.confirmed).to be_truthy
    end

    it 'returns false if confirmed_at is nil' do
      user = build(factory, confirmed_at: nil)
      expect(user.confirmed).to be_falsey
    end
  end

  describe "#send_confirmation_email" do
    it "sets the confirmation_digest" do
      user = build(factory, confirmation_digest: nil)
      user.send_confirmation_email
      expect(user.reload.confirmation_digest).to_not be_nil
    end

    it 'sends the confirmation email' do
      user = build(factory, confirmation_digest: nil)
      mail = double('email')
      expect(mail).to receive(:deliver_later)
      expect(AccountMailer).to receive(:confirm).and_return(mail)
      user.send_confirmation_email
    end
  end

  describe "#email=" do
    it 'lowercases the value that is passed' do
      inst = create(factory)
      inst.email = "TESTING@TESTING.COM"
      expect(inst.email).to eq("testing@testing.com")
    end
  end

  describe "permissions" do
    it "has a permissions attribute" do
      inst = create(factory)
      expect(inst.permissions).to be_an(Array)
    end

    it "is invalid if it has an unkown permission" do
      inst = build(factory, permissions: ["doesnt:exist"])
      expect(inst).to_not be_valid
      expect(inst.errors.full_messages.first).to match(/not a valid permission/)
    end
  end

  describe "#has_permission?" do
    it "returns true if the user has a given permission" do
      inst = build(factory, permissions: ["admin"])
      expect(inst.has_permission?("admin")).to be_truthy
    end

    it "returns false if the user doesn't have a given permission" do
      inst = build(factory, permissions: [])
      expect(inst.has_permission?("admin")).to be_falsey
    end
  end
end
