class VoiceOver::Story
  include Lotus::Entity
  self.attributes = :name, :age, :country, :description, :photo_ids
end
