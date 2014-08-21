module VoiceOver::Controllers::Countries
  include VoiceOver::Controller

  class Index
    include Lotus::Action

    def call(params)
      self.format = :json
      self.body = Oj.dump(VoiceOver::CountryRepository.all)
    end
  end
end
