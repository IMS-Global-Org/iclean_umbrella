# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :iclean,
  namespace: IClean,
  ecto_repos: [IClean.Repo]

config :iclean_web,
  namespace: ICleanWeb,
  ecto_repos: [IClean.Repo],
  generators: [context_app: :iclean]

# Pow Auth
config :iclean_web, :pow,
  user: IClean.Users.User,
  repo: IClean.Repo

# Configures the endpoint
config :iclean_web, ICleanWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SrISa+56StsidIjsk6dqN5c+J37ZKEyT6UXHEucNWsQXNKOg/hwDZvBlfml/EPSZ",
  render_errors: [view: ICleanWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: ICleanWeb.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "Rm0kewdY"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
