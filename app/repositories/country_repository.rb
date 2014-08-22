require "./app/entities/country"

class VoiceOver::CountryRepository
  include Lotus::Repository

  @@all = File.readlines("./db/countries.csv").map do |line|
    attrs = line.gsub("\n", "").split("\t")
    VoiceOver::Country.new(
      id: attrs[0],
      title: attrs[3],
      lat: attrs[1].to_f,
      lng: attrs[2].to_f
    )
  end

  def self.all
    @@all
  end

  def self.all_with_counts
    counts = DB[:stories].group_and_count(:country).to_a
    counts.map do |item|
      {
        "country" => all.find { |x| x.id == item[:country] },
        "count" => item[:count],
      }
    end
  end
end