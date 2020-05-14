class AlphanumericId
  CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  def self.generate(length = 15)
    Nanoid.generate(size: length, alphabet: CHARS)
  end
end
