package rest

import (
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/services"
	"net/http"
)

type formTypesRoutes struct {
	ch services.ChooseTypesUseCase
}

func newFormTypesRoutes(c chi.Router, ch services.ChooseTypesUseCase) {
	tp := &formTypesRoutes{ch: ch}
	c.Route("/types", func(r chi.Router) {
		r.Use(jwtauth.Authenticator)
		r.Get("/choose", tp.getTypes)
	})
}

func (t *formTypesRoutes) getTypes(w http.ResponseWriter, r *http.Request) {
	ch, err := t.ch.GetChooseTypesList(r.Context())
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ch)
}
