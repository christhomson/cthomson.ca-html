lock '3.1.0'

set :stage, :production
set :application, 'cthomson.ca'
set :repo_url, 'git@github.com:christhomson/christhomson.github.com.git'

set :deploy_to, "/home/deploy/apps/#{fetch(:application)}"

namespace :deploy do
  task :jekyll_build do
    on roles(:app) do
      within release_path do
        # This is the most ridiculous code I've seen in awhile... 
        # See https://github.com/capistrano/capistrano/issues/719 for why is necessary.
        execute 'bundle', 'exec', 'jekyll', 'build'
      end
    end
  end
end

after 'deploy:updated', 'deploy:jekyll_build'
