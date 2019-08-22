require 'rails_helper'

describe Accounts::Authenticate do
  it 'returns the authenticated user' do
    user = create(:user)
    jwt = Accounts::Jwt.call(user)
    expect(Accounts::Authenticate.call(jwt)).to eq(user)
  end

  context 'when an invalid JWT is passed' do
    it 'returns nil' do
      expect(Accounts::Authenticate.call("test")).to be_nil
    end
  end
end