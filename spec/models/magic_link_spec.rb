require 'rails_helper'

RSpec.describe MagicLink, type: :model do
  it 'has a valid factory' do
    magic_link = build(:magic_link)
    expect(magic_link).to be_valid
  end

  it 'sets expires_at to 24 hours by default' do
    magic_link = create(:magic_link, expires_at: nil)
    expect(magic_link.expires_at).to be_within(1.second).of(1.day.from_now)
  end

  describe '#path=' do
    let(:magic_link) { build_stubbed(:magic_link, path: nil) }

    it 'extracts the path from the provided URL' do
      magic_link.path = "https://advisable.com/testing?a=123"
      expect(magic_link.path).to eq("/testing")
    end

    it 'can be given a direct path' do
      magic_link.path = "/testing/path"
      expect(magic_link.path).to eq("/testing/path")
    end

    it 'sets path to nil when given an invalid uri' do
      magic_link.path = "invalid URI"
      expect(magic_link.path).to be_nil
    end
  end

  describe 'self.for_path' do
    it 'returns a magic_link matching the given path and token' do
      magic_link = create(:magic_link)
      link = MagicLink.for_path(account: magic_link.account, token: magic_link.token, path: magic_link.path)
      expect(link).to eq(magic_link)
    end

    it 'excludes expired magic links' do
      magic_link = create(:magic_link, expires_at: 1.hour.ago)
      link = MagicLink.for_path(account: magic_link.account, token: magic_link.token, path: magic_link.path)
      expect(link).to be_nil
    end
  end
end
