class VoiceOver::Photo
  include Lotus::Entity
  self.attributes = :basename, :location, :year
end
