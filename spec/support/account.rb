RSpec.shared_examples "account" do
  let(:factory) { described_class.to_s.underscore.to_sym }

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
