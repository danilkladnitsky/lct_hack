package rest

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/services"
	"net/http"
)

func NewRouter(r chi.Router, key string,
	ch services.ChooseTypesUseCase,
	us services.UserUseCase,
	is services.IncidentsUseCase,
	ml services.MLUseCase,
	hs services.HistoryUseCase) {
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Access-Control-Allow-Origin", "X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token", "origin", "x-requested-with"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))
	r.Use(middleware.URLFormat)
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(render.SetContentType(render.ContentTypeJSON))
	tokenAuth := jwtauth.New("HS256", []byte(key), nil)
	r.Use(jwtauth.Verifier(tokenAuth))
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Start page"))
	})
	newAuthRoutes(r, tokenAuth, us)
	newFormTypesRoutes(r, ch)
	newIncidentRoutes(r, is)
	newMLRoutes(r, ml, &authRoutes{TokenAuth: tokenAuth})
	newHistoryRoutes(r, hs, &authRoutes{TokenAuth: tokenAuth})
}
