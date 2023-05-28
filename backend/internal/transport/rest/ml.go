package rest

import (
	"encoding/json"
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
	"net/http"
)

type mlRoutes struct {
	ml services.MLUseCase
}

func newMLRoutes(r chi.Router, ml services.MLUseCase) {
	mlRt := &mlRoutes{ml: ml}
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Authenticator)
		r.Post("/ml_data", mlRt.getMlData)
	})
}

func (m *mlRoutes) getMlData(w http.ResponseWriter, r *http.Request) {
	var mlData models.MLData
	err := json.NewDecoder(r.Body).Decode(&mlData)
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	if mlData.Source == nil || mlData.Unom == nil || mlData.WorkType == nil {
		render.Render(w, r, ErrRender(errors.New("bad data format")))
		return
	}
	err = m.ml.CreateRequestForML(r.Context(), "", &mlData)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(err)
}
