class VoiceOver::StoryRepository
  include Lotus::Repository

  def self.by_country(country_id)
    query do
      where(country: country_id)
    end.all
  end
end
