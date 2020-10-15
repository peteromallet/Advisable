require 'rails_helper'

RSpec.describe SessionManager do
  def mock_cookies(token = nil)
    cookies = double
    signed_cookies = double
    permanent_cookies = double
    allow(cookies).to receive(:signed).and_return(signed_cookies)
    allow(cookies).to receive(:permanent).and_return(permanent_cookies)
    allow(signed_cookies).to receive(:[]).with(:remember).and_return(token)
    cookies
  end

  def mock_session(uid = nil)
    session = double
    allow(session).to receive(:[]).with(:account_uid).and_return(uid)
    session
  end

  describe '#current_user' do
    it 'returns the account based on the session account_uid' do
      user = create(:user)
      session = mock_session(user.account.uid)
      manager = SessionManager.new(session: session, cookies: mock_cookies)
      expect(manager.current_user).to eq(user)
    end

    context 'when there is no session account_uid' do
      it 'returns nil' do
        user = create(:user)
        session = mock_session
        manager = SessionManager.new(session: session, cookies: mock_cookies)
        expect(manager.current_user).to be_nil
      end

      it 'restores the session' do
        user = create(:user, account: create(:account, remember_token: '1234'))
        session = mock_session
        allow(session).to receive(:[]=)
        cookies = mock_cookies(user.remember_token)
        manager = SessionManager.new(session: session, cookies: cookies)
        expect(manager.current_user).to eq(user)
      end
    end
  end

  describe '#login' do
    let(:account) { create(:account) }

    it 'signs in the user' do
      session = mock_session
      cookies = mock_cookies
      manager = SessionManager.new(session: session, cookies: cookies)
      expect(account).to receive(:generate_remember_token)
      expect(cookies.signed).to receive(:[]=).with(:remember, hash_including(value: account.remember_token, httponly: true))
      expect(session).to receive(:[]=).with(:account_uid, account.uid)
      manager.login(account)
    end
  end

  describe '#logout' do
    let(:account) { create(:account) }
    it 'clears the user session' do
      session = mock_session(account.uid)
      cookies = mock_cookies(account.remember_token)
      manager = SessionManager.new(session: session, cookies: cookies)
      expect(cookies).to receive(:delete).with(:remember)
      expect(session).to receive(:delete).with(:account_uid)
      manager.logout
      expect(account.reload.remember_token).to be_nil
    end
  end

  describe '#restore_session' do
    let(:account) { create(:account) }

    it 'does nothing without a remember token' do
      session = mock_session
      cookies = mock_cookies
      manager = SessionManager.new(session: session, cookies: cookies)
      expect(manager.restore_session).to be_nil
    end

    it 'sets the session' do
      account = create(:account, remember_token: '12345')
      session = mock_session
      cookies = mock_cookies(account.remember_token)
      manager = SessionManager.new(session: session, cookies: cookies)
      expect(session).to receive(:[]=).with(:account_uid, account.uid)
      manager.restore_session
    end

    it 'delets the cookie if invalid token' do
      session = mock_session
      cookies = mock_cookies('invalid')
      manager = SessionManager.new(session: session, cookies: cookies)
      expect(cookies).to receive(:delete).with(:remember)
      manager.restore_session
    end
  end

  context "admin override" do
    let(:account) { create(:account, permissions: permissions, remember_token: '12345') }
    let!(:user) { create(:user, account: account) }
    let(:specialist) { create(:specialist) }
    let(:permissions) { ["admin"] }

    it "overwrites current_user" do
      session = double
      allow(session).to receive(:[]).with(:account_uid).and_return(account.uid)
      allow(session).to receive(:[]).with(:admin_override).and_return(specialist.to_global_id)

      manager = SessionManager.new(session: session, cookies: mock_cookies)
      expect(manager.current_user).to eq(specialist)
    end

    context "not an admin" do
      let(:permissions) { [] }

      it "does not overwrite current_user" do
        session = double
        allow(session).to receive(:[]).with(:account_uid).and_return(account.uid)

        manager = SessionManager.new(session: session, cookies: mock_cookies)
        expect(manager.current_user).to eq(user)
      end
    end

    context "not a valid model" do
      let(:project) { create(:project) }

      it "does not overwrite current_user" do
        session = double
        allow(session).to receive(:[]).with(:account_uid).and_return(account.uid)
        allow(session).to receive(:[]).with(:admin_override).and_return(project.to_global_id)

        manager = SessionManager.new(session: session, cookies: mock_cookies)
        expect(session).to receive(:delete).with(:admin_override)
        expect(manager.current_user).to eq(user)
      end
    end
  end
end
