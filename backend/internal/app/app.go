package app

import (
	"github.com/go-chi/chi/v5"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"moscow-hack/internal/config"
	"moscow-hack/internal/database/pg"
	sqliteDB "moscow-hack/internal/database/sqlite"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
	"moscow-hack/internal/transport/rest"
	"moscow-hack/pkg/httpserver"
	"os"
	"os/signal"
	"syscall"
)

func Run(cfg *config.Config) {
	//	sqliteInst, err := gorm.Open(sqlite.Open("./api/LCT_Data"), &gorm.Config{})

	sqliteInst, err := gorm.Open(sqlite.Open("C:\\Users\\e.makarev\\GolandProjects\\LCT_Data"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	psql, err := gorm.Open(postgres.Open(cfg.Postgres), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	err = psql.Migrator().CreateTable(&models.User{})
	if err != nil {
		log.Println(err)
	}

	err = psql.Migrator().CreateTable(&models.History{})
	if err != nil {
		log.Println(err)
	}

	us := services.NewUserService(pg.NewUserRepo(psql))
	ac := services.NewAddressCoordService(sqliteDB.NewAddressCoordRepo(sqliteInst))
	is := services.NewIncidentsService(sqliteDB.NewIncidentsRepo(sqliteInst))
	wi := services.NewWorkIncidentService(sqliteDB.NewWorkIncidentRepo(sqliteInst))
	ch := services.NewChooseTypesUseCase(ac, is, wi)
	hs := services.NewHistoryService(pg.NewHistoryRepo(psql))
	ml := services.NewMLService(sqliteDB.NewAddressCoordRepo(sqliteInst), hs)

	r := chi.NewRouter()
	rest.NewRouter(r, cfg.SecretKey, ch, us, is, ml, hs)

	serv := httpserver.New(r, httpserver.Port(cfg.Port))
	interruption := make(chan os.Signal, 1)
	signal.Notify(interruption, os.Interrupt, syscall.SIGTERM)

	select {
	case s := <-interruption:
		log.Printf("signal: " + s.String())
	case err = <-serv.Notify():
		log.Printf("Notify from http server")
	}

	err = serv.Shutdown()
	if err != nil {
		log.Printf("Http server shutdown")
	}
}
