# Used to compare two strings. This is used to determine wether or not
# an OauthViewer can validate a project based on their similarity to the projects
# contact_name
class Levenshtein
  attr_reader :first, :second

  def initialize(first, second)
    @first = first.upcase
    @second = second.upcase
  end

  def compare
    matrix = [(0..first.length).to_a]

    (1..second.length).each { |j| matrix << [j] + [0] * (first.length) }

    (1..second.length).each do |i|
      (1..first.length).each do |j|
        if first[j - 1] == second[i - 1]
          matrix[i][j] = matrix[i - 1][j - 1]
        else
          matrix[i][j] =
            [matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]].min + 1
        end
      end
    end

    matrix.last.last
  end

  def self.compare(first, second)
    new(first, second).compare
  end
end
