package main

import (
	"log"
	"moscow-hack/internal/app"
	"moscow-hack/internal/config"
)

func main() {
	cfg, err := config.New()
	if err != nil {
		log.Fatal(err)
	}
	app.Run(cfg)
}
