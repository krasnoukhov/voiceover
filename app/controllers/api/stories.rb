module VoiceOver::Controllers::Stories
  include VoiceOver::Controller

  class Create
    include Lotus::Action

    def call(params)
      story = VoiceOver::Story.new(params[:story])
      VoiceOver::StoryRepository.create(story)

      self.format = :json
      self.body = Oj.dump(story)
    end
  end

  class Show
    include Lotus::Action

    def call(params)
      story = VoiceOver::StoryRepository.find(params[:id])
      country = VoiceOver::CountryRepository.all.find { |x| x.id == story.country }
      photos = VoiceOver::PhotoRepository.all_as_hash

      response = {
        "story" => story,
        "country" => country,
        "photos" => story.photo_ids.split(",").map { |id| photos[id] },
      }

      self.format = :json
      self.body = Oj.dump(response)
    end
  end
end
