module VoiceOver::Controllers::Countries
  include VoiceOver::Controller

  class Index
    include Lotus::Action

    def call(params)
      self.format = :json
      self.body = Oj.dump(VoiceOver::CountryRepository.all)
    end
  end

  class Counts
    include Lotus::Action

    def call(params)
      self.format = :json
      self.body = Oj.dump(VoiceOver::CountryRepository.all_with_counts)
    end
  end

  class Show
    include Lotus::Action

    def call(params)
      country = VoiceOver::CountryRepository.all.find { |x| x.id == params[:id] }
      stories = VoiceOver::StoryRepository.by_country(country.id)

      response = {
        "country" => country,
        "count" => stories.count,
        "stories" => stories.map(&:serializable_hash),
        "photos" => VoiceOver::PhotoRepository.all_as_hash,
      }

      self.format = :json
      self.body = Oj.dump(response)
    end
  end
end
