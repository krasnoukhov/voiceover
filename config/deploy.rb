require "mina/bundler"
require "mina/git"
require "mina/rvm"

set :domain, "voiceoverproject.org"
set :deploy_to, "/home/voiceover/www"
set :repository, "git://github.com/krasnoukhov/voiceover.git"
set :branch, "master"
set :user, "voiceover"
set :shared_paths, ["db/voiceover.db", "public/static"]

task :environment do
  invoke "rvm:use[#{`cat .ruby-version`.strip}@#{`cat .ruby-gemset`.strip}]"
end

desc "Deploys the current version to the server."
task deploy: :environment do
  deploy do
    invoke "git:clone"
    invoke "bundle:install"
    invoke "deploy:link_shared_paths"
    queue  "jsx -x jsx app/jsx/ public/js/"

    to :launch do
      queue "/etc/init.d/railsweb voiceover reload"
    end
  end
end
