class VoiceOver::StoryRepository
  include Lotus::Repository

  def self.countries_with_counts
    DB[:stories].group_and_count(:country).to_a
  end
end
