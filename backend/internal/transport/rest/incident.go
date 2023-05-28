package rest

import (
	"encoding/json"
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/services"
	"net/http"
	"strconv"
)

type incidentRoutes struct {
	is services.IncidentsUseCase
}

func newIncidentRoutes(c chi.Router, is services.IncidentsUseCase) {
	ir := &incidentRoutes{is: is}
	c.Group(func(r chi.Router) {
		r.Use(jwtauth.Authenticator)
		r.Get("/incident_count", ir.getIncidentsCount)
		r.Get("/get_incidents/{unom}", ir.getIncidentsByUnom)
	})
}

func (i *incidentRoutes) getIncidentsCount(w http.ResponseWriter, r *http.Request) {
	ic, err := i.is.GetIncidentsCount(r.Context())
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ic)
}

func (i *incidentRoutes) getIncidentsByUnom(w http.ResponseWriter, r *http.Request) {
	unomStr := chi.URLParam(r, "unom")
	if unomStr == "" {
		render.Render(w, r, ErrRender(errors.New("invalid param type")))
		return
	}
	unom, err := strconv.ParseInt(unomStr, 10, 64)
	if err != nil {
		render.Render(w, r, ErrRender(errors.New("convert error")))
		return
	}
	ic, err := i.is.GetIncidentsByUnom(r.Context(), unom)
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ic)
}
