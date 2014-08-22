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
      counts = VoiceOver::StoryRepository.countries_with_counts
      countries = VoiceOver::CountryRepository.all

      response = counts.map do |item|
        {
          "country" => countries.find { |x| x.id == item[:country] },
          "count" => item[:count],
        }
      end

      self.format = :json
      self.body = Oj.dump(response)
    end
  end
end
