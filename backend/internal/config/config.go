package config

import "github.com/caarlos0/env/v6"

type Config struct {
	Port      string `env:"PORT" envDefault:"9000"`
	Postgres  string `env:"POSTGRES" envDefault:"host=localhost user=postgres password=postgres dbname=postgres port=5432"`
	SecretKey string `env:"SECRET_KEY" envDefault:"sanya_slon"`
}

func New() (*Config, error) {
	cfg := &Config{}
	err := env.Parse(cfg)
	if err != nil {
		return nil, err
	}
	return cfg, nil
}
